import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle session expiration
    if (error.response && error.response.status === 401) {
      // Clear auth data if token expired
      if (!window.location.pathname.includes('/login')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login?session=expired';
      }
    }

    // Handle server errors
    if (error.response && error.response.status >= 500) {
      console.error('Server Error:', error.response.data);
    }

    return Promise.reject(error);
  }
);

// API wrapper functions
const apiService = {
  /**
   * Perform a GET request
   * @param {string} url - API endpoint
   * @param {object} params - Query parameters
   * @returns {Promise} - API response
   */
  get: async (url, params = {}) => {
    try {
      const response = await api.get(url, { params });
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  /**
   * Perform a POST request
   * @param {string} url - API endpoint
   * @param {object} data - Request payload
   * @returns {Promise} - API response
   */
  post: async (url, data = {}) => {
    try {
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  /**
   * Perform a PUT request
   * @param {string} url - API endpoint
   * @param {object} data - Request payload
   * @returns {Promise} - API response
   */
  put: async (url, data = {}) => {
    try {
      const response = await api.put(url, data);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  /**
   * Perform a DELETE request
   * @param {string} url - API endpoint
   * @returns {Promise} - API response
   */
  delete: async (url) => {
    try {
      const response = await api.delete(url);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  /**
   * Upload a file or multiple files
   * @param {string} url - API endpoint
   * @param {FormData} formData - FormData with file(s)
   * @param {Function} onProgress - Progress callback (optional)
   * @returns {Promise} - API response
   */
  upload: async (url, formData, onProgress = null) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      if (onProgress) {
        config.onUploadProgress = (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        };
      }

      const response = await api.post(url, formData, config);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },
};

// Auth-specific API methods
export const authApi = {
  /**
   * Register a new user
   * @param {object} userData - User registration data
   * @returns {Promise} - API response
   */
  register: (userData) => apiService.post('/auth/register', userData),

  /**
   * Login a user
   * @param {object} credentials - Login credentials
   * @returns {Promise} - API response
   */
  login: (credentials) => apiService.post('/auth/login', credentials),

  /**
   * Admin login
   * @param {object} credentials - Admin login credentials
   * @returns {Promise} - API response
   */
  adminLogin: (credentials) => apiService.post('/admin/login', credentials),

  /**
   * Logout the current user
   * @returns {Promise} - API response
   */
  logout: () => apiService.get('/auth/logout'),

  /**
   * Get the current user's profile
   * @returns {Promise} - API response
   */
  getCurrentUser: () => apiService.get('/auth/me'),

  /**
   * Update the current user's profile
   * @param {object} userData - Updated user data
   * @returns {Promise} - API response
   */
  updateProfile: (userData) => apiService.put('/auth/updatedetails', userData),

  /**
   * Change the current user's password
   * @param {object} passwordData - Password change data
   * @returns {Promise} - API response
   */
  changePassword: (passwordData) =>
    apiService.put('/auth/updatepassword', passwordData),

  /**
   * Request a password reset
   * @param {object} emailData - User email
   * @returns {Promise} - API response
   */
  forgotPassword: (emailData) =>
    apiService.post('/auth/forgotpassword', emailData),

  /**
   * Reset password with token
   * @param {string} token - Reset token
   * @param {object} passwordData - New password
   * @returns {Promise} - API response
   */
  resetPassword: (token, passwordData) =>
    apiService.put(`/auth/resetpassword/${token}`, passwordData),
};

// Course-specific API methods
export const courseApi = {
  /**
   * Get all courses with optional filters
   * @param {object} params - Query parameters/filters
   * @returns {Promise} - API response
   */
  getCourses: (params = {}) => apiService.get('/courses', params),

  /**
   * Get a single course by ID
   * @param {string} courseId - Course ID
   * @returns {Promise} - API response
   */
  getCourse: (courseId) => apiService.get(`/courses/${courseId}`),

  /**
   * Get popular courses
   * @returns {Promise} - API response
   */
  getPopularCourses: () => apiService.get('/courses/popular'),

  /**
   * Get courses by standard and medium
   * @param {string} standard - Standard/class
   * @param {string} medium - Medium (gujarati/english)
   * @returns {Promise} - API response
   */
  getCoursesByStandardAndMedium: (standard, medium) =>
    apiService.get(`/courses/filter/${standard}/${medium}`),

  /**
   * Create a new course (admin only)
   * @param {object} courseData - Course data
   * @returns {Promise} - API response
   */
  createCourse: (courseData) => apiService.post('/courses', courseData),

  /**
   * Update a course (admin only)
   * @param {string} courseId - Course ID
   * @param {object} courseData - Updated course data
   * @returns {Promise} - API response
   */
  updateCourse: (courseId, courseData) =>
    apiService.put(`/courses/${courseId}`, courseData),

  /**
   * Delete a course (admin only)
   * @param {string} courseId - Course ID
   * @returns {Promise} - API response
   */
  deleteCourse: (courseId) => apiService.delete(`/courses/${courseId}`),

  /**
   * Enroll in a course
   * @param {string} courseId - Course ID
   * @returns {Promise} - API response
   */
  enrollCourse: (courseId) => apiService.post(`/courses/${courseId}/enroll`),

  /**
   * Unenroll from a course
   * @param {string} courseId - Course ID
   * @returns {Promise} - API response
   */
  unenrollCourse: (courseId) => apiService.delete(`/courses/${courseId}/enroll`),
};

// Contact-specific API methods
export const contactApi = {
  /**
   * Submit a contact form
   * @param {object} contactData - Contact form data
   * @returns {Promise} - API response
   */
  submitContact: (contactData) => apiService.post('/contact', contactData),

  /**
   * Get all contact submissions (admin only)
   * @param {object} params - Query parameters
   * @returns {Promise} - API response
   */
  getContacts: (params = {}) => apiService.get('/contact', params),

  /**
   * Get a single contact by ID (admin only)
   * @param {string} contactId - Contact ID
   * @returns {Promise} - API response
   */
  getContact: (contactId) => apiService.get(`/contact/${contactId}`),

  /**
   * Update a contact status (admin only)
   * @param {string} contactId - Contact ID
   * @param {object} contactData - Updated contact data
   * @returns {Promise} - API response
   */
  updateContact: (contactId, contactData) =>
    apiService.put(`/contact/${contactId}`, contactData),

  /**
   * Delete a contact (admin only)
   * @param {string} contactId - Contact ID
   * @returns {Promise} - API response
   */
  deleteContact: (contactId) => apiService.delete(`/contact/${contactId}`),

  /**
   * Get contact statistics (admin only)
   * @returns {Promise} - API response
   */
  getContactStats: () => apiService.get('/contact/stats'),
};

// User-specific API methods (admin)
export const userApi = {
  /**
   * Get all users (admin only)
   * @param {object} params - Query parameters
   * @returns {Promise} - API response
   */
  getUsers: (params = {}) => apiService.get('/users', params),

  /**
   * Get a single user by ID (admin or self)
   * @param {string} userId - User ID
   * @returns {Promise} - API response
   */
  getUser: (userId) => apiService.get(`/users/${userId}`),

  /**
   * Create a new user (admin only)
   * @param {object} userData - User data
   * @returns {Promise} - API response
   */
  createUser: (userData) => apiService.post('/users', userData),

  /**
   * Update a user (admin or self)
   * @param {string} userId - User ID
   * @param {object} userData - Updated user data
   * @returns {Promise} - API response
   */
  updateUser: (userId, userData) =>
    apiService.put(`/users/${userId}`, userData),

  /**
   * Delete a user (admin only)
   * @param {string} userId - User ID
   * @returns {Promise} - API response
   */
  deleteUser: (userId) => apiService.delete(`/users/${userId}`),

  /**
   * Get students by standard and medium (admin only)
   * @param {string} standard - Standard/class
   * @param {string} medium - Medium (gujarati/english)
   * @returns {Promise} - API response
   */
  getStudentsByStandardAndMedium: (standard, medium) =>
    apiService.get(`/users/students/${standard}/${medium}`),

  /**
   * Get user statistics (admin only)
   * @returns {Promise} - API response
   */
  getUserStats: () => apiService.get('/users/stats'),
};

// Admin-specific API methods
export const adminApi = {
  /**
   * Admin login
   * @param {object} credentials - Admin login credentials
   * @returns {Promise} - API response
   */
  login: (credentials) => apiService.post('/admin/login', credentials),

  /**
   * Admin logout
   * @returns {Promise} - API response
   */
  logout: () => apiService.post('/admin/logout'),

  /**
   * Get current admin user
   * @returns {Promise} - API response
   */
  getMe: () => apiService.get('/admin/me'),

  /**
   * Get dashboard statistics
   * @returns {Promise} - API response
   */
  getDashboardStats: () => apiService.get('/admin/dashboard/stats'),

  /**
   * Get all admission inquiries
   * @param {object} params - Query parameters
   * @returns {Promise} - API response
   */
  getAdmissions: (params = {}) => apiService.get('/admissions', params),

  /**
   * Delete an admission inquiry
   * @param {string} admissionId - Admission ID
   * @returns {Promise} - API response
   */
  deleteAdmission: (admissionId) => apiService.delete(`/admissions/${admissionId}`),

  /**
   * Get all contacts
   * @param {object} params - Query parameters
   * @returns {Promise} - API response
   */
  getContacts: (params = {}) => apiService.get('/contact', params),

  /**
   * Get a single contact
   * @param {string} contactId - Contact ID
   * @returns {Promise} - API response
   */
  getContact: (contactId) => apiService.get(`/contact/${contactId}`),

  /**
   * Update contact status
   * @param {string} contactId - Contact ID
   * @param {object} data - Update data
   * @returns {Promise} - API response
   */
  updateContact: (contactId, data) => apiService.put(`/contact/${contactId}`, data),

  /**
   * Delete a contact
   * @param {string} contactId - Contact ID
   * @returns {Promise} - API response
   */
  deleteContact: (contactId) => apiService.delete(`/contact/${contactId}`),
};

// Upload-specific API methods
export const uploadApi = {
  /**
   * Upload a single image
   * @param {FormData} formData - Form data with image
   * @param {Function} onProgress - Progress callback (optional)
   * @returns {Promise} - API response
   */
  uploadImage: (formData, onProgress) =>
    apiService.upload('/upload/image', formData, onProgress),

  /**
   * Upload multiple images
   * @param {FormData} formData - Form data with images
   * @param {Function} onProgress - Progress callback (optional)
   * @returns {Promise} - API response
   */
  uploadMultiple: (formData, onProgress) =>
    apiService.upload('/upload/multiple', formData, onProgress),

  /**
   * Upload a base64 image
   * @param {object} imageData - Image data in base64 format
   * @returns {Promise} - API response
   */
  uploadBase64: (imageData) => apiService.post('/upload/base64', imageData),

  /**
   * Delete an image by public ID
   * @param {string} publicId - Cloudinary public ID
   * @returns {Promise} - API response
   */
  deleteImage: (publicId) => apiService.delete(`/upload/${publicId}`),

  /**
   * Get upload configuration
   * @returns {Promise} - API response
   */
  getUploadConfig: () => apiService.get('/upload/config'),
};

/**
 * Gallery API endpoints
 */
export const galleryApi = {
  /**
   * Get all gallery images
   * @param {string} category - Optional category filter
   * @returns {Promise} - API response
   */
  getAll: (category) => apiService.get('/gallery', category ? { category } : {}),

  /**
   * Get gallery images by category
   * @param {string} category - Category name
   * @returns {Promise} - API response
   */
  getByCategory: (category) => apiService.get(`/gallery/${category}`),

  /**
   * Add images to gallery
   * @param {object} data - { images: [...], category: 'classrooms' }
   * @returns {Promise} - API response
   */
  addImages: (data) => apiService.post('/gallery', data),

  /**
   * Update gallery image
   * @param {string} id - Image ID
   * @param {object} data - Update data
   * @returns {Promise} - API response
   */
  update: (id, data) => apiService.put(`/gallery/${id}`, data),

  /**
   * Delete gallery image
   * @param {string} id - Image ID
   * @returns {Promise} - API response
   */
  delete: (id) => apiService.delete(`/gallery/${id}`),
};

// Error handling helper
const handleError = (error) => {
  let errorMessage = 'Something went wrong. Please try again.';

  if (error.response) {
    // Server responded with error
    const { data } = error.response;
    if (data && data.error && data.error.message) {
      errorMessage = data.error.message;
    } else if (data && data.message) {
      errorMessage = data.message;
    }
  } else if (error.request) {
    // Request made but no response received
    errorMessage = 'No response from server. Please check your connection.';
  } else {
    // Something else happened
    errorMessage = error.message || errorMessage;
  }

  return {
    message: errorMessage,
    originalError: error,
  };
};

export default apiService;
