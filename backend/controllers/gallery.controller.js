const Gallery = require('../models/gallery.model');
const { ErrorResponse } = require('../middleware/errorHandler');
const { deleteImage } = require('../config/cloudinary');

/**
 * @desc    Get all gallery images
 * @route   GET /api/gallery
 * @access  Public
 */
exports.getGalleryImages = async (req, res, next) => {
  try {
    const { category } = req.query;
    
    const filter = { isActive: true };
    if (category) {
      filter.category = category;
    }

    const images = await Gallery.find(filter)
      .sort({ createdAt: -1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count: images.length,
      data: images
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get gallery images by category
 * @route   GET /api/gallery/:category
 * @access  Public
 */
exports.getGalleryByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;

    const images = await Gallery.find({ 
      category, 
      isActive: true 
    })
      .sort({ createdAt: -1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count: images.length,
      data: images
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add images to gallery
 * @route   POST /api/gallery
 * @access  Private (Admin)
 */
exports.addGalleryImages = async (req, res, next) => {
  try {
    const { images, category } = req.body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return next(new ErrorResponse('Please provide images to upload', 400));
    }

    if (!category) {
      return next(new ErrorResponse('Please provide a category', 400));
    }

    // Create gallery entries
    const galleryImages = images.map(img => ({
      url: img.url,
      publicId: img.public_id,
      category: category,
      uploadedBy: req.user._id
    }));

    const savedImages = await Gallery.insertMany(galleryImages);

    res.status(201).json({
      success: true,
      count: savedImages.length,
      data: savedImages
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete gallery image
 * @route   DELETE /api/gallery/:id
 * @access  Private (Admin)
 */
exports.deleteGalleryImage = async (req, res, next) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return next(new ErrorResponse('Image not found', 404));
    }

    // Delete from Cloudinary
    await deleteImage(image.publicId);

    // Delete from database
    await image.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update gallery image
 * @route   PUT /api/gallery/:id
 * @access  Private (Admin)
 */
exports.updateGalleryImage = async (req, res, next) => {
  try {
    const { title, description, isActive } = req.body;

    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return next(new ErrorResponse('Image not found', 404));
    }

    // Update fields
    if (title !== undefined) image.title = title;
    if (description !== undefined) image.description = description;
    if (isActive !== undefined) image.isActive = isActive;

    await image.save();

    res.status(200).json({
      success: true,
      data: image
    });
  } catch (error) {
    next(error);
  }
};
