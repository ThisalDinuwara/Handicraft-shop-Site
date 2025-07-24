-- Kandu Pinnawala Handicraft Shop Database Schema
-- Create database
CREATE DATABASE IF NOT EXISTS kandu_pinnawala_shop;
USE kandu_pinnawala_shop;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Categories table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    category_id INT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    stock_quantity INT DEFAULT 0,
    sku VARCHAR(100) UNIQUE,
    weight DECIMAL(8,2),
    dimensions VARCHAR(100),
    materials TEXT,
    care_instructions TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_new BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Product images table
CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Product reviews table
CREATE TABLE product_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200),
    review_text TEXT,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Shopping cart table
CREATE TABLE shopping_cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    session_id VARCHAR(255),
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Orders table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    shipping_amount DECIMAL(10,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    payment_method VARCHAR(50),
    shipping_address TEXT,
    billing_address TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Order items table
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Custom product requests table
CREATE TABLE custom_product_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    product_type VARCHAR(100),
    size_description TEXT,
    colors JSON,
    materials JSON,
    description TEXT NOT NULL,
    budget_range VARCHAR(50),
    timeline VARCHAR(50),
    reference_images JSON,
    status ENUM('pending', 'in_review', 'approved', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    admin_notes TEXT,
    estimated_price DECIMAL(10,2),
    estimated_completion DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Contact messages table
CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied', 'closed') DEFAULT 'new',
    admin_reply TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Newsletter subscribers table
CREATE TABLE newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    status ENUM('active', 'unsubscribed') DEFAULT 'active',
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL
);

-- Promo codes table
CREATE TABLE promo_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(200),
    discount_type ENUM('percentage', 'fixed') NOT NULL,
    discount_value DECIMAL(10,2) NOT NULL,
    minimum_order_amount DECIMAL(10,2) DEFAULT 0,
    usage_limit INT DEFAULT NULL,
    used_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
('Traditional Masks', 'traditional-masks', 'Authentic Sri Lankan traditional masks handcrafted by skilled artisans'),
('Textiles & Fabrics', 'textiles-fabrics', 'Handwoven textiles including batik, sarongs, and traditional fabrics'),
('Wood Crafts', 'wood-crafts', 'Intricately carved wooden sculptures, furniture, and decorative items'),
('Pottery & Ceramics', 'pottery-ceramics', 'Traditional clay pottery and ceramic items for daily use and decoration'),
('Jewelry & Accessories', 'jewelry-accessories', 'Handcrafted jewelry and accessories using traditional techniques');

-- Insert sample products
INSERT INTO products (name, slug, description, short_description, category_id, price, original_price, stock_quantity, sku, is_featured, is_new) VALUES
('Raksha Devil Mask', 'raksha-devil-mask', 'Traditional Sri Lankan Raksha mask used in cultural performances and ceremonies. Handcrafted by master artisans using traditional techniques passed down through generations.', 'Authentic handcrafted Raksha devil mask for cultural performances', 1, 4500.00, 5500.00, 15, 'MASK-RAK-001', TRUE, TRUE),
('Handwoven Batik Sarong', 'handwoven-batik-sarong', 'Beautiful handwoven batik sarong featuring traditional Sri Lankan patterns. Made from high-quality cotton using authentic batik techniques.', 'Traditional batik sarong with authentic Sri Lankan patterns', 2, 3200.00, 4000.00, 25, 'TEX-BAT-001', TRUE, FALSE),
('Carved Elephant Sculpture', 'carved-elephant-sculpture', 'Intricately carved wooden elephant sculpture representing good luck and prosperity in Sri Lankan culture. Made from sustainable teak wood.', 'Hand-carved wooden elephant sculpture in teak wood', 3, 8900.00, 10500.00, 8, 'WOOD-ELE-001', FALSE, TRUE),
('Clay Water Pot Set', 'clay-water-pot-set', 'Traditional clay water pot set perfect for keeping water cool naturally. Handmade by local potters using traditional techniques.', 'Traditional clay water pot set for natural cooling', 4, 2800.00, 3500.00, 20, 'POT-WAT-001', FALSE, FALSE),
('Silver Temple Jewelry', 'silver-temple-jewelry', 'Exquisite silver temple jewelry featuring traditional Sri Lankan designs. Perfect for special occasions and cultural ceremonies.', 'Handcrafted silver temple jewelry with traditional designs', 5, 12500.00, 15000.00, 12, 'JEW-SIL-001', TRUE, TRUE),
('Peacock Dance Mask', 'peacock-dance-mask', 'Colorful peacock dance mask used in traditional Sri Lankan dance performances. Features vibrant colors and intricate details.', 'Traditional peacock dance mask for cultural performances', 1, 5200.00, 6200.00, 10, 'MASK-PEA-001', TRUE, FALSE);

-- Insert sample product images
INSERT INTO product_images (product_id, image_url, alt_text, is_primary) VALUES
(1, 'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=400', 'Raksha Devil Mask', TRUE),
(2, 'https://images.pexels.com/photos/6069113/pexels-photo-6069113.jpeg?auto=compress&cs=tinysrgb&w=400', 'Handwoven Batik Sarong', TRUE),
(3, 'https://images.pexels.com/photos/6069114/pexels-photo-6069114.jpeg?auto=compress&cs=tinysrgb&w=400', 'Carved Elephant Sculpture', TRUE),
(4, 'https://images.pexels.com/photos/6069115/pexels-photo-6069115.jpeg?auto=compress&cs=tinysrgb&w=400', 'Clay Water Pot Set', TRUE),
(5, 'https://images.pexels.com/photos/6069116/pexels-photo-6069116.jpeg?auto=compress&cs=tinysrgb&w=400', 'Silver Temple Jewelry', TRUE),
(6, 'https://images.pexels.com/photos/6069117/pexels-photo-6069117.jpeg?auto=compress&cs=tinysrgb&w=400', 'Peacock Dance Mask', TRUE);

-- Insert sample reviews
INSERT INTO product_reviews (product_id, name, email, rating, title, review_text, is_approved) VALUES
(1, 'Amara Silva', 'amara@email.com', 5, 'Absolutely Beautiful!', 'This mask is incredibly detailed and authentic. Perfect for our cultural performance.', TRUE),
(2, 'John Smith', 'john@email.com', 4, 'Great Quality', 'Beautiful batik work and comfortable fabric. Highly recommended!', TRUE),
(3, 'Priya Patel', 'priya@email.com', 5, 'Stunning Craftsmanship', 'The attention to detail in this sculpture is amazing. Worth every penny!', TRUE);

-- Insert sample promo codes
INSERT INTO promo_codes (code, description, discount_type, discount_value, minimum_order_amount, usage_limit) VALUES
('WELCOME10', 'Welcome discount for new customers', 'percentage', 10.00, 1000.00, 100),
('FESTIVAL20', 'Festival season special discount', 'percentage', 20.00, 5000.00, 50),
('FREESHIP', 'Free shipping on orders above Rs. 10000', 'fixed', 500.00, 10000.00, NULL);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_reviews_product ON product_reviews(product_id);
CREATE INDEX idx_cart_user ON shopping_cart(user_id);
CREATE INDEX idx_cart_session ON shopping_cart(session_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order ON order_items(order_id);