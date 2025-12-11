const express = require('express');
const router = express.Router();
const {
  submitAdmission,
  getAdmissions,
  getAdmission,
  updateAdmission,
  deleteAdmission,
  getAdmissionStats
} = require('../controllers/admission.controller');

const { protect, authorize } = require('../middleware/auth');

/**
 * @route   POST /api/admissions
 * @desc    Submit admission inquiry
 * @access  Public
 */
router.post('/', submitAdmission);

/**
 * @route   GET /api/admissions/stats
 * @desc    Get admission statistics
 * @access  Private/Admin
 * @note    This route must come before /:id route
 */
router.get('/stats', protect, authorize('admin'), getAdmissionStats);

/**
 * @route   GET /api/admissions
 * @desc    Get all admission inquiries
 * @access  Private/Admin
 */
router.get('/', protect, authorize('admin'), getAdmissions);

/**
 * @route   GET /api/admissions/:id
 * @desc    Get single admission inquiry
 * @access  Private/Admin
 */
router.get('/:id', protect, authorize('admin'), getAdmission);

/**
 * @route   PUT /api/admissions/:id
 * @desc    Update admission inquiry status
 * @access  Private/Admin
 */
router.put('/:id', protect, authorize('admin'), updateAdmission);

/**
 * @route   DELETE /api/admissions/:id
 * @desc    Delete admission inquiry
 * @access  Private/Admin
 */
router.delete('/:id', protect, authorize('admin'), deleteAdmission);

module.exports = router;
