import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, Search, Filter, Plus, Edit, Trash2, Eye,
  ChevronLeft, ChevronRight, Download, Mail, Phone, School
} from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

const AdminStudentsPage = () => {
  const [students, setStudents] = useState([]);
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
    const fetchStudents = async () => {
      try {
        setLoading(true);
        // In a real application, this would be an API call
        // const response = await api.getStudents({ page: currentPage, limit: itemsPerPage });

        // Mock data for demonstration
        setTimeout(() => {
          const mockStudents = [
            {
              id: '1',
              name: 'Raj Patel',
              email: 'raj.patel@example.com',
              phone: '9876543210',
              medium: 'gujarati',
              standard: '9',
              parentName: 'Suresh Patel',
              enrolledCourses: 2,
              joinedDate: '2023-05-15',
              lastActive: '2023-07-05'
            },
            {
              id: '2',
              name: 'Priya Sharma',
              email: 'priya.sharma@example.com',
              phone: '9876543211',
              medium: 'english',
              standard: '7',
              parentName: 'Amit Sharma',
              enrolledCourses: 1,
              joinedDate: '2023-06-10',
              lastActive: '2023-07-01'
            },
            {
              id: '3',
              name: 'Arjun Singh',
              email: 'arjun.singh@example.com',
              phone: '9876543212',
              medium: 'gujarati',
              standard: '11',
              parentName: 'Harpreet Singh',
              enrolledCourses: 3,
              joinedDate: '2023-04-20',
              lastActive: '2023-07-06'
            },
            {
              id: '4',
              name: 'Neha Desai',
              email: 'neha.desai@example.com',
              phone: '9876543213',
              medium: 'english',
              standard: '5',
              parentName: 'Prakash Desai',
              enrolledCourses: 1,
              joinedDate: '2023-06-25',
              lastActive: '2023-06-28'
            },
            {
              id: '5',
              name: 'Kiran Mehta',
              email: 'kiran.mehta@example.com',
              phone: '9876543214',
              medium: 'gujarati',
              standard: '10',
              parentName: 'Jitendra Mehta',
              enrolledCourses: 2,
              joinedDate: '2023-05-05',
              lastActive: '2023-07-03'
            },
            {
              id: '6',
              name: 'Ananya Joshi',
              email: 'ananya.joshi@example.com',
              phone: '9876543215',
              medium: 'gujarati',
              standard: '6',
              parentName: 'Vikram Joshi',
              enrolledCourses: 1,
              joinedDate: '2023-06-15',
              lastActive: '2023-07-04'
            }
          ];

          setStudents(mockStudents);
          setTotalPages(Math.ceil(mockStudents.length / itemsPerPage));
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching students:', error);
        setLoading(false);
        toast.error('Failed to load students. Please try again later.');
      }
    };

    fetchStudents();
  }, [currentPage, toast]);

  const handleDelete = (id) => {
    // In a real app, this would call an API to delete the student
    // For now, we'll just show a toast
    toast.success(`Student with ID ${id} would be deleted in a real app`);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMedium = filterMedium === 'all' || student.medium === filterMedium;
    const matchesStandard = filterStandard === 'all' || student.standard === filterStandard;

    return matchesSearch && matchesMedium && matchesStandard;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Manage Students
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          View, edit, and manage student information
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
              placeholder="Search students..."
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
            to="/admin/students/add"
            className="px-4 py-2 flex items-center gap-2 text-sm font-medium text-white bg-brand-blue-700 rounded-md hover:bg-brand-blue-800"
          >
            <Plus size={16} />
            Add Student
          </Link>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-blue-700 dark:border-brand-blue-400"></div>
          </div>
        ) : filteredStudents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Student
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Medium
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Class
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Courses
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Joined
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-brand-blue-100 dark:bg-brand-blue-900/30 flex items-center justify-center text-brand-blue-700 dark:text-brand-blue-300 font-medium">
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {student.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Parent: {student.parentName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white flex items-center">
                        <Mail className="h-4 w-4 mr-1 text-gray-400" />
                        {student.email}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <Phone className="h-4 w-4 mr-1 text-gray-400" />
                        {student.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white capitalize">{student.medium}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white flex items-center">
                        <School className="h-4 w-4 mr-1 text-gray-400" />
                        {student.standard}th
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {student.enrolledCourses}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(student.joinedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-2">
                        <button
                          onClick={() => toast.info(`View student ${student.id}`)}
                          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          <Eye size={18} />
                        </button>
                        <Link
                          to={`/admin/students/edit/${student.id}`}
                          className="p-1 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(student.id)}
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
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No students found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchTerm || filterMedium !== 'all' || filterStandard !== 'all' ?
                  'Try adjusting your search or filters' :
                  'Get started by adding students to the system'
                }
              </p>
              {!searchTerm && filterMedium === 'all' && filterStandard === 'all' && (
                <Link
                  to="/admin/students/add"
                  className="inline-flex items-center px-4 py-2 bg-brand-blue-700 text-white rounded-md hover:bg-brand-blue-800"
                >
                  <Plus size={18} className="mr-2" />
                  Add Student
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Pagination */}
        {filteredStudents.length > 0 && (
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredStudents.length}</span> of{' '}
              <span className="font-medium">{filteredStudents.length}</span> results
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

export default AdminStudentsPage;
