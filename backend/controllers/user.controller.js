const User = require('../models/user.model');
const { ErrorResponse } = require('../middleware/errorHandler');

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
 */
exports.getUsers = async (req, res, next) => {
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
    let query = User.find(JSON.parse(queryStr));

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
    const total = await User.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Execute query
    const users = await query.populate({
      path: 'enrolledCourses',
      select: 'title standard medium'
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
      count: users.length,
      pagination,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single user
 * @route   GET /api/users/:id
 * @access  Private/Admin or Self
 */
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: 'enrolledCourses',
      select: 'title standard medium'
    });

    if (!user) {
      return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    // Check if user is admin or getting their own record
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return next(new ErrorResponse(`Not authorized to access this user's data`, 403));
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create user
 * @route   POST /api/users
 * @access  Private/Admin
 */
exports.createUser = async (req, res, next) => {
  try {
    // Check if user already exists
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return next(new ErrorResponse('User with that email already exists', 400));
    }

    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user
 * @route   PUT /api/users/:id
 * @access  Private/Admin or Self
 */
exports.updateUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    // Check if user is admin or updating their own record
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return next(new ErrorResponse(`Not authorized to update this user`, 403));
    }

    // If not admin, prevent role change
    if (req.user.role !== 'admin' && req.body.role) {
      delete req.body.role; // Remove role from the update data
    }

    // Don't allow password updates through this route
    if (req.body.password) {
      delete req.body.password;
    }

    user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user.id) {
      return next(new ErrorResponse('Cannot delete your own account', 400));
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get students by standard and medium
 * @route   GET /api/users/students/:standard/:medium
 * @access  Private/Admin
 */
exports.getStudentsByStandardAndMedium = async (req, res, next) => {
  try {
    const { standard, medium } = req.params;

    const students = await User.find({
      role: 'student',
      standard,
      medium
    }).populate({
      path: 'enrolledCourses',
      select: 'title'
    });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user statistics (counts by role, medium, etc)
 * @route   GET /api/users/stats
 * @access  Private/Admin
 */
exports.getUserStats = async (req, res, next) => {
  try {
    // Get total counts by role
    const roleCounts = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    // Get student counts by medium
    const mediumCounts = await User.aggregate([
      { $match: { role: 'student' } },
      { $group: { _id: '$medium', count: { $sum: 1 } } }
    ]);

    // Get student counts by standard
    const standardCounts = await User.aggregate([
      { $match: { role: 'student' } },
      { $group: { _id: '$standard', count: { $sum: 1 } } }
    ]);

    // Get new user counts for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const newUserCounts = await User.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        roleCounts,
        mediumCounts,
        standardCounts,
        newUserCounts
      }
    });
  } catch (error) {
    next(error);
  }
};
