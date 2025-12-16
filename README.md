# Click Fit - Fitness Website

A responsive, full-stack fitness web application built with Node.js, Express, PostgreSQL, and modern web technologies.

## 📋 Project Overview

Click Fit is a single-page fitness website featuring:
- Responsive design with smooth animations
- Real-time data fetching from external APIs
- Image upload functionality with drag & drop support
- PostgreSQL database integration with stored procedures
- Professional UI/UX with modern design patterns

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup structure
- **CSS3** - Custom styling with animations and gradients
- **JavaScript (ES6)** - Modern JavaScript features
- **Bootstrap 5.3.0** - Responsive grid system and components
- **jQuery 3.7.0** - DOM manipulation and AJAX calls
- **Font Awesome 6.4.0** - Icon library
- **Google Fonts (Poppins)** - Typography

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 4.18.2** - Web application framework
- **Multer 1.4.5** - Middleware for handling multipart/form-data (file uploads)
- **CORS 2.8.5** - Cross-Origin Resource Sharing middleware
- **dotenv 16.4.5** - Environment variable management

### Database
- **PostgreSQL 17** - Relational database management system
- **pg 8.11.3** - PostgreSQL client for Node.js

## 📁 Project Structure

```
clickfit/
├── server.js                    # Express server and API endpoints
├── db.js                        # PostgreSQL database connection
├── package.json                 # Node.js dependencies and scripts
├── database_postgres.sql        # Database schema and stored procedures
├── .env                         # Environment variables (not in repository)
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── README.md                    # Project documentation
├── public/                      # Static files served by Express
│   ├── index.html              # Main HTML page
│   ├── styles.css              # Custom CSS styles and animations
│   └── script.js               # Client-side JavaScript
└── upload_images/              # Directory for uploaded images (auto-created)
```

## ✨ Features

### 1. Responsive Design
- Mobile-first approach using Bootstrap grid system
- Custom CSS media queries for optimal viewing on all devices
- Smooth animations and transitions for enhanced user experience

