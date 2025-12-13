const cloudinary = require('cloudinary').v2;

// Cloudinary Configuration
const setupCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });

  console.log('Cloudinary configured successfully');
};

/**
 * Upload an image to Cloudinary
 * @param {string} imagePath - Path to image file or base64 encoded string
 * @param {string} folder - Optional folder name in Cloudinary
 * @returns {Promise} - Cloudinary upload response
 */
const uploadImage = async (imagePath, folder = 'trimurti-classes') => {
  try {
    const options = {
      use_filename: true,
      unique_filename: true,
      overwrite: true,
      folder: folder,
      resource_type: "auto",
      // Optimize images automatically
      quality: "auto:good", // Automatic quality optimization
      fetch_format: "auto", // Automatic format selection (WebP for modern browsers)
      flags: "progressive", // Progressive JPEG loading
      // Limit maximum dimensions to reduce file size
      transformation: [
        { width: 2000, height: 2000, crop: "limit" } // Max 2000px on longest side
      ]
    };

    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Image could not be uploaded');
  }
};

/**
 * Delete an image from Cloudinary
 * @param {string} publicId - Public ID of the image
 * @returns {Promise} - Cloudinary deletion response
 */
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw new Error('Image could not be deleted');
  }
};

module.exports = {
  setupCloudinary,
  uploadImage,
  deleteImage,
  cloudinary
};
