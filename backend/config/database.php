<?php
class Database {
    // Database configuration - Update these values according to your setup
    private $host = "localhost";        // Your MySQL host (usually localhost)
    private $db_name = "kandu_pinnawala_shop";  // Database name
    private $username = "root";         // Your MySQL username
    private $password = "Dinuwara@2005";             // Your MySQL password (empty for XAMPP default)
    public $conn;

    public function getConnection() {
        $this->conn = null;
        
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            // Log error instead of displaying it in production
            error_log("Database Connection Error: " . $exception->getMessage());
            throw new Exception("Database connection failed");
        }
        
        return $this->conn;
    }
    
    // Test database connection
    public function testConnection() {
        try {
            $conn = $this->getConnection();
            if ($conn) {
                return ["success" => true, "message" => "Database connected successfully"];
            }
        } catch (Exception $e) {
            return ["success" => false, "message" => $e->getMessage()];
        }
        return ["success" => false, "message" => "Unknown connection error"];
    }
}
?>