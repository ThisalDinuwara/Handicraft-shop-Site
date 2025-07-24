<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

class UserAPI {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    public function register($data) {
        // Check if email already exists
        $checkQuery = "SELECT id FROM users WHERE email = :email";
        $checkStmt = $this->conn->prepare($checkQuery);
        $checkStmt->bindParam(':email', $data['email']);
        $checkStmt->execute();
        
        if ($checkStmt->rowCount() > 0) {
            return ['success' => false, 'message' => 'Email already exists'];
        }
        
        // Hash password
        $passwordHash = password_hash($data['password'], PASSWORD_DEFAULT);
        
        $query = "INSERT INTO users (first_name, last_name, email, phone, address, password_hash) 
                  VALUES (:first_name, :last_name, :email, :phone, :address, :password_hash)";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':first_name', $data['first_name']);
        $stmt->bindParam(':last_name', $data['last_name']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':phone', $data['phone']);
        $stmt->bindParam(':address', $data['address']);
        $stmt->bindParam(':password_hash', $passwordHash);
        
        if ($stmt->execute()) {
            $userId = $this->conn->lastInsertId();
            return ['success' => true, 'user_id' => $userId, 'message' => 'User registered successfully'];
        }
        
        return ['success' => false, 'message' => 'Registration failed'];
    }
    
    public function login($email, $password) {
        $query = "SELECT id, first_name, last_name, email, phone, address, password_hash 
                  FROM users WHERE email = :email AND is_active = 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user && password_verify($password, $user['password_hash'])) {
            unset($user['password_hash']); // Remove password hash from response
            return ['success' => true, 'user' => $user, 'message' => 'Login successful'];
        }
        
        return ['success' => false, 'message' => 'Invalid email or password'];
    }
    
    public function getUser($id) {
        $query = "SELECT id, first_name, last_name, email, phone, address, created_at 
                  FROM users WHERE id = :id AND is_active = 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    public function updateUser($id, $data) {
        $query = "UPDATE users SET first_name = :first_name, last_name = :last_name, 
                  phone = :phone, address = :address WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':first_name', $data['first_name']);
        $stmt->bindParam(':last_name', $data['last_name']);
        $stmt->bindParam(':phone', $data['phone']);
        $stmt->bindParam(':address', $data['address']);
        $stmt->bindParam(':id', $id);
        
        return $stmt->execute();
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$api = new UserAPI();

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $user = $api->getUser($_GET['id']);
            echo json_encode($user);
        }
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        
        if (isset($data['action']) && $data['action'] === 'login') {
            $result = $api->login($data['email'], $data['password']);
        } else {
            $result = $api->register($data);
        }
        
        echo json_encode($result);
        break;
        
    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        $result = $api->updateUser($data['id'], $data);
        echo json_encode(['success' => $result]);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>