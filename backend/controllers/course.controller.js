const Course = require('../models/course.model');
const User = require('../models/user.model');
const { ErrorResponse } = require('../middleware/errorHandler');

/**
 * @desc    Get all courses
 * @route   GET /api/courses
 * @access  Public
 */
exports.getCourses = async (req, res, next) => {
  try {
    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude from filtering
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Delete excluded fields from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    let query = Course.find(JSON.parse(queryStr));

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Course.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Execute query
    const courses = await query
      .populate({
        path: 'instructor',
        select: 'name'
      })
      .populate({
        path: 'reviews',
        select: 'rating'
      });

    // Pagination result
    const pagination = {
      total,
      limit,
      page,
      pages: Math.ceil(total / limit)
    };

    // Add next and prev if they exist
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: courses.length,
      pagination,
      data: courses
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single course
 * @route   GET /api/courses/:id
 * @access  Public
 */
exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate({
        path: 'instructor',
        select: 'name avatar'
      })
      .populate({
        path: 'reviews',
        select: 'rating content'
      })
      .populate({
        path: 'enrolledStudents',
        select: 'name avatar'
      });

    if (!course) {
      return next(
        new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new course
 * @route   POST /api/courses
 * @access  Private (Admin)
 */
exports.createCourse = async (req, res, next) => {
  try {
    // Set instructor to logged in user if admin
    if (req.user.role === 'admin') {
      req.body.instructor = req.user.id;
    } else {
      return next(
        new ErrorResponse('Only administrators can create courses', 403)
      );
    }

    const course = await Course.create(req.body);

    res.status(201).json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update course
 * @route   PUT /api/courses/:id
 * @access  Private (Admin)
 */
exports.updateCourse = async (req, res, next) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return next(
        new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is admin
    if (req.user.role !== 'admin') {
      return next(
        new ErrorResponse(`User ${req.user.id} is not authorized to update this course`, 403)
      );
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete course
 * @route   DELETE /api/courses/:id
 * @access  Private (Admin)
 */
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return next(
        new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is admin
    if (req.user.role !== 'admin') {
      return next(
        new ErrorResponse(`User ${req.user.id} is not authorized to delete this course`, 403)
      );
    }

    await course.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Enroll student in course
 * @route   POST /api/courses/:id/enroll
 * @access  Private
 */
exports.enrollCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return next(
        new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
      );
    }

    // Check if course is already full
    if (course.isFull()) {
      return next(
        new ErrorResponse(`Course is already at maximum capacity`, 400)
      );
    }

    // Check if enrollment is open
    if (course.enrollmentStatus !== 'open') {
      return next(
        new ErrorResponse(`Enrollment for this course is currently ${course.enrollmentStatus}`, 400)
      );
    }

    // Check if student is already enrolled
    const isEnrolled = course.enrolledStudents.some(
      student => student.toString() === req.user.id
    );

    if (isEnrolled) {
      return next(
        new ErrorResponse(`Already enrolled in course ${req.params.id}`, 400)
      );
    }

    // Add student to course
    course.enrolledStudents.push(req.user.id);
    await course.save();

    // Add course to student
    const user = await User.findById(req.user.id);
    user.enrolledCourses.push(course._id);
    await user.save();

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Unenroll student from course
 * @route   DELETE /api/courses/:id/enroll
 * @access  Private
 */
exports.unenrollCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return next(
        new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
      );
    }

    // Check if student is enrolled
    const isEnrolled = course.enrolledStudents.some(
      student => student.toString() === req.user.id
    );

    if (!isEnrolled) {
      return next(
        new ErrorResponse(`Not enrolled in course ${req.params.id}`, 400)
      );
    }

    // Remove student from course
    course.enrolledStudents = course.enrolledStudents.filter(
      student => student.toString() !== req.user.id
    );
    await course.save();

    // Remove course from student
    const user = await User.findById(req.user.id);
    user.enrolledCourses = user.enrolledCourses.filter(
      enrolledCourse => enrolledCourse.toString() !== course._id.toString()
    );
    await user.save();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get courses by standard and medium
 * @route   GET /api/courses/filter/:standard/:medium
 * @access  Public
 */
exports.getCoursesByStandardAndMedium = async (req, res, next) => {
  try {
    const { standard, medium } = req.params;

    const courses = await Course.find({
      standard,
      medium
    }).populate({
      path: 'instructor',
      select: 'name'
    });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get popular courses
 * @route   GET /api/courses/popular
 * @access  Public
 */
exports.getPopularCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ isPopular: true })
      .limit(6)
      .populate({
        path: 'instructor',
        select: 'name'
      });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    next(error);
  }
};
