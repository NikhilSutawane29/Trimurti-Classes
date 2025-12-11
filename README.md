# 🏫 Trimurti Classes - Full Stack MERN Project

A complete production-ready website for Trimurti Classes, a tuition class business offering comprehensive education in Mathematics, Science, Commerce, English, Social Studies, and Gujarati for students from Classes 5-12 in both Gujarati & English medium.

![Trimurti Classes](https://example.com/project-preview.png)

## 🌟 Project Overview

**Business Name:** Trimurti Classes  
**Owner:** Shailesh Sutawane  
**Contact:** 9909379193 / 9773034036  
**Address:** S.F./1 Amrapali Apartment, Near Air Force Station, Makarpura Road, Vadodara  
**Main Tagline:** "Building Strong Foundations for a Brighter Future"  
**Motivational Tagline:** "Unlock your potential through knowledge, focus, and discipline"

## 🚀 Features

- Responsive design for all device sizes
- Dark/light theme support
- User authentication and authorization (JWT)
- Role-based access control (Admin, Student, Guest)
- Course listing and filtering
- Student enrollment system
- Admin dashboard for managing courses, students, and content
- Contact form with inquiry management
- Cloudinary integration for image uploads
- Mobile-friendly navigation

## 🔧 Tech Stack

### Frontend
- React.js + Vite
- Tailwind CSS
- Framer Motion (animations)
- Context API for state management
- React Router DOM v6
- React Hook Form + Zod for validation
- Axios for API requests
- Lucide React for icons

### Backend
- Node.js
- Express.js
- MongoDB Atlas (Cloud Database)
- JWT Authentication
- bcrypt for password hashing
- Mongoose ODM
- Cloudinary for image hosting
- Helmet.js for security

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas connection string)
- Git

## 🛠️ Installation & Setup

### Clone the repository

```bash
git clone https://github.com/yourusername/trimurti-classes.git
cd trimurti-classes
```

### Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create .env file based on .env.example
cp .env.example .env
# Edit .env with your environment variables

# Start the development server
npm run dev
```

### Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🌐 Environment Variables

### Backend (.env)

```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/trimurti-classes
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
```

## 📁 Project Structure

```
trimurti-classes/
├── backend/               # Backend server
│   ├── config/            # Configuration files
│   ├── controllers/       # Request controllers
│   ├── middleware/        # Express middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── .env.example       # Example environment variables
│   └── server.js          # Entry point
│
├── frontend/              # Frontend React application
│   ├── public/            # Public assets
│   ├── src/
│   │   ├── assets/        # Images, fonts, etc.
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # Entry point
│   ├── index.html         # HTML template
│   └── vite.config.js     # Vite configuration
│
└── README.md              # Project documentation
```

## 🚀 Running the Application

### Development Mode

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a separate terminal, start the frontend:
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

### Production Build

1. Create a production build for the frontend:
```bash
cd frontend
npm run build
```

2. Set NODE_ENV=production in your backend .env file
```bash
cd backend
npm start
```

## 👨‍💻 User Roles & Access

### Guest (Unauthenticated)
- View home page, about page, courses listing
- Contact form access
- User registration

### Student
- All guest features
- Personal dashboard
- Course enrollment
- View enrolled courses and progress

### Admin
- All student features
- Admin dashboard
- Manage courses (CRUD)
- Manage students
- View and respond to contact inquiries
- Upload images and course materials

## 📝 API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - User login
- GET /api/auth/me - Get current user
- GET /api/auth/logout - User logout

### Courses
- GET /api/courses - Get all courses
- GET /api/courses/:id - Get a specific course
- POST /api/courses - Create a new course (Admin)
- PUT /api/courses/:id - Update a course (Admin)
- DELETE /api/courses/:id - Delete a course (Admin)
- POST /api/courses/:id/enroll - Enroll in a course

### Users
- GET /api/users - Get all users (Admin)
- GET /api/users/:id - Get a specific user (Admin or Self)
- PUT /api/users/:id - Update a user (Admin or Self)
- DELETE /api/users/:id - Delete a user (Admin)

### Contact
- POST /api/contact - Submit contact form
- GET /api/contact - Get all contacts (Admin)

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Vite](https://vitejs.dev/)
- [Cloudinary](https://cloudinary.com/)
- [Framer Motion](https://www.framer.com/motion/)

## 📧 Contact

For any inquiries about this project, please contact [shaileshsutawane@gmail.com](mailto:shaileshsutawane@gmail.com)

---

Made with ❤️ by [Your Name](https://github.com/yourusername)