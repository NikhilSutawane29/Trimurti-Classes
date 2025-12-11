const User = require("../models/user.model");
const Contact = require("../models/contact.model");
const { ErrorResponse } = require("../middleware/errorHandler");

/**
 * @desc    Admin login
 * @route   POST /api/admin/login
 * @access  Public
 */
exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return next(new ErrorResponse("Please provide email and password", 400));
    }

    // Check if credentials match admin credentials from environment
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return next(new ErrorResponse("Admin credentials not configured", 500));
    }

    if (email !== adminEmail || password !== adminPassword) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Find or create admin user
    let admin = await User.findOne({ email: adminEmail }).select("+password");

    if (!admin) {
      // Create admin user if doesn't exist
      admin = await User.create({
        name: "Shailesh Sutawane",
        email: adminEmail,
        phone: "9909379193",
        password: adminPassword,
        role: "admin",
      });
    }

    // Generate token
    const token = admin.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Admin logout
 * @route   POST /api/admin/logout
 * @access  Private/Admin
 */
exports.adminLogout = async (req, res, next) => {
  try {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000), // 10 seconds
      httpOnly: true
    });

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current admin user
 * @route   GET /api/admin/me
 * @access  Private/Admin
 */
exports.getMe = async (req, res, next) => {
  try {
    const admin = await User.findById(req.user.id).select('-password');

    if (!admin || admin.role !== 'admin') {
      return next(new ErrorResponse('Not authorized as admin', 403));
    }

    res.status(200).json({
      success: true,
      data: admin
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get admin dashboard stats
 * @route   GET /api/admin/dashboard/stats
 * @access  Private/Admin
 */
exports.getDashboardStats = async (req, res, next) => {
  try {
    // Get total contacts
    const totalContacts = await Contact.countDocuments();

    // Get new contacts (status: new)
    const newContacts = await Contact.countDocuments({ status: "new" });

    // Get admission inquiries (regarding: admission)
    const admissionInquiries = await Contact.countDocuments({
      regarding: "admission",
    });

    // Get contacts by status
    const statusCounts = await Contact.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // Get recent contacts (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentContacts = await Contact.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    // Get contacts by regarding type
    const regardingCounts = await Contact.aggregate([
      { $group: { _id: "$regarding", count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalContacts,
        newContacts,
        admissionInquiries,
        recentContacts,
        statusCounts,
        regardingCounts,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all admissions
 * @route   GET /api/admin/admissions
 * @access  Private/Admin
 */
exports.getAdmissions = async (req, res, next) => {
  try {
    // Copy req.query
    const reqQuery = { ...req.query };

    // Filter for admission inquiries only
    reqQuery.regarding = "admission";

    // Fields to exclude from filtering
    const removeFields = ["select", "sort", "page", "limit"];

    // Delete excluded fields from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`,
    );

    // Finding resource
    let query = Contact.find(JSON.parse(queryStr));

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Contact.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Execute query
    const admissions = await query;

    // Pagination result
    const pagination = {
      total,
      limit,
      page,
      pages: Math.ceil(total / limit),
    };

    // Add next and prev if they exist
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: admissions.length,
      pagination,
      data: admissions,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all contacts
 * @route   GET /api/admin/contacts
 * @access  Private/Admin
 */
exports.getContacts = async (req, res, next) => {
  try {
    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude from filtering
    const removeFields = ["select", "sort", "page", "limit"];

    // Delete excluded fields from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`,
    );

    // Finding resource
    let query = Contact.find(JSON.parse(queryStr));

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Contact.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Execute query
    const contacts = await query;

    // Pagination result
    const pagination = {
      total,
      limit,
      page,
      pages: Math.ceil(total / limit),
    };

    // Add next and prev if they exist
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: contacts.length,
      pagination,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single contact/admission
 * @route   GET /api/admin/contacts/:id
 * @access  Private/Admin
 */
exports.getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return next(
        new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404),
      );
    }

    // Mark as read if it's new
    if (contact.status === "new") {
      await contact.markAsRead();
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update contact/admission status
 * @route   PUT /api/admin/contacts/:id
 * @access  Private/Admin
 */
exports.updateContact = async (req, res, next) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return next(
        new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404),
      );
    }

    // Update status
    if (req.body.status === "replied") {
      await contact.markAsReplied();
    } else if (req.body.status === "resolved") {
      await contact.markAsResolved();
    } else {
      contact = await Contact.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
          notes: req.body.notes,
        },
        {
          new: true,
          runValidators: true,
        },
      );
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete contact/admission
 * @route   DELETE /api/admin/contacts/:id
 * @access  Private/Admin
 */
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return next(
        new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404),
      );
    }

    await contact.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Bulk delete contacts
 * @route   DELETE /api/admin/contacts/bulk
 * @access  Private/Admin
 */
exports.bulkDeleteContacts = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return next(
        new ErrorResponse("Please provide an array of contact IDs", 400),
      );
    }

    const result = await Contact.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      data: {
        deletedCount: result.deletedCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Bulk update contacts
 * @route   PUT /api/admin/contacts/bulk
 * @access  Private/Admin
 */
exports.bulkUpdateContacts = async (req, res, next) => {
  try {
    const { ids, updateData } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return next(
        new ErrorResponse("Please provide an array of contact IDs", 400),
      );
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      return next(
        new ErrorResponse("Please provide update data", 400),
      );
    }

    const result = await Contact.updateMany(
      { _id: { $in: ids } },
      { $set: updateData }
    );

    res.status(200).json({
      success: true,
      data: {
        modifiedCount: result.modifiedCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Bulk delete admissions
 * @route   DELETE /api/admin/admissions/bulk
 * @access  Private/Admin
 */
exports.bulkDeleteAdmissions = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return next(
        new ErrorResponse("Please provide an array of admission IDs", 400),
      );
    }

    const result = await Admission.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      data: {
        deletedCount: result.deletedCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Bulk delete courses
 * @route   DELETE /api/admin/courses/bulk
 * @access  Private/Admin
 */
exports.bulkDeleteCourses = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return next(
        new ErrorResponse("Please provide an array of course IDs", 400),
      );
    }

    const result = await Course.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      data: {
        deletedCount: result.deletedCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Bulk delete batches
 * @route   DELETE /api/admin/batches/bulk
 * @access  Private/Admin
 */
exports.bulkDeleteBatches = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return next(
        new ErrorResponse("Please provide an array of batch IDs", 400),
      );
    }

    const result = await Batch.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      data: {
        deletedCount: result.deletedCount,
      },
    });
  } catch (error) {
    next(error);
  }
};
