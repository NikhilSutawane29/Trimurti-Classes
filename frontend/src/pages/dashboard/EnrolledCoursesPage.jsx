import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Calendar, User, ChevronRight, Filter, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Placeholder from '../../components/ui/Placeholder';

const EnrolledCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMedium, setFilterMedium] = useState('all');

  const { user } = useAuth();

  // Fetch enrolled courses data
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        setLoading(true);
        // In a real app, this would fetch from the API
        // const response = await courseApi.getEnrolledCourses();
        // setCourses(response.data);

        // Mock data for demonstration
        setTimeout(() => {
          setCourses([
            {
              id: '1',
              title: 'Mathematics - Class 9',
              medium: 'gujarati',
              description: 'Comprehensive mathematics course covering algebra, geometry, and trigonometry',
              nextClass: 'Today, 4:00 PM',
              progress: 65,
              instructor: 'Shailesh Sutawane',
              completedTopics: 12,
              totalTopics: 20,
              enrolledDate: '2023-05-15'
            },
            {
              id: '2',
              title: 'Science - Class 9',
              medium: 'gujarati',
              description: 'Complete science course covering physics, chemistry, and biology concepts',
              nextClass: 'Tomorrow, 5:00 PM',
              progress: 42,
              instructor: 'Shailesh Sutawane',
              completedTopics: 8,
              totalTopics: 18,
              enrolledDate: '2023-05-20'
            },
            {
              id: '3',
              title: 'English Grammar - Class 8',
              medium: 'english',
              description: 'English grammar and literature for class 8 students',
              nextClass: 'Wednesday, 3:00 PM',
              progress: 78,
              instructor: 'Shailesh Sutawane',
              completedTopics: 15,
              totalTopics: 22,
              enrolledDate: '2023-06-05'
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load your enrolled courses. Please try again later.');
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  // Filter courses based on search term and medium filter
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMedium = filterMedium === 'all' || course.medium === filterMedium;

    return matchesSearch && matchesMedium;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          My Enrolled Courses
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          View and manage all your current courses
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search your courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
            <select
              value={filterMedium}
              onChange={(e) => setFilterMedium(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 text-gray-900 dark:text-white"
            >
              <option value="all">All Mediums</option>
              <option value="gujarati">Gujarati</option>
              <option value="english">English</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses List */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-blue-700 dark:border-brand-blue-400"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-700 dark:text-red-400">
          {error}
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              <div className="p-5">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                      {course.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 capitalize">
                        {course.medium === 'gujarati' ? 'Gujarati Medium' : 'English Medium'}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                        Enrolled on {new Date(course.enrolledDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/dashboard/courses/${course.id}`}
                    className="mt-2 md:mt-0 inline-flex items-center justify-center px-4 py-2 bg-brand-blue-700 dark:bg-brand-blue-600 text-white text-sm font-medium rounded-md hover:bg-brand-blue-800 dark:hover:bg-brand-blue-700 transition-colors"
                  >
                    Continue Learning
                  </Link>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {course.description}
                </p>

                <div className="mb-4">
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
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {course.completedTopics} of {course.totalTopics} topics completed
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <User size={16} className="mr-1" />
                    Instructor: {course.instructor}
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    Next class: {course.nextClass}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center border border-gray-100 dark:border-gray-700">
          {searchTerm || filterMedium !== 'all' ? (
            <p className="text-gray-700 dark:text-gray-300">No courses match your search criteria. Try adjusting your filters.</p>
          ) : (
            <div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">You haven't enrolled in any courses yet.</p>
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
      )}
    </div>
  );
};

export default EnrolledCoursesPage;
