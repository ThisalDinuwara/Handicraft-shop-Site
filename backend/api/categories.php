<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

class CategoryAPI {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    public function getCategories() {
        $query = "SELECT c.*, COUNT(p.id) as product_count 
                  FROM categories c 
                  LEFT JOIN products p ON c.id = p.category_id AND p.is_active = 1
                  WHERE c.is_active = 1 
                  GROUP BY c.id 
                  ORDER BY c.name ASC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function getCategory($id) {
        $query = "SELECT * FROM categories WHERE id = :id AND is_active = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$api = new CategoryAPI();

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $category = $api->getCategory($_GET['id']);
            echo json_encode($category);
        } else {
            $categories = $api->getCategories();
            echo json_encode($categories);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>