import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, Search, Filter, Plus, Edit, Trash2, Eye,
  ChevronLeft, ChevronRight, MoreHorizontal, Download
} from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

const AdminCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMedium, setFilterMedium] = useState('all');
  const [filterStandard, setFilterStandard] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const toast = useToast();

  // Items per page
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // In a real application, this would be an API call
        // const response = await api.getCourses({ page: currentPage, limit: itemsPerPage });

        // Mock data for demonstration
        setTimeout(() => {
          const mockCourses = [
            {
              id: '1',
              title: 'Mathematics - Class 9',
              medium: 'gujarati',
              standard: '9',
              enrollmentStatus: 'open',
              instructor: 'Shailesh Sutawane',
              enrolledStudents: 25,
              maxStudents: 30,
              createdAt: '2023-06-10',
              isPopular: true
            },
            {
              id: '2',
              title: 'Science - Class 9',
              medium: 'gujarati',
              standard: '9',
              enrollmentStatus: 'open',
              instructor: 'Shailesh Sutawane',
              enrolledStudents: 22,
              maxStudents: 30,
              createdAt: '2023-06-12',
              isPopular: false
            },
            {
              id: '3',
              title: 'Mathematics - Class 10',
              medium: 'gujarati',
              standard: '10',
              enrollmentStatus: 'open',
              instructor: 'Shailesh Sutawane',
              enrolledStudents: 28,
              maxStudents: 30,
              createdAt: '2023-06-05',
              isPopular: true
            },
            {
              id: '4',
              title: 'English Grammar - Class 5',
              medium: 'english',
              standard: '5',
              enrollmentStatus: 'open',
              instructor: 'Shailesh Sutawane',
              enrolledStudents: 15,
              maxStudents: 25,
              createdAt: '2023-06-20',
              isPopular: false
            },
            {
              id: '5',
              title: 'English Grammar - Class 6',
              medium: 'english',
              standard: '6',
              enrollmentStatus: 'open',
              instructor: 'Shailesh Sutawane',
              enrolledStudents: 18,
              maxStudents: 25,
              createdAt: '2023-06-18',
              isPopular: false
            },
            {
              id: '6',
              title: 'Commerce - Class 11',
              medium: 'gujarati',
              standard: '11',
              enrollmentStatus: 'coming-soon',
              instructor: 'Shailesh Sutawane',
              enrolledStudents: 0,
              maxStudents: 25,
              createdAt: '2023-07-01',
              isPopular: false
            }
          ];

          setCourses(mockCourses);
          setTotalPages(Math.ceil(mockCourses.length / itemsPerPage));
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
        toast.error('Failed to load courses. Please try again later.');
      }
    };

    fetchCourses();
  }, [currentPage, toast]);

  const handleDelete = (id) => {
    // In a real app, this would call an API to delete the course
    // For now, we'll just show a toast
    toast.success(`Course with ID ${id} would be deleted in a real app`);
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMedium = filterMedium === 'all' || course.medium === filterMedium;
    const matchesStandard = filterStandard === 'all' || course.standard === filterStandard;

    return matchesSearch && matchesMedium && matchesStandard;
  });

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'closed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'coming-soon':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Manage Courses
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          View, edit, and manage all courses offered by Trimurti Classes
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full md:w-64 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
              <select
                value={filterMedium}
                onChange={(e) => setFilterMedium(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
              >
                <option value="all">All Mediums</option>
                <option value="gujarati">Gujarati</option>
                <option value="english">English</option>
              </select>
            </div>

            <select
              value={filterStandard}
              onChange={(e) => setFilterStandard(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
            >
              <option value="all">All Standards</option>
              <option value="5">5th</option>
              <option value="6">6th</option>
              <option value="7">7th</option>
              <option value="8">8th</option>
              <option value="9">9th</option>
              <option value="10">10th</option>
              <option value="11">11th</option>
              <option value="12">12th</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => toast.info('Export functionality would be implemented in the real app')}
            className="px-4 py-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Download size={16} />
            Export
          </button>

          <Link
            to="/admin/courses/add"
            className="px-4 py-2 flex items-center gap-2 text-sm font-medium text-white bg-brand-blue-700 rounded-md hover:bg-brand-blue-800"
          >
            <Plus size={16} />
            Add Course
          </Link>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-blue-700 dark:border-brand-blue-400"></div>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Course
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Medium
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Standard
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Students
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Created
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <BookOpen className={`h-8 w-8 p-1 rounded-md ${course.isPopular ? 'text-brand-gold-600 bg-brand-gold-100 dark:bg-brand-gold-900/20' : 'text-brand-blue-600 bg-brand-blue-100 dark:bg-brand-blue-900/20'}`} />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {course.title}
                          </div>
                          {course.isPopular && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-brand-gold-100 text-brand-gold-800 dark:bg-brand-gold-900/20 dark:text-brand-gold-300">
                              Popular
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white capitalize">{course.medium}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{course.standard}th</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(course.enrollmentStatus)}`}>
                        {course.enrollmentStatus.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {course.enrolledStudents}/{course.maxStudents}
                      </div>
                      <div className="w-20 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
                        <div
                          className="h-1.5 bg-brand-blue-600 dark:bg-brand-blue-500 rounded-full"
                          style={{ width: `${(course.enrolledStudents / course.maxStudents) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(course.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-2">
                        <button
                          onClick={() => toast.info(`View course ${course.id}`)}
                          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          <Eye size={18} />
                        </button>
                        <Link
                          to={`/admin/courses/edit/${course.id}`}
                          className="p-1 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No courses found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchTerm || filterMedium !== 'all' || filterStandard !== 'all' ?
                  'Try adjusting your search or filters' :
                  'Get started by creating your first course'
                }
              </p>
              {!searchTerm && filterMedium === 'all' && filterStandard === 'all' && (
                <Link
                  to="/admin/courses/add"
                  className="inline-flex items-center px-4 py-2 bg-brand-blue-700 text-white rounded-md hover:bg-brand-blue-800"
                >
                  <Plus size={18} className="mr-2" />
                  Add Course
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Pagination */}
        {filteredCourses.length > 0 && (
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredCourses.length}</span> of{' '}
              <span className="font-medium">{filteredCourses.length}</span> results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCoursesPage;
