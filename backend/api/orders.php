<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

class OrderAPI {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    public function createOrder($data) {
        try {
            $this->conn->beginTransaction();
            
            // Generate order number
            $orderNumber = 'KP' . date('Y') . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
            
            // Insert order
            $orderQuery = "INSERT INTO orders (user_id, order_number, total_amount, subtotal, discount_amount, 
                          shipping_amount, tax_amount, shipping_address, billing_address, notes) 
                          VALUES (:user_id, :order_number, :total_amount, :subtotal, :discount_amount, 
                                  :shipping_amount, :tax_amount, :shipping_address, :billing_address, :notes)";
            
            $orderStmt = $this->conn->prepare($orderQuery);
            $orderStmt->bindParam(':user_id', $data['user_id']);
            $orderStmt->bindParam(':order_number', $orderNumber);
            $orderStmt->bindParam(':total_amount', $data['total_amount']);
            $orderStmt->bindParam(':subtotal', $data['subtotal']);
            $orderStmt->bindParam(':discount_amount', $data['discount_amount']);
            $orderStmt->bindParam(':shipping_amount', $data['shipping_amount']);
            $orderStmt->bindParam(':tax_amount', $data['tax_amount']);
            $orderStmt->bindParam(':shipping_address', $data['shipping_address']);
            $orderStmt->bindParam(':billing_address', $data['billing_address']);
            $orderStmt->bindParam(':notes', $data['notes']);
            
            $orderStmt->execute();
            $orderId = $this->conn->lastInsertId();
            
            // Insert order items
            $itemQuery = "INSERT INTO order_items (order_id, product_id, quantity, price, total) 
                         VALUES (:order_id, :product_id, :quantity, :price, :total)";
            $itemStmt = $this->conn->prepare($itemQuery);
            
            foreach ($data['items'] as $item) {
                $itemStmt->bindParam(':order_id', $orderId);
                $itemStmt->bindParam(':product_id', $item['product_id']);
                $itemStmt->bindParam(':quantity', $item['quantity']);
                $itemStmt->bindParam(':price', $item['price']);
                $itemStmt->bindParam(':total', $item['total']);
                $itemStmt->execute();
            }
            
            // Clear cart
            if (isset($data['user_id'])) {
                $clearCartQuery = "DELETE FROM shopping_cart WHERE user_id = :user_id";
                $clearCartStmt = $this->conn->prepare($clearCartQuery);
                $clearCartStmt->bindParam(':user_id', $data['user_id']);
                $clearCartStmt->execute();
            }
            
            $this->conn->commit();
            
            return ['success' => true, 'order_id' => $orderId, 'order_number' => $orderNumber];
            
        } catch (Exception $e) {
            $this->conn->rollback();
            return ['success' => false, 'message' => 'Failed to create order: ' . $e->getMessage()];
        }
    }
    
    public function getOrders($userId = null) {
        $query = "SELECT o.*, COUNT(oi.id) as item_count 
                  FROM orders o 
                  LEFT JOIN order_items oi ON o.id = oi.order_id";
        
        if ($userId) {
            $query .= " WHERE o.user_id = :user_id";
        }
        
        $query .= " GROUP BY o.id ORDER BY o.created_at DESC";
        
        $stmt = $this->conn->prepare($query);
        
        if ($userId) {
            $stmt->bindParam(':user_id', $userId);
        }
        
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function getOrder($id) {
        $orderQuery = "SELECT * FROM orders WHERE id = :id";
        $orderStmt = $this->conn->prepare($orderQuery);
        $orderStmt->bindParam(':id', $id);
        $orderStmt->execute();
        
        $order = $orderStmt->fetch(PDO::FETCH_ASSOC);
        
        if ($order) {
            // Get order items
            $itemsQuery = "SELECT oi.*, p.name, p.sku, pi.image_url 
                          FROM order_items oi 
                          JOIN products p ON oi.product_id = p.id 
                          LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = 1
                          WHERE oi.order_id = :order_id";
            $itemsStmt = $this->conn->prepare($itemsQuery);
            $itemsStmt->bindParam(':order_id', $id);
            $itemsStmt->execute();
            
            $order['items'] = $itemsStmt->fetchAll(PDO::FETCH_ASSOC);
        }
        
        return $order;
    }
    
    public function updateOrderStatus($id, $status) {
        $query = "UPDATE orders SET status = :status WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':id', $id);
        
        return $stmt->execute();
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$api = new OrderAPI();

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $order = $api->getOrder($_GET['id']);
            echo json_encode($order);
        } else {
            $userId = $_GET['user_id'] ?? null;
            $orders = $api->getOrders($userId);
            echo json_encode($orders);
        }
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $result = $api->createOrder($data);
        echo json_encode($result);
        break;
        
    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        $result = $api->updateOrderStatus($data['id'], $data['status']);
        echo json_encode(['success' => $result]);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>