import React from 'react';
import { motion } from 'framer-motion';
import Placeholder from '../components/ui/Placeholder';

const CoursesPage = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Our Courses
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            Browse our comprehensive selection of courses for Gujarati and English medium students across different standards.
          </p>
        </div>

        <Placeholder
          title="Course Catalog Coming Soon"
          message="We're preparing an amazing catalog of courses with detailed information about each class, curriculum, and enrollment options. Please check back soon!"
          icon="loader"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md max-w-5xl mx-auto"
        />
      </motion.div>
    </div>
  );
};

export default CoursesPage;
