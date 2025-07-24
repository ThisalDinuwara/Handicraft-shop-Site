# 🚀 Complete Setup Guide - Kandu Pinnawala Handicraft Shop

## 📋 Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **XAMPP/WAMP/MAMP** - For PHP and MySQL - [Download XAMPP](https://www.apachefriends.org/)
- **Web Browser** - Chrome, Firefox, Safari, or Edge
- **Code Editor** (Optional) - VS Code, Sublime Text, etc.

## 🎯 Quick Start (5 Minutes)

### Step 1: Start Local Server
1. **Open XAMPP Control Panel**
2. **Start Apache** (for PHP backend)
3. **Start MySQL** (for database)

### Step 2: Setup Database
1. Open browser: `http://localhost/phpmyadmin`
2. Click **"New"** → Create database: `kandu_pinnawala_shop`
3. Select the database → Click **"Import"** tab
4. Choose file: `backend/database/schema.sql` → Click **"Go"**
5. ✅ Success: "Import has been successfully finished"

### Step 3: Configure Backend
1. **Copy backend folder** to your web server:
   - **XAMPP**: `C:\xampp\htdocs\backend\`
   - **WAMP**: `C:\wamp64\www\backend\`
   - **MAMP**: `/Applications/MAMP/htdocs/backend/`

2. **Update database credentials** in `backend/config/database.php`:
```php
private $host = "localhost";
private $db_name = "kandu_pinnawala_shop";
private $username = "root";     // Default XAMPP
private $password = "";         // Default XAMPP (empty)
```

### Step 4: Test Backend Connection
Visit: `http://localhost/backend/test-connection.php`

✅ **Success Response:**
```json
{
  "success": true,
  "message": "Database connection successful!",
  "data": {
    "products": 6,
    "categories": 5
  }
}
```

### Step 5: Start Frontend
1. **Open terminal** in project root
2. **Install dependencies:**
```bash
npm install
```
3. **Start development server:**
```bash
npm run dev
```
4. **Open browser:** `http://localhost:5173`

## 🌐 Website Access Points

### 🏠 **Main Website**
- **URL**: `http://localhost:5173`
- **Features**: Shopping, products, cart, custom orders, contact

### 🔐 **Admin Panel**
- **URL**: `http://localhost:5173/admin`
- **Login Credentials**:
  - Username: `admin`
  - Password: `admin123`
- **Features**: Product management, sales reports, user management, orders

### 🔧 **API Endpoints**
- **Base URL**: `http://localhost/backend/api/`
- **Test Connection**: `http://localhost/backend/test-connection.php`

## 📊 Pre-loaded Sample Data

### 🛍️ **Products (6 items)**
- Raksha Devil Mask - Rs. 4,500
- Handwoven Batik Sarong - Rs. 3,200
- Carved Elephant Sculpture - Rs. 8,900
- Clay Water Pot Set - Rs. 2,800
- Silver Temple Jewelry - Rs. 12,500
- Peacock Dance Mask - Rs. 5,200

### 🏷️ **Categories (5 types)**
- Traditional Masks
- Textiles & Fabrics
- Wood Crafts
- Pottery & Ceramics
- Jewelry & Accessories

### 🎫 **Promo Codes**
- `WELCOME10` - 10% off orders over Rs. 1,000
- `FESTIVAL20` - 20% off orders over Rs. 5,000
- `FREESHIP` - Free shipping on orders over Rs. 10,000

## 🎯 Website Features

### 🛒 **Customer Features**
- **Product Browsing**: View all handicraft products
- **Search & Filter**: Find products by category and price
- **Shopping Cart**: Add/remove items, apply promo codes
- **Custom Orders**: Request personalized handicrafts
- **User Registration**: Create account and login
- **Contact Form**: Send inquiries to the shop

### 👨‍💼 **Admin Features**
- **Dashboard**: Sales overview and key metrics
- **Product Management**: Add, edit, delete products
- **Sales Reports**: Revenue tracking and analytics
- **User Management**: Customer account control
- **Order Management**: Process and track orders

## 🔧 Troubleshooting

### ❌ **Common Issues**

**1. "Database connection failed"**
- ✅ Check XAMPP MySQL is running
- ✅ Verify database name: `kandu_pinnawala_shop`
- ✅ Check credentials in `backend/config/database.php`

**2. "404 Not Found" on API calls**
- ✅ Ensure backend folder is in web server directory
- ✅ Check Apache is running in XAMPP
- ✅ Verify URL: `http://localhost/backend/api/products.php`

**3. Frontend won't start**
- ✅ Run `npm install` first
- ✅ Check Node.js version (v16+)
- ✅ Try `npm run dev` again

**4. Admin panel won't load**
- ✅ Check URL: `http://localhost:5173/admin`
- ✅ Use credentials: admin/admin123
- ✅ Clear browser cache

**5. CORS errors**
- ✅ Backend includes CORS headers
- ✅ Access via `http://localhost` (not file://)

## 📁 Project Structure

```
kandu-pinnawala/
├── src/                    # Frontend React code
│   ├── components/         # React components
│   ├── admin/             # Admin panel components
│   ├── services/          # API services
│   └── hooks/             # Custom React hooks
├── backend/               # PHP backend
│   ├── api/              # API endpoints
│   ├── config/           # Database configuration
│   └── database/         # SQL schema
├── public/               # Static assets
└── package.json          # Dependencies
```

## 🚀 Production Deployment

### **For Live Server:**
1. Upload files to web hosting
2. Create MySQL database on hosting
3. Import `schema.sql`
4. Update `database.php` with hosting credentials
5. Build frontend: `npm run build`
6. Upload `dist/` folder contents

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Ensure XAMPP services are running
4. Check browser console for errors

## ✅ Success Checklist

- [ ] XAMPP Apache and MySQL running
- [ ] Database `kandu_pinnawala_shop` created and imported
- [ ] Backend folder in web server directory
- [ ] Test connection returns success
- [ ] Frontend starts with `npm run dev`
- [ ] Website loads at `http://localhost:5173`
- [ ] Admin panel accessible at `/admin`
- [ ] Products display correctly
- [ ] Cart functionality works
- [ ] Search and filters work

🎉 **Congratulations!** Your Kandu Pinnawala handicraft shop is now running with full e-commerce functionality, admin panel, and database connectivity!