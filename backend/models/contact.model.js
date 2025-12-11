const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      'Please provide a valid email'
    ],
    trim: true
  },
  phone: {
    type: String,
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number'],
    required: [true, 'Please provide your phone number']
  },
  subject: {
    type: String,
    trim: true,
    maxlength: [100, 'Subject cannot be more than 100 characters'],
    default: 'General Inquiry'
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
    trim: true,
    maxlength: [1000, 'Message cannot be more than 1000 characters']
  },
  regarding: {
    type: String,
    enum: ['admission', 'fee', 'schedule', 'course', 'other'],
    default: 'other'
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'resolved', 'spam'],
    default: 'new'
  },
  preferredContactMethod: {
    type: String,
    enum: ['email', 'phone', 'any'],
    default: 'any'
  },
  interested: {
    medium: {
      type: String,
      enum: ['gujarati', 'english', 'any', ''],
      default: ''
    },
    standard: {
      type: String,
      default: ''
    }
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  },
  responseDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for efficient querying
ContactSchema.index({ status: 1, createdAt: -1 });

// Mark contact as read
ContactSchema.methods.markAsRead = async function() {
  if (this.status === 'new') {
    this.status = 'read';
    await this.save();
  }
  return this;
};

// Mark contact as replied
ContactSchema.methods.markAsReplied = async function() {
  this.status = 'replied';
  this.responseDate = Date.now();
  await this.save();
  return this;
};

// Mark contact as resolved
ContactSchema.methods.markAsResolved = async function() {
  this.status = 'resolved';
  if (!this.responseDate) {
    this.responseDate = Date.now();
  }
  await this.save();
  return this;
};

module.exports = mongoose.model('Contact', ContactSchema);
