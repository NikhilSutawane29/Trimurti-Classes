import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, ChevronRight, Bell, Users, Award, BarChart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { courseApi } from '../../utils/api';
import Placeholder from '../../components/ui/Placeholder';

const StudentDashboardPage = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch enrolled courses data
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        setLoading(true);
        // In a real app, this would fetch from the API
        // const response = await courseApi.getEnrolledCourses();
        // setEnrolledCourses(response.data);

        // For demonstration purposes, we'll use mock data
        setTimeout(() => {
          setEnrolledCourses([
            {
              id: '1',
              title: 'Mathematics - Class 9',
              medium: 'gujarati',
              nextClass: 'Today, 4:00 PM',
              progress: 65,
              instructor: 'Shailesh Sutawane',
              completedTopics: 12,
              totalTopics: 20
            },
            {
              id: '2',
              title: 'Science - Class 9',
              medium: 'gujarati',
              nextClass: 'Tomorrow, 5:00 PM',
              progress: 42,
              instructor: 'Shailesh Sutawane',
              completedTopics: 8,
              totalTopics: 18
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load your courses. Please try again later.');
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  // Announcements data (mock)
  const announcements = [
    {
      id: 1,
      title: 'Test Preparation',
      message: 'Prepare for the upcoming mathematics test on Algebra. Sample papers will be shared.',
      date: '2 days ago'
    },
    {
      id: 2,
      title: 'Holiday Notice',
      message: 'Classes will be closed on the 25th for Diwali celebrations.',
      date: '5 days ago'
    }
  ];

  // Stats data (mock)
  const stats = [
    { label: 'Courses Enrolled', value: enrolledCourses.length, icon: BookOpen, color: 'blue' },
    { label: 'Attendance Rate', value: '92%', icon: Users, color: 'green' },
    { label: 'Avg. Performance', value: '76%', icon: BarChart, color: 'purple' },
    { label: 'Assignments Due', value: '3', icon: Clock, color: 'amber' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome, {user?.name?.split(' ')[0] || 'Student'}!
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Here's an overview of your learning progress and upcoming schedule.
        </p>
      </div>

      {/* Stats Overview */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/30 mr-4`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-500 dark:text-${stat.color}-400`} />
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Enrolled Courses */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Your Enrolled Courses
          </h2>
          <Link to="/dashboard/courses" className="text-sm text-brand-blue-700 dark:text-brand-blue-400 hover:underline flex items-center">
            View All <ChevronRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-blue-700 dark:border-brand-blue-400"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-700 dark:text-red-400">
            {error}
          </div>
        ) : enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                      {course.title}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                      {course.medium === 'gujarati' ? 'Gujarati Medium' : 'English Medium'}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Instructor: {course.instructor}
                  </p>

                  <div className="mb-3">
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-gray-700 dark:text-gray-300">Progress</span>
                      <span className="font-medium text-brand-blue-800 dark:text-brand-blue-300">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-brand-blue-700 dark:bg-brand-blue-500 h-2.5 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock size={16} className="mr-1" />
                    Next class: {course.nextClass}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 px-5 py-3 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {course.completedTopics} of {course.totalTopics} topics completed
                    </span>
                    <Link
                      to={`/dashboard/courses/${course.id}`}
                      className="text-sm font-medium text-brand-blue-700 dark:text-brand-blue-400 hover:underline"
                    >
                      Continue
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center border border-gray-100 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 mb-4">You are not enrolled in any courses yet.</p>
            <Link
              to="/courses"
              className="inline-flex items-center px-4 py-2 bg-brand-blue-700 dark:bg-brand-blue-600 text-white rounded-md hover:bg-brand-blue-800 dark:hover:bg-brand-blue-700 transition-colors"
            >
              <BookOpen size={18} className="mr-2" />
              Browse Courses
            </Link>
          </div>
        )}
      </div>

      {/* Schedule and Announcements in 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Schedule Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Upcoming Schedule
            </h2>
            <button className="text-sm text-brand-blue-700 dark:text-brand-blue-400 hover:underline flex items-center">
              View Calendar <ChevronRight size={16} />
            </button>
          </div>

          <Placeholder
            title="Weekly Schedule"
            message="Your weekly class schedule and important dates will appear here. Stay tuned!"
            icon="circle"
            className="bg-white dark:bg-gray-800 h-64"
          />
        </div>

        {/* Announcements Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              Announcements
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-900 dark:text-red-200">
                {announcements.length}
              </span>
            </h2>
            <button className="text-sm text-brand-blue-700 dark:text-brand-blue-400 hover:underline flex items-center">
              View All <ChevronRight size={16} />
            </button>
          </div>

          {announcements.length > 0 ? (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                      <Bell size={18} className="text-brand-blue-700 dark:text-brand-blue-400" />
                    </div>
                    <div className="ml-3 flex-1">
                      <h3 className="text-base font-medium text-gray-800 dark:text-white">
                        {announcement.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {announcement.message}
                      </p>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {announcement.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center border border-gray-100 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300">No announcements at this time.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
