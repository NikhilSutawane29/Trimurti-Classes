const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  uploadImageToCloudinary,
  uploadBase64Image,
  deleteImageFromCloudinary,
  uploadMultipleImages,
  getUploadConfig
} = require('../controllers/upload.controller');

// Import middleware
const { protect, isAdmin } = require('../middleware/auth');

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${path.basename(file.originalname)}`);
  }
});

// File filter for images
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Initialize upload
const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Apply admin protection to all routes
router.use(protect);
router.use(isAdmin);

// Get upload configuration
router.get('/config', getUploadConfig);

// Upload single image
router.post('/image', upload.single('image'), uploadImageToCloudinary);

// Upload multiple images
router.post('/multiple', upload.array('images', 10), uploadMultipleImages);

// Upload single gallery image
router.post('/gallery', upload.single('image'), uploadImageToCloudinary);

// Upload multiple gallery images
router.post('/gallery/multiple', upload.array('images', 10), uploadMultipleImages);

// Base64 image upload route
router.post('/base64', uploadBase64Image);

// Delete gallery image
router.delete('/gallery/:publicId', deleteImageFromCloudinary);

// Delete image route
router.delete('/:publicId', deleteImageFromCloudinary);

module.exports = router;
