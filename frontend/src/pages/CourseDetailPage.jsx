import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Placeholder from '../components/ui/Placeholder';

const CourseDetailPage = () => {
  // Get course ID from URL parameters
  const { id } = useParams();

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/courses" className="inline-flex items-center text-brand-blue-700 dark:text-brand-blue-400 hover:underline mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Back to all courses
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Course Details
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            Course ID: {id}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-12">
            This page will display detailed information about the selected course including curriculum, schedule, pricing, and enrollment options.
          </p>
        </div>

        <Placeholder
          title="Course Details Coming Soon"
          message="We're working on creating detailed course pages with comprehensive information about each class. Please check back soon or contact us for more information about this course."
          icon="construction"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md max-w-5xl mx-auto"
        />
      </motion.div>
    </div>
  );
};

export default CourseDetailPage;
