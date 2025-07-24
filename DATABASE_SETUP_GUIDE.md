# 🗄️ Database Setup Guide for Kandu Pinnawala Handicraft Shop

## 📋 Prerequisites
- **XAMPP/WAMP/MAMP** or any local server with PHP and MySQL
- **phpMyAdmin** (usually included with XAMPP)
- **Web browser**

## 🚀 Step-by-Step Setup Instructions

### Step 1: Start Your Local Server
1. **Start XAMPP Control Panel**
2. **Start Apache** (for PHP)
3. **Start MySQL** (for database)

### Step 2: Create Database in phpMyAdmin
1. Open your browser and go to: `http://localhost/phpmyadmin`
2. Click **"New"** in the left sidebar
3. Enter database name: `kandu_pinnawala_shop`
4. Click **"Create"**

### Step 3: Import Database Schema
1. **Select your database** `kandu_pinnawala_shop` from the left sidebar
2. Click the **"Import"** tab at the top
3. Click **"Choose File"** and select: `backend/database/schema.sql`
4. Click **"Go"** to import
5. ✅ You should see: **"Import has been successfully finished"**

### Step 4: Configure Database Connection
1. Open: `backend/config/database.php`
2. Update the database credentials:

```php
private $host = "localhost";              // Usually localhost
private $db_name = "kandu_pinnawala_shop"; // Your database name
private $username = "root";               // Default XAMPP username
private $password = "";                   // Default XAMPP password (empty)
```

### Step 5: Place Backend Files
1. **Copy the entire `backend` folder** to your web server directory:
   - **XAMPP**: `C:\xampp\htdocs\backend\`
   - **WAMP**: `C:\wamp64\www\backend\`
   - **MAMP**: `/Applications/MAMP/htdocs/backend/`

### Step 6: Test Database Connection
1. Open your browser and go to: `http://localhost/backend/test-connection.php`
2. You should see a JSON response like:
```json
{
  "success": true,
  "message": "Database connection successful!",
  "data": {
    "products": 6,
    "categories": 5,
    "database": "kandu_pinnawala_shop",
    "timestamp": "2024-01-20 15:30:45"
  }
}
```

## 🎯 API Endpoints Available

Once setup is complete, you can access these endpoints:

### Products
- `GET http://localhost/backend/api/products.php` - Get all products
- `GET http://localhost/backend/api/products.php?category=masks` - Get products by category
- `GET http://localhost/backend/api/products.php?featured=1` - Get featured products

### Categories
- `GET http://localhost/backend/api/categories.php` - Get all categories

### Users
- `POST http://localhost/backend/api/users.php` - Register user
- `POST http://localhost/backend/api/users.php` (with action: 'login') - Login user

### Cart
- `GET http://localhost/backend/api/cart.php?session_id=abc123` - Get cart items
- `POST http://localhost/backend/api/cart.php` - Add item to cart

## 🔧 Frontend Integration

Update your frontend API base URL in `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://localhost/backend/api';
```

## 📊 Sample Data Included

The database comes pre-populated with:
- **6 Products**: Traditional masks, textiles, wood crafts, pottery, jewelry
- **5 Categories**: Masks, Textiles, Wood Crafts, Pottery, Jewelry
- **Product Reviews**: Sample reviews with ratings
- **Promo Codes**: 
  - `WELCOME10` - 10% off orders over Rs. 1,000
  - `FESTIVAL20` - 20% off orders over Rs. 5,000
  - `FREESHIP` - Free shipping on orders over Rs. 10,000

## 🛠️ Troubleshooting

### Common Issues:

**1. "Access denied for user 'root'"**
- Check your MySQL username/password in `database.php`
- Default XAMPP: username=`root`, password=`` (empty)

**2. "Database connection failed"**
- Make sure MySQL service is running in XAMPP
- Verify database name is exactly: `kandu_pinnawala_shop`

**3. "Table doesn't exist"**
- Re-import the `schema.sql` file in phpMyAdmin
- Make sure import was successful

**4. CORS errors in browser**
- The API includes CORS headers, but make sure you're accessing via `http://localhost`

**5. 404 errors on API calls**
- Verify backend folder is in the correct web server directory
- Check that Apache is running

## ✅ Verification Checklist

- [ ] XAMPP/WAMP Apache and MySQL are running
- [ ] Database `kandu_pinnawala_shop` created in phpMyAdmin
- [ ] Schema imported successfully (13 tables created)
- [ ] Backend folder placed in web server directory
- [ ] Database credentials updated in `config/database.php`
- [ ] Test connection returns success: `http://localhost/backend/test-connection.php`
- [ ] API endpoints accessible: `http://localhost/backend/api/products.php`

## 🎉 Success!

Once all steps are complete, your Kandu Pinnawala website will have:
- ✅ Full database connectivity
- ✅ Working API endpoints
- ✅ User authentication
- ✅ Shopping cart functionality
- ✅ Product management
- ✅ Custom product requests
- ✅ Contact form handling

Your handicraft shop is now ready for business! 🛍️