### 2. AJAX API Integration
- Fetches data from external REST API (http://numbersapi.com/1/30/date?json)
- Displays historical facts dynamically on page load
- Error handling with fallback content

### 3. Image Upload System
- Drag and drop file upload interface
- Click to browse and select multiple images
- Real-time image preview before upload
- Files saved to local `upload_images` folder with unique timestamps
- Supports JPG, PNG, GIF, and WEBP formats
- File size validation (5MB limit per file)

### 4. Database Integration
- PostgreSQL database with `users` table
- Stored procedure `addUser` for inserting new users
- Secure connection using environment variables
- Prepared statements to prevent SQL injection

### 5. Modern UI/UX
- Gradient backgrounds and glassmorphism effects
- Floating animations on feature cards
- Smooth scroll navigation
- Interactive hover effects
- Professional color scheme with CSS variables

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm (Node Package Manager)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd clickfit
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all required packages:
- express
- multer
- cors
- pg
- dotenv

### Step 3: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   (On Windows: `copy .env.example .env`)

2. Edit `.env` file with your PostgreSQL credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD="your_password_here"
   DB_NAME=clickfit_db
   ```

   **Note:** Use quotes around the password if it contains special characters like `@` or `#`

### Step 4: Setup Database

1. Open **PgAdmin** or **psql** terminal
2. Create the database:
   ```sql
   CREATE DATABASE clickfit_db;
   ```
3. Connect to the database and run the SQL script:
   ```bash
   psql -U postgres -d clickfit_db -f database_postgres.sql
   ```
   Or copy and paste the contents of `database_postgres.sql` into PgAdmin Query Tool

This will:
- Create `users` table with columns: userId, email, password, type, active, created_at
- Create `addUser()` stored procedure/function
- Insert 5 sample users for testing

### Step 5: Start the Server
```bash
npm start
```

For development with auto-restart (requires nodemon):
```bash
npm run dev
```

### Step 6: Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

## 🔧 Configuration

### Server Configuration
- Default port: `3000` (can be changed in `server.js`)
- Upload directory: `upload_images/` (created automatically)
- Max file size: 5MB per image
- Allowed file types: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`

### Database Configuration
All database settings are managed through environment variables in `.env` file for security.

## 📝 API Endpoints

### GET `/`
Serves the main HTML page

**Response:** `index.html`

---

### POST `/upload`
Handles image file uploads

**Request:**
- Content-Type: `multipart/form-data`
- Body: Form data with field name `images` (supports multiple files)

**Response:**
```json
{
  "success": true,
  "message": "Files uploaded successfully",
  "files": [
    {
      "filename": "images-1234567890-photo.jpg",
      "originalname": "photo.jpg",
      "size": 156789,
      "path": "upload_images/images-1234567890-photo.jpg"
    }
  ]
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error description"
}
```

---

### GET `/images`
Returns list of uploaded images

**Response:**
```json
{
  "success": true,
  "images": ["image1.jpg", "image2.png"]
}
```

---

### POST `/api/addUser`
Adds a new user to the database using stored procedure

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "hashed_password",
  "type": "user",
  "active": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "User added successfully",
  "data": { "userId": 6 }
}
```

---

### GET `/api/users`
Returns all users (excludes passwords)

**Response:**
```json
{
  "success": true,
  "users": [
    {
      "userId": 1,
      "email": "john.doe@example.com",
      "type": "admin",
      "active": 1
    }
  ]
}
```

## 🎨 Frontend Features

### Animations
- **fadeInUp** - Elements fade in while moving up
- **slideInLeft/Right** - Elements slide in from sides
- **bounce** - Upload icon bouncing effect
- **float** - Feature icons floating animation
- **pulse** - Pulsing effect on hover
- **scaleIn** - Image previews scale in effect

### Responsive Breakpoints
- Desktop: > 768px
- Tablet: 768px
- Mobile: < 768px

## 🔒 Security Features

### Environment Variables
- Sensitive credentials stored in `.env` file
- `.env` file excluded from version control via `.gitignore`
- Example template provided in `.env.example`

### File Upload Security
- File type validation (images only)
- File size limits (5MB max)
- Unique filename generation to prevent overwrites
- Sanitized file paths

### Database Security
- Parameterized queries to prevent SQL injection
- Password field excluded from API responses
- Connection pooling for efficient resource management

## 🧪 Testing

### Test Image Upload
1. Navigate to "Share Your Progress" section
2. Drag and drop images or click to browse
3. Check `upload_images/` folder for uploaded files
4. Verify success alert appears

### Test API Connection
1. Open browser console (F12)
2. Check for "NumbersAPI data loaded successfully" message
3. Verify fun fact appears in the "Today in History" box

### Test Database Connection
1. Server should log "✓ Successfully connected to PostgreSQL database"
2. Visit `http://localhost:3000/api/users` to see database records
3. Use PgAdmin to verify data in `users` table

## 📊 Database Schema

### Users Table
```sql
Column      | Type         | Constraints
------------|--------------|----------------------------------
userId      | SERIAL       | PRIMARY KEY
email       | VARCHAR(255) | NOT NULL, UNIQUE
password    | VARCHAR(255) | NOT NULL
type        | VARCHAR(50)  | NOT NULL
active      | SMALLINT     | DEFAULT 1
created_at  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP
```

### addUser Function
```sql
Parameters:
  - p_email: VARCHAR(255)
  - p_password: VARCHAR(255)
  - p_type: VARCHAR(50)
  - p_active: SMALLINT (default 1)

Returns: TABLE(userId INT)
```

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is already in use, change it in `server.js`:
```javascript
const PORT = 3001; // or any other available port
```

### Database Connection Failed
1. Verify PostgreSQL is running
2. Check credentials in `.env` file
3. Ensure database `clickfit_db` exists
4. Test connection using PgAdmin

### Upload Not Working
1. Ensure server is running (`npm start`)
2. Check browser console for errors (F12)
3. Verify `upload_images/` folder exists and has write permissions
4. Check file size is under 5MB
5. Ensure file type is an image format

### API Call Failed
- NumbersAPI may be slow or down
- Fallback message will display automatically
- Check browser console for network errors

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "multer": "^1.4.5-lts.1",
  "cors": "^2.8.5",
  "pg": "^8.11.3",
  "dotenv": "^16.4.5"
}
```

## 🚫 .gitignore

The following files/folders are excluded from version control:
- `node_modules/` - Dependencies
- `.env` - Environment variables with credentials
- `upload_images/` - User uploaded files
- `*.log` - Log files
- OS and IDE specific files

## 📄 License

This project is created for educational and assessment purposes.

## 👤 Author

Created as a technical skills assessment project.

## 🙏 Acknowledgments

- Bootstrap for responsive framework
- Font Awesome for icons
- NumbersAPI for historical facts
- Google Fonts for typography

---

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Verify all prerequisites are installed
3. Ensure `.env` file is configured correctly
4. Check server logs for error messages

---

**Last Updated:** December 2025
<img width="1902" height="965" alt="Screenshot 2025-12-16 092006" src="https://github.com/user-attachments/assets/29c9c5f4-4ecc-4dc0-8aa7-7edeb735d54e" />


