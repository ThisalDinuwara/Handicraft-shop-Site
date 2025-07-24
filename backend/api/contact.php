<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

class ContactAPI {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    public function submitMessage($data) {
        $query = "INSERT INTO contact_messages (name, email, phone, subject, message) 
                  VALUES (:name, :email, :phone, :subject, :message)";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':name', $data['name']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':phone', $data['phone']);
        $stmt->bindParam(':subject', $data['subject']);
        $stmt->bindParam(':message', $data['message']);
        
        if ($stmt->execute()) {
            return ['success' => true, 'message' => 'Message sent successfully'];
        }
        
        return ['success' => false, 'message' => 'Failed to send message'];
    }
    
    public function getMessages($status = null) {
        $query = "SELECT * FROM contact_messages";
        
        if ($status) {
            $query .= " WHERE status = :status";
        }
        
        $query .= " ORDER BY created_at DESC";
        
        $stmt = $this->conn->prepare($query);
        
        if ($status) {
            $stmt->bindParam(':status', $status);
        }
        
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function updateMessageStatus($id, $status, $adminReply = null) {
        $query = "UPDATE contact_messages SET status = :status";
        
        if ($adminReply) {
            $query .= ", admin_reply = :admin_reply";
        }
        
        $query .= " WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':id', $id);
        
        if ($adminReply) {
            $stmt->bindParam(':admin_reply', $adminReply);
        }
        
        return $stmt->execute();
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$api = new ContactAPI();

switch ($method) {
    case 'GET':
        $status = $_GET['status'] ?? null;
        $messages = $api->getMessages($status);
        echo json_encode($messages);
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $result = $api->submitMessage($data);
        echo json_encode($result);
        break;
        
    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        $result = $api->updateMessageStatus($data['id'], $data['status'], $data['admin_reply'] ?? null);
        echo json_encode(['success' => $result]);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>