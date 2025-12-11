const express = require('express');
const router = express.Router();
const {
  adminLogin,
  getAdmissions,
  getContacts,
  getMe,
  adminLogout
} = require('../controllers/admin.controller');

const { protect, authorize } = require('../middleware/auth');

/**
 * @route   POST /api/admin/login
 * @desc    Admin login
 * @access  Public
 */
router.post('/login', adminLogin);

/**
 * @route   POST /api/admin/logout
 * @desc    Admin logout
 * @access  Private/Admin
 */
router.post('/logout', protect, authorize('admin'), adminLogout);

/**
 * @route   GET /api/admin/me
 * @desc    Get current admin user
 * @access  Private/Admin
 */
router.get('/me', protect, authorize('admin'), getMe);

/**
 * @route   GET /api/admin/admissions
 * @desc    Get all admission submissions
 * @access  Private/Admin
 */
router.get('/admissions', protect, authorize('admin'), getAdmissions);

/**
 * @route   GET /api/admin/contacts
 * @desc    Get all contact form submissions
 * @access  Private/Admin
 */
router.get('/contacts', protect, authorize('admin'), getContacts);

module.exports = router;
