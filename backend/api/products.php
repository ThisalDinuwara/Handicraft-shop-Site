<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

class ProductAPI {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    public function getProducts($category = null, $featured = null, $limit = null, $search = null) {
        $query = "SELECT p.*, c.name as category_name, c.slug as category_slug,
                         pi.image_url as primary_image,
                         COALESCE(AVG(pr.rating), 0) as avg_rating,
                         COUNT(pr.id) as review_count
                  FROM products p 
                  LEFT JOIN categories c ON p.category_id = c.id
                  LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = 1
                  LEFT JOIN product_reviews pr ON p.id = pr.product_id AND pr.is_approved = 1
                  WHERE p.is_active = 1";
        
        $params = [];
        
        if ($category) {
            $query .= " AND c.slug = :category";
            $params[':category'] = $category;
        }
        
        if ($featured) {
            $query .= " AND p.is_featured = 1";
        }
        
        if ($search) {
            $query .= " AND (p.name LIKE :search OR p.description LIKE :search OR c.name LIKE :search)";
            $params[':search'] = '%' . $search . '%';
        }
        
        $query .= " GROUP BY p.id ORDER BY p.created_at DESC";
        
        if ($limit) {
            $query .= " LIMIT :limit";
            $params[':limit'] = (int)$limit;
        }
        
        $stmt = $this->conn->prepare($query);
        
        foreach ($params as $key => $value) {
            if ($key === ':limit') {
                $stmt->bindValue($key, $value, PDO::PARAM_INT);
            } else {
                $stmt->bindValue($key, $value);
            }
        }
        
        $stmt->execute();
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return $products;
    }
    
    public function getProduct($id) {
        $query = "SELECT p.*, c.name as category_name, c.slug as category_slug,
                         COALESCE(AVG(pr.rating), 0) as avg_rating,
                         COUNT(pr.id) as review_count
                  FROM products p 
                  LEFT JOIN categories c ON p.category_id = c.id
                  LEFT JOIN product_reviews pr ON p.id = pr.product_id AND pr.is_approved = 1
                  WHERE p.id = :id AND p.is_active = 1
                  GROUP BY p.id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        
        $product = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($product) {
            // Get product images
            $imageQuery = "SELECT * FROM product_images WHERE product_id = :id ORDER BY is_primary DESC, sort_order ASC";
            $imageStmt = $this->conn->prepare($imageQuery);
            $imageStmt->bindParam(':id', $id);
            $imageStmt->execute();
            $product['images'] = $imageStmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Get product reviews
            $reviewQuery = "SELECT * FROM product_reviews WHERE product_id = :id AND is_approved = 1 ORDER BY created_at DESC";
            $reviewStmt = $this->conn->prepare($reviewQuery);
            $reviewStmt->bindParam(':id', $id);
            $reviewStmt->execute();
            $product['reviews'] = $reviewStmt->fetchAll(PDO::FETCH_ASSOC);
        }
        
        return $product;
    }
    
    public function createProduct($data) {
        $query = "INSERT INTO products (name, slug, description, short_description, category_id, price, original_price, stock_quantity, sku, is_featured, is_new) 
                  VALUES (:name, :slug, :description, :short_description, :category_id, :price, :original_price, :stock_quantity, :sku, :is_featured, :is_new)";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':name', $data['name']);
        $stmt->bindParam(':slug', $data['slug']);
        $stmt->bindParam(':description', $data['description']);
        $stmt->bindParam(':short_description', $data['short_description']);
        $stmt->bindParam(':category_id', $data['category_id']);
        $stmt->bindParam(':price', $data['price']);
        $stmt->bindParam(':original_price', $data['original_price']);
        $stmt->bindParam(':stock_quantity', $data['stock_quantity']);
        $stmt->bindParam(':sku', $data['sku']);
        $stmt->bindParam(':is_featured', $data['is_featured']);
        $stmt->bindParam(':is_new', $data['is_new']);
        
        if ($stmt->execute()) {
            return $this->conn->lastInsertId();
        }
        
        return false;
    }
}

// Handle API requests
$method = $_SERVER['REQUEST_METHOD'];
$api = new ProductAPI();

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $product = $api->getProduct($_GET['id']);
            echo json_encode($product);
        } else {
            $category = $_GET['category'] ?? null;
            $featured = $_GET['featured'] ?? null;
            $limit = $_GET['limit'] ?? null;
            $search = $_GET['search'] ?? null;
            
            $products = $api->getProducts($category, $featured, $limit, $search);
            echo json_encode($products);
        }
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $result = $api->createProduct($data);
        echo json_encode(['success' => $result !== false, 'id' => $result]);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>