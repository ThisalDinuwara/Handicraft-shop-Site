<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

class CartAPI {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    public function getCart($userId = null, $sessionId = null) {
        $query = "SELECT c.*, p.name, p.price, p.original_price, pi.image_url, cat.name as category_name
                  FROM shopping_cart c
                  JOIN products p ON c.product_id = p.id
                  LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = 1
                  LEFT JOIN categories cat ON p.category_id = cat.id
                  WHERE ";
        
        if ($userId) {
            $query .= "c.user_id = :userId";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':userId', $userId);
        } else {
            $query .= "c.session_id = :sessionId";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':sessionId', $sessionId);
        }
        
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function addToCart($data) {
        // Check if item already exists in cart
        $checkQuery = "SELECT id, quantity FROM shopping_cart WHERE ";
        $params = [];
        
        if (isset($data['user_id'])) {
            $checkQuery .= "user_id = :user_id";
            $params[':user_id'] = $data['user_id'];
        } else {
            $checkQuery .= "session_id = :session_id";
            $params[':session_id'] = $data['session_id'];
        }
        
        $checkQuery .= " AND product_id = :product_id";
        $params[':product_id'] = $data['product_id'];
        
        $checkStmt = $this->conn->prepare($checkQuery);
        foreach ($params as $key => $value) {
            $checkStmt->bindValue($key, $value);
        }
        $checkStmt->execute();
        $existing = $checkStmt->fetch(PDO::FETCH_ASSOC);
        
        if ($existing) {
            // Update quantity
            $updateQuery = "UPDATE shopping_cart SET quantity = quantity + :quantity WHERE id = :id";
            $updateStmt = $this->conn->prepare($updateQuery);
            $updateStmt->bindParam(':quantity', $data['quantity']);
            $updateStmt->bindParam(':id', $existing['id']);
            return $updateStmt->execute();
        } else {
            // Insert new item
            $insertQuery = "INSERT INTO shopping_cart (user_id, session_id, product_id, quantity) 
                           VALUES (:user_id, :session_id, :product_id, :quantity)";
            $insertStmt = $this->conn->prepare($insertQuery);
            $insertStmt->bindParam(':user_id', $data['user_id']);
            $insertStmt->bindParam(':session_id', $data['session_id']);
            $insertStmt->bindParam(':product_id', $data['product_id']);
            $insertStmt->bindParam(':quantity', $data['quantity']);
            return $insertStmt->execute();
        }
    }
    
    public function updateCartItem($id, $quantity) {
        if ($quantity <= 0) {
            return $this->removeFromCart($id);
        }
        
        $query = "UPDATE shopping_cart SET quantity = :quantity WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':quantity', $quantity);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
    
    public function removeFromCart($id) {
        $query = "DELETE FROM shopping_cart WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
    
    public function clearCart($userId = null, $sessionId = null) {
        $query = "DELETE FROM shopping_cart WHERE ";
        
        if ($userId) {
            $query .= "user_id = :userId";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':userId', $userId);
        } else {
            $query .= "session_id = :sessionId";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':sessionId', $sessionId);
        }
        
        return $stmt->execute();
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$api = new CartAPI();

switch ($method) {
    case 'GET':
        $userId = $_GET['user_id'] ?? null;
        $sessionId = $_GET['session_id'] ?? null;
        $cart = $api->getCart($userId, $sessionId);
        echo json_encode($cart);
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $result = $api->addToCart($data);
        echo json_encode(['success' => $result]);
        break;
        
    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        $result = $api->updateCartItem($data['id'], $data['quantity']);
        echo json_encode(['success' => $result]);
        break;
        
    case 'DELETE':
        if (isset($_GET['id'])) {
            $result = $api->removeFromCart($_GET['id']);
        } else {
            $userId = $_GET['user_id'] ?? null;
            $sessionId = $_GET['session_id'] ?? null;
            $result = $api->clearCart($userId, $sessionId);
        }
        echo json_encode(['success' => $result]);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>