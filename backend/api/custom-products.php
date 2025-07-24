<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

class CustomProductAPI {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    public function createRequest($data) {
        $query = "INSERT INTO custom_product_requests 
                  (user_id, name, email, phone, product_type, size_description, colors, materials, 
                   description, budget_range, timeline, reference_images) 
                  VALUES (:user_id, :name, :email, :phone, :product_type, :size_description, 
                          :colors, :materials, :description, :budget_range, :timeline, :reference_images)";
        
        $stmt = $this->conn->prepare($query);
        
        $colorsJson = json_encode($data['colors']);
        $materialsJson = json_encode($data['materials']);
        $referenceImagesJson = json_encode($data['reference_images'] ?? []);
        
        $stmt->bindParam(':user_id', $data['user_id']);
        $stmt->bindParam(':name', $data['name']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':phone', $data['phone']);
        $stmt->bindParam(':product_type', $data['product_type']);
        $stmt->bindParam(':size_description', $data['size_description']);
        $stmt->bindParam(':colors', $colorsJson);
        $stmt->bindParam(':materials', $materialsJson);
        $stmt->bindParam(':description', $data['description']);
        $stmt->bindParam(':budget_range', $data['budget_range']);
        $stmt->bindParam(':timeline', $data['timeline']);
        $stmt->bindParam(':reference_images', $referenceImagesJson);
        
        if ($stmt->execute()) {
            return ['success' => true, 'id' => $this->conn->lastInsertId(), 'message' => 'Custom product request submitted successfully'];
        }
        
        return ['success' => false, 'message' => 'Failed to submit request'];
    }
    
    public function getRequests($userId = null) {
        $query = "SELECT * FROM custom_product_requests";
        
        if ($userId) {
            $query .= " WHERE user_id = :user_id";
        }
        
        $query .= " ORDER BY created_at DESC";
        
        $stmt = $this->conn->prepare($query);
        
        if ($userId) {
            $stmt->bindParam(':user_id', $userId);
        }
        
        $stmt->execute();
        $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Decode JSON fields
        foreach ($requests as &$request) {
            $request['colors'] = json_decode($request['colors'], true);
            $request['materials'] = json_decode($request['materials'], true);
            $request['reference_images'] = json_decode($request['reference_images'], true);
        }
        
        return $requests;
    }
    
    public function getRequest($id) {
        $query = "SELECT * FROM custom_product_requests WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        
        $request = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($request) {
            $request['colors'] = json_decode($request['colors'], true);
            $request['materials'] = json_decode($request['materials'], true);
            $request['reference_images'] = json_decode($request['reference_images'], true);
        }
        
        return $request;
    }
    
    public function updateRequestStatus($id, $status, $adminNotes = null, $estimatedPrice = null, $estimatedCompletion = null) {
        $query = "UPDATE custom_product_requests SET status = :status";
        
        if ($adminNotes) {
            $query .= ", admin_notes = :admin_notes";
        }
        
        if ($estimatedPrice) {
            $query .= ", estimated_price = :estimated_price";
        }
        
        if ($estimatedCompletion) {
            $query .= ", estimated_completion = :estimated_completion";
        }
        
        $query .= " WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':id', $id);
        
        if ($adminNotes) {
            $stmt->bindParam(':admin_notes', $adminNotes);
        }
        
        if ($estimatedPrice) {
            $stmt->bindParam(':estimated_price', $estimatedPrice);
        }
        
        if ($estimatedCompletion) {
            $stmt->bindParam(':estimated_completion', $estimatedCompletion);
        }
        
        return $stmt->execute();
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$api = new CustomProductAPI();

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $request = $api->getRequest($_GET['id']);
            echo json_encode($request);
        } else {
            $userId = $_GET['user_id'] ?? null;
            $requests = $api->getRequests($userId);
            echo json_encode($requests);
        }
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $result = $api->createRequest($data);
        echo json_encode($result);
        break;
        
    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        $result = $api->updateRequestStatus(
            $data['id'], 
            $data['status'], 
            $data['admin_notes'] ?? null,
            $data['estimated_price'] ?? null,
            $data['estimated_completion'] ?? null
        );
        echo json_encode(['success' => $result]);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>