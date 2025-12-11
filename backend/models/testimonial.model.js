const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, 'Please provide the student name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  avatar: {
    type: String,
    default: 'default-avatar.jpg'
  },
  content: {
    type: String,
    required: [true, 'Please provide testimonial content'],
    trim: true,
    minlength: [10, 'Testimonial must be at least 10 characters'],
    maxlength: [500, 'Testimonial cannot be more than 500 characters']
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  standard: {
    type: String,
    required: [true, 'Please specify the standard/class']
  },
  medium: {
    type: String,
    enum: ['gujarati', 'english'],
    required: [true, 'Please specify the medium of instruction']
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  approvedAt: {
    type: Date
  }
});

// Index for efficient querying
TestimonialSchema.index({ status: 1, featured: 1 });

// Method to approve testimonial
TestimonialSchema.methods.approve = async function() {
  this.status = 'approved';
  this.approvedAt = Date.now();
  await this.save();
  return this;
};

// Method to reject testimonial
TestimonialSchema.methods.reject = async function() {
  this.status = 'rejected';
  await this.save();
  return this;
};

// Method to toggle featured status
TestimonialSchema.methods.toggleFeatured = async function() {
  this.featured = !this.featured;
  await this.save();
  return this;
};

module.exports = mongoose.model('Testimonial', TestimonialSchema);
