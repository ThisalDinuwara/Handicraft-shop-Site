<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

class PromoCodeAPI {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    public function validatePromoCode($code, $orderAmount) {
        $query = "SELECT * FROM promo_codes 
                  WHERE code = :code 
                  AND is_active = 1 
                  AND (valid_until IS NULL OR valid_until > NOW())
                  AND valid_from <= NOW()
                  AND minimum_order_amount <= :order_amount
                  AND (usage_limit IS NULL OR used_count < usage_limit)";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':code', $code);
        $stmt->bindParam(':order_amount', $orderAmount);
        $stmt->execute();
        
        $promoCode = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($promoCode) {
            $discountAmount = 0;
            
            if ($promoCode['discount_type'] === 'percentage') {
                $discountAmount = ($orderAmount * $promoCode['discount_value']) / 100;
            } else {
                $discountAmount = $promoCode['discount_value'];
            }
            
            return [
                'success' => true,
                'promo_code' => $promoCode,
                'discount_amount' => $discountAmount,
                'message' => 'Promo code applied successfully'
            ];
        }
        
        return ['success' => false, 'message' => 'Invalid or expired promo code'];
    }
    
    public function usePromoCode($code) {
        $query = "UPDATE promo_codes SET used_count = used_count + 1 WHERE code = :code";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':code', $code);
        
        return $stmt->execute();
    }
    
    public function getPromoCodes() {
        $query = "SELECT * FROM promo_codes ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function createPromoCode($data) {
        $query = "INSERT INTO promo_codes (code, description, discount_type, discount_value, 
                  minimum_order_amount, usage_limit, valid_from, valid_until) 
                  VALUES (:code, :description, :discount_type, :discount_value, 
                          :minimum_order_amount, :usage_limit, :valid_from, :valid_until)";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':code', $data['code']);
        $stmt->bindParam(':description', $data['description']);
        $stmt->bindParam(':discount_type', $data['discount_type']);
        $stmt->bindParam(':discount_value', $data['discount_value']);
        $stmt->bindParam(':minimum_order_amount', $data['minimum_order_amount']);
        $stmt->bindParam(':usage_limit', $data['usage_limit']);
        $stmt->bindParam(':valid_from', $data['valid_from']);
        $stmt->bindParam(':valid_until', $data['valid_until']);
        
        return $stmt->execute();
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$api = new PromoCodeAPI();

switch ($method) {
    case 'GET':
        if (isset($_GET['validate'])) {
            $code = $_GET['code'];
            $orderAmount = $_GET['order_amount'];
            $result = $api->validatePromoCode($code, $orderAmount);
            echo json_encode($result);
        } else {
            $promoCodes = $api->getPromoCodes();
            echo json_encode($promoCodes);
        }
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        
        if (isset($data['action']) && $data['action'] === 'use') {
            $result = $api->usePromoCode($data['code']);
            echo json_encode(['success' => $result]);
        } else {
            $result = $api->createPromoCode($data);
            echo json_encode(['success' => $result]);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>