<?php
// Test Database Connection Script
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'config/database.php';

try {
    $database = new Database();
    $result = $database->testConnection();
    
    if ($result['success']) {
        // Test a simple query
        $conn = $database->getConnection();
        $stmt = $conn->prepare("SELECT COUNT(*) as product_count FROM products");
        $stmt->execute();
        $productCount = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $stmt = $conn->prepare("SELECT COUNT(*) as category_count FROM categories");
        $stmt->execute();
        $categoryCount = $stmt->fetch(PDO::FETCH_ASSOC);
        
        echo json_encode([
            "success" => true,
            "message" => "Database connection successful!",
            "data" => [
                "products" => $productCount['product_count'],
                "categories" => $categoryCount['category_count'],
                "database" => "kandu_pinnawala_shop",
                "timestamp" => date('Y-m-d H:i:s')
            ]
        ]);
    } else {
        echo json_encode($result);
    }
    
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Connection test failed: " . $e->getMessage()
    ]);
}
?>