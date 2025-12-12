const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const db = require('./db'); // Import database connection
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Create upload_images folder if it doesn't exist
const uploadDir = path.join(__dirname, 'upload_images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload_images/');
    },
    filename: function (req, file, cb) {
        // Generate unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'));
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: fileFilter
});

// Routes

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Upload endpoint
app.post('/upload', upload.array('images', 10), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No files uploaded'
            });
        }

        const fileInfos = req.files.map(file => ({
            filename: file.filename,
            originalname: file.originalname,
            size: file.size,
            path: file.path
        }));

        res.json({
            success: true,
            message: 'Files uploaded successfully',
            files: fileInfos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error uploading files',
            error: error.message
        });
    }
});

// Get list of uploaded images
app.get('/images', (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error reading upload directory'
            });
        }

        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
        });

        res.json({
            success: true,
            images: imageFiles
        });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File size too large. Maximum size is 5MB'
            });
        }
    }
    
    res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Upload directory: ${uploadDir}`);
});

// Example database route - Add user using stored procedure
app.post('/api/addUser', async (req, res) => {
    const { email, password, type, active } = req.body;
    
    try {
        // PostgreSQL query
        const result = await db.query(
            'SELECT * FROM addUser($1, $2, $3, $4)',
            [email, password, type, active || 1]
        );
        
        res.json({
            success: true,
            message: 'User added successfully',
            data: result.rows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding user',
            error: error.message
        });
    }
});

// Get all users
app.get('/api/users', async (req, res) => {
    try {
        const result = await db.query('SELECT userId, email, type, active FROM users');
        
        res.json({
            success: true,
            users: result.rows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
});