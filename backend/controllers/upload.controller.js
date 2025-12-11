const { uploadImage, deleteImage } = require('../config/cloudinary');
const { ErrorResponse } = require('../middleware/errorHandler');
const fs = require('fs');
const path = require('path');
const util = require('util');
const unlinkAsync = util.promisify(fs.unlink);

/**
 * @desc    Upload image to Cloudinary
 * @route   POST /api/upload/image
 * @access  Private (Admin)
 */
exports.uploadImageToCloudinary = async (req, res, next) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return next(new ErrorResponse('Please upload an image file', 400));
    }

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024;
    if (req.file.size > maxSize) {
      // Clean up the file that was too large
      await unlinkAsync(req.file.path);
      return next(new ErrorResponse('Image size should be less than 10MB', 400));
    }

    // Upload to cloudinary
    let folder = 'trimurti-classes';

    // Set folder based on purpose
    if (req.body.purpose) {
      if (req.body.purpose === 'avatar') {
        folder = 'trimurti-classes/avatars';
      } else if (req.body.purpose === 'course') {
        folder = 'trimurti-classes/courses';
      } else if (req.body.purpose === 'gallery') {
        folder = 'trimurti-classes/gallery';
      }
    }

    // Upload the image
    const result = await uploadImage(req.file.path, folder);

    // Remove file from server after upload
    await unlinkAsync(req.file.path);

    res.status(200).json({
      success: true,
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height
      }
    });
  } catch (error) {
    // Clean up file on error if it exists
    if (req.file) {
      await unlinkAsync(req.file.path).catch(err => console.error('Error deleting file:', err));
    }
    next(error);
  }
};

/**
 * @desc    Upload image from base64 data to Cloudinary
 * @route   POST /api/upload/base64
 * @access  Private (Admin)
 */
exports.uploadBase64Image = async (req, res, next) => {
  try {
    const { image, folder = 'trimurti-classes' } = req.body;

    if (!image) {
      return next(new ErrorResponse('Please provide an image', 400));
    }

    // Validate base64 data
    if (!image.startsWith('data:image')) {
      return next(new ErrorResponse('Invalid image format', 400));
    }

    // Upload the image
    const result = await uploadImage(image, folder);

    res.status(200).json({
      success: true,
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete image from Cloudinary
 * @route   DELETE /api/upload/:publicId
 * @access  Private (Admin)
 */
exports.deleteImageFromCloudinary = async (req, res, next) => {
  try {
    const { publicId } = req.params;

    if (!publicId) {
      return next(new ErrorResponse('Please provide a public ID', 400));
    }

    // Delete the image
    const result = await deleteImage(publicId);

    if (result.result !== 'ok') {
      return next(new ErrorResponse('Failed to delete image', 400));
    }

    res.status(200).json({
      success: true,
      data: {
        message: 'Image deleted successfully'
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Upload multiple images to Cloudinary
 * @route   POST /api/upload/multiple
 * @access  Private (Admin)
 */
exports.uploadMultipleImages = async (req, res, next) => {
  try {
    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return next(new ErrorResponse('Please upload at least one image file', 400));
    }

    const uploadPromises = req.files.map(async (file) => {
      // Check file size (10MB limit)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        // Clean up the file that was too large
        await unlinkAsync(file.path);
        throw new Error(`File ${file.originalname} exceeds 10MB size limit`);
      }

      // Determine folder
      let folder = 'trimurti-classes';
      if (req.body.purpose) {
        if (req.body.purpose === 'gallery') {
          folder = 'trimurti-classes/gallery';
        } else if (req.body.purpose === 'courses') {
          folder = 'trimurti-classes/courses';
        }
      }

      // Upload the image
      const result = await uploadImage(file.path, folder);

      // Remove file from server after upload
      await unlinkAsync(file.path);

      return {
        originalName: file.originalname,
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height
      };
    });

    // Wait for all uploads to complete
    const results = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    // Clean up any remaining files
    if (req.files) {
      for (const file of req.files) {
        try {
          if (fs.existsSync(file.path)) {
            await unlinkAsync(file.path);
          }
        } catch (err) {
          console.error('Error deleting file:', err);
        }
      }
    }
    next(error);
  }
};

/**
 * @desc    Get upload configuration information
 * @route   GET /api/upload/config
 * @access  Private (Admin)
 */
exports.getUploadConfig = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        maxFileSize: '10MB',
        allowedFormats: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
        uploadFolders: {
          avatars: 'trimurti-classes/avatars',
          courses: 'trimurti-classes/courses',
          gallery: 'trimurti-classes/gallery',
          general: 'trimurti-classes'
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
