const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
  unenrollCourse,
  getCoursesByStandardAndMedium,
  getPopularCourses
} = require('../controllers/course.controller');

// Import middleware
const { protect, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', getCourses);
router.get('/popular', getPopularCourses);
router.get('/:id', getCourse);
router.get('/filter/:standard/:medium', getCoursesByStandardAndMedium);

// Protected routes - require authentication
router.use(protect);

// Student enrollment routes
router.route('/:id/enroll')
  .post(enrollCourse)
  .delete(unenrollCourse);

// Admin only routes
router.route('/')
  .post(isAdmin, createCourse);

router.route('/:id')
  .put(isAdmin, updateCourse)
  .delete(isAdmin, deleteCourse);

module.exports = router;
