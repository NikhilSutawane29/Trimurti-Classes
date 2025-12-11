import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-12 bg-gray-50 dark:bg-gray-900">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
        >
          <h1 className="text-9xl font-bold text-brand-blue-800 dark:text-brand-blue-600">404</h1>
        </motion.div>

        <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">Page not found</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL or the page has been moved.
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-5 py-3 text-white bg-brand-blue-800 hover:bg-brand-blue-700 rounded-md shadow-md transition-colors"
          >
            <Home size={18} />
            Go to Home
          </Link>
          <Link
            to="/courses"
            className="flex items-center justify-center gap-2 px-5 py-3 text-brand-blue-800 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-md transition-colors"
          >
            <Search size={18} />
            Browse Courses
          </Link>
        </div>

        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center text-brand-blue-700 dark:text-brand-blue-400 hover:underline"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to previous page
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
