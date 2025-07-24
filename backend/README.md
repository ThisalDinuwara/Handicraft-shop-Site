# Kandu Pinnawala Handicraft Shop - Backend API

This is the PHP backend API for the Kandu Pinnawala Handicraft Shop website.

## Setup Instructions

### 1. Database Setup

1. Open phpMyAdmin or your MySQL client
2. Create a new database named `kandu_pinnawala_shop`
3. Import the database schema from `database/schema.sql`

### 2. Configuration

1. Update the database connection settings in `config/database.php`:
   - `$host`: Your MySQL host (usually 'localhost')
   - `$db_name`: Database name ('kandu_pinnawala_shop')
   - `$username`: Your MySQL username (usually 'root')
   - `$password`: Your MySQL password

### 3. File Structure

```
backend/
├── config/
│   └── database.php          # Database connection configuration
├── database/
│   └── schema.sql           # Complete database schema with sample data
├── api/
│   ├── products.php         # Product management API
│   ├── categories.php       # Category management API
│   ├── users.php           # User authentication and management
│   ├── cart.php            # Shopping cart functionality
│   ├── orders.php          # Order management
│   ├── custom-products.php # Custom product requests
│   ├── contact.php         # Contact form handling
│   ├── newsletter.php      # Newsletter subscription
│   └── promo-codes.php     # Promo code validation
└── README.md               # This file
```

## API Endpoints

### Products API (`/api/products.php`)
- `GET /api/products.php` - Get all products
- `GET /api/products.php?category=masks` - Get products by category
- `GET /api/products.php?featured=1` - Get featured products
- `GET /api/products.php?search=mask` - Search products
- `GET /api/products.php?id=1` - Get single product
- `POST /api/products.php` - Create new product

### Categories API (`/api/categories.php`)
- `GET /api/categories.php` - Get all categories
- `GET /api/categories.php?id=1` - Get single category

### Users API (`/api/users.php`)
- `POST /api/users.php` - Register new user
- `POST /api/users.php` (with action: 'login') - User login
- `GET /api/users.php?id=1` - Get user profile
- `PUT /api/users.php` - Update user profile

### Cart API (`/api/cart.php`)
- `GET /api/cart.php?user_id=1` - Get user's cart
- `GET /api/cart.php?session_id=abc123` - Get guest cart
- `POST /api/cart.php` - Add item to cart
- `PUT /api/cart.php` - Update cart item quantity
- `DELETE /api/cart.php?id=1` - Remove cart item

### Orders API (`/api/orders.php`)
- `GET /api/orders.php?user_id=1` - Get user's orders
- `GET /api/orders.php?id=1` - Get single order
- `POST /api/orders.php` - Create new order
- `PUT /api/orders.php` - Update order status

### Custom Products API (`/api/custom-products.php`)
- `GET /api/custom-products.php?user_id=1` - Get user's custom requests
- `GET /api/custom-products.php?id=1` - Get single request
- `POST /api/custom-products.php` - Submit custom product request
- `PUT /api/custom-products.php` - Update request status

### Contact API (`/api/contact.php`)
- `GET /api/contact.php` - Get all contact messages
- `POST /api/contact.php` - Submit contact message
- `PUT /api/contact.php` - Update message status

### Newsletter API (`/api/newsletter.php`)
- `GET /api/newsletter.php` - Get subscribers
- `POST /api/newsletter.php` - Subscribe to newsletter
- `POST /api/newsletter.php` (with action: 'unsubscribe') - Unsubscribe

### Promo Codes API (`/api/promo-codes.php`)
- `GET /api/promo-codes.php?validate=1&code=WELCOME10&order_amount=5000` - Validate promo code
- `GET /api/promo-codes.php` - Get all promo codes
- `POST /api/promo-codes.php` - Create new promo code
- `POST /api/promo-codes.php` (with action: 'use') - Use promo code

## Sample Data

The database schema includes sample data:
- 5 product categories
- 6 sample products with images and reviews
- 3 promo codes (including 'WELCOME10' for 10% off)

## Security Features

- Password hashing using PHP's `password_hash()`
- SQL injection prevention using prepared statements
- CORS headers for cross-origin requests
- Input validation and sanitization

## Usage Examples

### Register a new user:
```javascript
fetch('http://localhost/backend/api/users.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone: '+94771234567',
        address: '123 Main St, Colombo',
        password: 'securepassword'
    })
})
```

### Login:
```javascript
fetch('http://localhost/backend/api/users.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        action: 'login',
        email: 'john@example.com',
        password: 'securepassword'
    })
})
```

### Get products:
```javascript
fetch('http://localhost/backend/api/products.php')
    .then(response => response.json())
    .then(data => console.log(data));
```

### Add to cart:
```javascript
fetch('http://localhost/backend/api/cart.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        user_id: 1, // or session_id for guests
        product_id: 1,
        quantity: 2
    })
})
```

## Requirements

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Web server (Apache/Nginx)
- PDO MySQL extension enabled

## Installation on XAMPP/WAMP

1. Copy the `backend` folder to your `htdocs` directory
2. Start Apache and MySQL services
3. Open phpMyAdmin and create the database
4. Import the schema.sql file
5. Update database credentials in `config/database.php`
6. Access APIs via `http://localhost/backend/api/`

The backend is now ready to serve your Kandu Pinnawala Handicraft Shop frontend!