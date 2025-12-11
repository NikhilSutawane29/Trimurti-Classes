const jwt = require('jsonwebtoken');
const { ErrorResponse } = require('./errorHandler');
const User = require('../models/user.model');

/**
 * Protect routes - Verify user is authenticated
 */
const protect = async (req, res, next) => {
  let token;

  // Get token from authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token
    token = req.headers.authorization.split(' ')[1];
  }
  // Check for token in cookies
  else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  // Check if token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from the token
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return next(new ErrorResponse('User not found', 404));
    }

    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};

/**
 * Authorize specific roles
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ErrorResponse('User not authenticated', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};

/**
 * Check if user is an admin
 */
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new ErrorResponse('Only administrators can access this route', 403));
  }
  next();
};

/**
 * Check if user is a student
 */
const isStudent = (req, res, next) => {
  if (!req.user || req.user.role !== 'student') {
    return next(new ErrorResponse('Only students can access this route', 403));
  }
  next();
};

/**
 * Check if user has access to their own resource or is an admin
 */
const isOwnerOrAdmin = (req, res, next) => {
  // Check if user is logged in
  if (!req.user) {
    return next(new ErrorResponse('User not authenticated', 401));
  }

  // Get user ID from route parameter
  const userId = req.params.id || req.params.userId;

  // Allow access if admin or if the user is accessing their own resource
  if (req.user.role === 'admin' || (userId && req.user.id === userId)) {
    return next();
  }

  return next(new ErrorResponse('Not authorized to access this resource', 403));
};

module.exports = {
  protect,
  authorize,
  isAdmin,
  isStudent,
  isOwnerOrAdmin
};
