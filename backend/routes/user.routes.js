const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getStudentsByStandardAndMedium,
  getUserStats
} = require('../controllers/user.controller');

// Import middleware
const { protect, authorize, isAdmin } = require('../middleware/auth');

// Apply protection to all routes
router.use(protect);

// Admin-only routes
router.use(isAdmin);
router.route('/')
  .get(getUsers)
  .post(createUser);

router.get('/stats', getUserStats);
router.get('/students/:standard/:medium', getStudentsByStandardAndMedium);

// Routes with ownership or admin access
router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
