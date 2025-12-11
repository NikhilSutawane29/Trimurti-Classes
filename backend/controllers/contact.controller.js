const Contact = require("../models/contact.model");
const { ErrorResponse } = require("../middleware/errorHandler");
const emailService = require("../utils/emailService");

/**
 * @desc    Submit a contact form
 * @route   POST /api/contact
 * @access  Public
 */
exports.submitContact = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
      regarding,
      preferredContactMethod,
    } = req.body;

    // Create new contact submission
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      regarding: regarding || "other",
      preferredContactMethod: preferredContactMethod || "any",
      interested: {
        medium: req.body.interested?.medium || "",
        standard: req.body.interested?.standard || "",
      },
    });

    // Send email notifications (don't wait for it to complete)
    emailService
      .sendContactNotification({
        name,
        email,
        phone,
        subject,
        message,
        regarding: regarding || "other",
      })
      .catch((err) => {
        console.error("Failed to send contact notification email:", err);
        // Don't fail the request if email fails
      });

    // Send confirmation email to user
    emailService
      .sendConfirmationEmail(
        {
          name,
          email,
        },
        "contact",
      )
      .catch((err) => {
        console.error("Failed to send confirmation email:", err);
        // Don't fail the request if email fails
      });

    res.status(201).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all contact submissions
 * @route   GET /api/contact
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
    const limit = parseInt(req.query.limit, 10) || 10;
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
 * @desc    Get single contact submission
 * @route   GET /api/contact/:id
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
 * @desc    Update contact status
 * @route   PUT /api/contact/:id
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
 * @desc    Delete contact
 * @route   DELETE /api/contact/:id
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
 * @desc    Get contact statistics
 * @route   GET /api/contact/stats
 * @access  Private/Admin
 */
exports.getContactStats = async (req, res, next) => {
  try {
    // Get total counts by status
    const statusCounts = await Contact.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // Get counts by regarding
    const regardingCounts = await Contact.aggregate([
      { $group: { _id: "$regarding", count: { $sum: 1 } } },
    ]);

    // Get new contact counts for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const dailyCounts = await Contact.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
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
        statusCounts,
        regardingCounts,
        dailyCounts,
      },
    });
  } catch (error) {
    next(error);
  }
};
