require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

// Import routes (to be created)
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const courseRoutes = require("./routes/course.routes");
const contactRoutes = require("./routes/contact.routes");
const admissionRoutes = require("./routes/admission.routes");
const uploadRoutes = require("./routes/upload.routes");
const adminRoutes = require("./routes/admin.routes");
const galleryRoutes = require("./routes/gallery.routes");

// Import error handler middleware
const { errorHandler } = require("./middleware/errorHandler");

// Import Cloudinary configuration
const { setupCloudinary } = require("./config/cloudinary");

// Create Express app
const app = express();

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    // Exit process with failure
    process.exit(1);
  }
};
connectDB();

// Setup Cloudinary
setupCloudinary();

// Middleware
app.use(helmet()); // Set security-related HTTP headers
app.use(morgan("dev")); // HTTP request logger
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  }),
); // CORS configuration
app.use(express.json({ limit: "10mb" })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Parse URL-encoded bodies

// Set static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/gallery", galleryRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("Trimurti Classes API is running...");
});

// Error handler middleware
app.use(errorHandler);

// Handle unhandled routes
app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: "Resource not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
