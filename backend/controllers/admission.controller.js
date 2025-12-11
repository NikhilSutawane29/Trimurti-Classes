const { ErrorResponse } = require("../middleware/errorHandler");
const emailService = require("../utils/emailService");

// Note: You'll need to create an Admission model similar to Contact model
// For now, we'll use Contact model as a placeholder
const Contact = require("../models/contact.model");

/**
 * @desc    Submit an admission inquiry
 * @route   POST /api/admissions
 * @access  Public
 */
exports.submitAdmission = async (req, res, next) => {
  try {
    const { fullName, email, phone, standard, medium, subject, message } =
      req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !standard || !medium) {
      return next(
        new ErrorResponse(
          "Please provide all required fields: fullName, email, phone, standard, and medium",
          400,
        ),
      );
    }

    // Create new admission inquiry
    // Using Contact model for now - you should create a separate Admission model
    const admission = await Contact.create({
      name: fullName,
      email,
      phone,
      subject: subject || "Admission Inquiry",
      message: message || "New admission inquiry submitted",
      regarding: "admission",
      preferredContactMethod: "any",
      interested: {
        medium: medium,
        standard: standard,
      },
    });

    // Send email notification to owner (Shailesh Sutawane)
    emailService
      .sendAdmissionNotification({
        fullName,
        email,
        phone,
        standard,
        medium,
        subject,
        message,
      })
      .then(() => {
        console.log("Admission notification email sent successfully");
      })
      .catch((err) => {
        console.error("Failed to send admission notification email:", err);
        // Don't fail the request if email fails
      });

    // Send confirmation email to the applicant
    emailService
      .sendConfirmationEmail(
        {
          name: fullName,
          email,
        },
        "admission",
      )
      .then(() => {
        console.log("Confirmation email sent to applicant");
      })
      .catch((err) => {
        console.error("Failed to send confirmation email:", err);
        // Don't fail the request if email fails
      });

    res.status(201).json({
      success: true,
      message:
        "Admission inquiry submitted successfully. We will contact you soon!",
      data: {
        id: admission._id,
        fullName,
        email,
        phone,
        standard,
        medium,
      },
    });
  } catch (error) {
    console.error("Admission submission error:", error);
    next(error);
  }
};

/**
 * @desc    Get all admission inquiries
 * @route   GET /api/admissions
 * @access  Private/Admin
 */
exports.getAdmissions = async (req, res, next) => {
  try {
    // Copy req.query
    const reqQuery = { ...req.query };

    // Add filter for admission-related entries only
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
    const limit = parseInt(req.query.limit, 10) || 10;
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
 * @desc    Get single admission inquiry
 * @route   GET /api/admissions/:id
 * @access  Private/Admin
 */
exports.getAdmission = async (req, res, next) => {
  try {
    const admission = await Contact.findById(req.params.id);

    if (!admission) {
      return next(
        new ErrorResponse(
          `Admission inquiry not found with id of ${req.params.id}`,
          404,
        ),
      );
    }

    // Verify it's an admission inquiry
    if (admission.regarding !== "admission") {
      return next(
        new ErrorResponse(`This is not an admission inquiry`, 400),
      );
    }

    // Mark as read if it's new
    if (admission.status === "new") {
      await admission.markAsRead();
    }

    res.status(200).json({
      success: true,
      data: admission,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update admission inquiry status
 * @route   PUT /api/admissions/:id
 * @access  Private/Admin
 */
exports.updateAdmission = async (req, res, next) => {
  try {
    let admission = await Contact.findById(req.params.id);

    if (!admission) {
      return next(
        new ErrorResponse(
          `Admission inquiry not found with id of ${req.params.id}`,
          404,
        ),
      );
    }

    // Update status
    if (req.body.status === "replied") {
      await admission.markAsReplied();
    } else if (req.body.status === "resolved") {
      await admission.markAsResolved();
    } else {
      admission = await Contact.findByIdAndUpdate(
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
      data: admission,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete admission inquiry
 * @route   DELETE /api/admissions/:id
 * @access  Private/Admin
 */
exports.deleteAdmission = async (req, res, next) => {
  try {
    const admission = await Contact.findById(req.params.id);

    if (!admission) {
      return next(
        new ErrorResponse(
          `Admission inquiry not found with id of ${req.params.id}`,
          404,
        ),
      );
    }

    await admission.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get admission statistics
 * @route   GET /api/admissions/stats
 * @access  Private/Admin
 */
exports.getAdmissionStats = async (req, res, next) => {
  try {
    // Get total admission inquiries
    const totalAdmissions = await Contact.countDocuments({
      regarding: "admission",
    });

    // Get status counts for admission inquiries
    const statusCounts = await Contact.aggregate([
      { $match: { regarding: "admission" } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // Get counts by standard
    const standardCounts = await Contact.aggregate([
      { $match: { regarding: "admission" } },
      { $group: { _id: "$interested.standard", count: { $sum: 1 } } },
    ]);

    // Get counts by medium
    const mediumCounts = await Contact.aggregate([
      { $match: { regarding: "admission" } },
      { $group: { _id: "$interested.medium", count: { $sum: 1 } } },
    ]);

    // Get new admission counts for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const dailyCounts = await Contact.aggregate([
      { $match: { regarding: "admission", createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalAdmissions,
        statusCounts,
        standardCounts,
        mediumCounts,
        dailyCounts,
      },
    });
  } catch (error) {
    next(error);
  }
};
