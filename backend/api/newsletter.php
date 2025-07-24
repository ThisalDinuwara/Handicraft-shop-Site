<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

class NewsletterAPI {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    public function subscribe($email) {
        // Check if email already exists
        $checkQuery = "SELECT id, status FROM newsletter_subscribers WHERE email = :email";
        $checkStmt = $this->conn->prepare($checkQuery);
        $checkStmt->bindParam(':email', $email);
        $checkStmt->execute();
        
        $existing = $checkStmt->fetch(PDO::FETCH_ASSOC);
        
        if ($existing) {
            if ($existing['status'] === 'unsubscribed') {
                // Resubscribe
                $updateQuery = "UPDATE newsletter_subscribers SET status = 'active', subscribed_at = CURRENT_TIMESTAMP, unsubscribed_at = NULL WHERE email = :email";
                $updateStmt = $this->conn->prepare($updateQuery);
                $updateStmt->bindParam(':email', $email);
                
                if ($updateStmt->execute()) {
                    return ['success' => true, 'message' => 'Successfully resubscribed to newsletter'];
                }
            } else {
                return ['success' => false, 'message' => 'Email already subscribed'];
            }
        } else {
            // New subscription
            $insertQuery = "INSERT INTO newsletter_subscribers (email) VALUES (:email)";
            $insertStmt = $this->conn->prepare($insertQuery);
            $insertStmt->bindParam(':email', $email);
            
            if ($insertStmt->execute()) {
                return ['success' => true, 'message' => 'Successfully subscribed to newsletter'];
            }
        }
        
        return ['success' => false, 'message' => 'Failed to subscribe'];
    }
    
    public function unsubscribe($email) {
        $query = "UPDATE newsletter_subscribers SET status = 'unsubscribed', unsubscribed_at = CURRENT_TIMESTAMP WHERE email = :email";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        
        if ($stmt->execute() && $stmt->rowCount() > 0) {
            return ['success' => true, 'message' => 'Successfully unsubscribed'];
        }
        
        return ['success' => false, 'message' => 'Email not found'];
    }
    
    public function getSubscribers($status = 'active') {
        $query = "SELECT * FROM newsletter_subscribers WHERE status = :status ORDER BY subscribed_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':status', $status);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$api = new NewsletterAPI();

switch ($method) {
    case 'GET':
        $status = $_GET['status'] ?? 'active';
        $subscribers = $api->getSubscribers($status);
        echo json_encode($subscribers);
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        
        if (isset($data['action']) && $data['action'] === 'unsubscribe') {
            $result = $api->unsubscribe($data['email']);
        } else {
            $result = $api->subscribe($data['email']);
        }
        
        echo json_encode($result);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>