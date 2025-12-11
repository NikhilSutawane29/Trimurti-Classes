const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a course title'],
    trim: true,
    maxlength: [100, 'Course title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a course description'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  standard: {
    type: String,
    required: [true, 'Please specify the standard/class'],
    enum: [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
      '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'
    ]
  },
  medium: {
    type: String,
    required: [true, 'Please specify the medium of instruction'],
    enum: ['gujarati', 'english']
  },
  subjects: {
    type: [String],
    required: [true, 'Please specify at least one subject'],
    validate: {
      validator: function(val) {
        return val.length > 0;
      },
      message: 'Please add at least one subject'
    }
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please specify the instructor']
  },
  batchTiming: {
    type: String,
    required: [true, 'Please specify the batch timing'],
    enum: ['morning', 'afternoon', 'custom']
  },
  customBatchTiming: {
    type: String,
    validate: {
      validator: function(val) {
        return this.batchTiming === 'custom' ? val && val.length > 0 : true;
      },
      message: 'Custom batch timing is required when batch timing is set to custom'
    }
  },
  schedule: {
    days: {
      type: [String],
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    startTime: String,
    endTime: String
  },
  duration: {
    type: String,
    required: [true, 'Please specify course duration']
  },
  fee: {
    amount: {
      type: Number,
      required: [true, 'Please specify the course fee']
    },
    period: {
      type: String,
      enum: ['monthly', 'quarterly', 'half-yearly', 'yearly'],
      default: 'monthly'
    }
  },
  enrollmentStatus: {
    type: String,
    enum: ['open', 'closed', 'coming-soon'],
    default: 'open'
  },
  maxStudents: {
    type: Number,
    default: 30
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  banner: {
    type: String,
    default: 'default-course-banner.jpg'
  },
  highlights: [String],
  syllabus: [{
    title: String,
    description: String
  }],
  isPopular: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  materials: [{
    title: String,
    type: String,
    url: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create index for faster searches
CourseSchema.index({ standard: 1, medium: 1, subjects: 1 });

// Middleware to update the updatedAt field
CourseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for getting enrollment count
CourseSchema.virtual('enrollmentCount').get(function() {
  return this.enrolledStudents.length;
});

// Method to check if course is full
CourseSchema.methods.isFull = function() {
  return this.enrolledStudents.length >= this.maxStudents;
};

module.exports = mongoose.model('Course', CourseSchema);
