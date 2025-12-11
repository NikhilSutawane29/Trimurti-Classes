const express = require('express');
const router = express.Router();
const {
  getGalleryImages,
  getGalleryByCategory,
  addGalleryImages,
  deleteGalleryImage,
  updateGalleryImage
} = require('../controllers/gallery.controller');

const { protect, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', getGalleryImages);
router.get('/:category', getGalleryByCategory);

// Admin routes
router.post('/', protect, isAdmin, addGalleryImages);
router.put('/:id', protect, isAdmin, updateGalleryImage);
router.delete('/:id', protect, isAdmin, deleteGalleryImage);

module.exports = router;
