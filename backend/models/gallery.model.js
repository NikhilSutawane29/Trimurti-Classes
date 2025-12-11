const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, 'Image URL is required']
    },
    publicId: {
      type: String,
      required: [true, 'Public ID is required']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['classrooms', 'events', 'field-trips'],
      default: 'classrooms'
    },
    title: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
gallerySchema.index({ category: 1, isActive: 1 });

module.exports = mongoose.model('Gallery', gallerySchema);
