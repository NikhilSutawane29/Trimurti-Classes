const express = require('express');
const router = express.Router();
const {
  submitContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
  getContactStats
} = require('../controllers/contact.controller');

// Import middleware
const { protect, isAdmin } = require('../middleware/auth');

// Public routes
router.post('/', submitContact);

// Protected admin routes
router.use(protect, isAdmin);

router.get('/', getContacts);
router.get('/stats', getContactStats);
router.route('/:id')
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
