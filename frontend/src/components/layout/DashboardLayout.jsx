import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronRight,
  Home,
  BookOpen,
  Users,
  Mail,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  ChevronDown,
  BarChart,
  FileText,
  Calendar,
  HelpCircle,
  Bell,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Dashboard Layout Component
 *
 * Provides the layout structure for authenticated user dashboards including:
 * - Sidebar navigation
 * - Header with user profile
 * - Main content area
 */
const DashboardLayout = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAdmin, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close sidebar on location change for mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Handle logout
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Admin navigation links
  const adminNavLinks = [
    { name: "Dashboard", path: "/admin", icon: BarChart },
    { name: "Courses", path: "/admin/courses", icon: BookOpen },
    { name: "Students", path: "/admin/students", icon: Users },
    { name: "Contacts", path: "/admin/contacts", icon: Mail },
  ];

  // Student navigation links
  const studentNavLinks = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "My Courses", path: "/dashboard/courses", icon: BookOpen },
    { name: "Profile", path: "/dashboard/profile", icon: User },
  ];

  // Determine which links to use based on user role
  const navLinks = isAdmin() ? adminNavLinks : studentNavLinks;

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-lg transform lg:translate-x-0 transition-transform ease-in-out duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:inset-0`}
        initial={false}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl text-brand-blue-800 dark:text-white">
                Trimurti<span className="text-brand-gold-600">Classes</span>
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X size={20} />
            </button>
          </div>

          {/* Sidebar navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`flex items-center px-4 py-2.5 text-sm rounded-md transition-colors ${
                      location.pathname === link.path
                        ? "bg-brand-blue-50 dark:bg-brand-blue-900/30 text-brand-blue-800 dark:text-brand-blue-400 font-medium"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {<link.icon size={18} className="mr-3 flex-shrink-0" />}
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="mt-6 mb-4 border-t border-gray-200 dark:border-gray-700"></div>

            {/* Help and settings */}
            <ul className="space-y-1 px-2">
              <li>
                <Link
                  to="/"
                  className="flex items-center px-4 py-2.5 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <ExternalLink size={18} className="mr-3 flex-shrink-0" />
                  <span>View Website</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/help"
                  className={`flex items-center px-4 py-2.5 text-sm rounded-md transition-colors ${
                    location.pathname === "/dashboard/help"
                      ? "bg-brand-blue-50 dark:bg-brand-blue-900/30 text-brand-blue-800 dark:text-brand-blue-400 font-medium"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <HelpCircle size={18} className="mr-3 flex-shrink-0" />
                  <span>Help Center</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/settings"
                  className={`flex items-center px-4 py-2.5 text-sm rounded-md transition-colors ${
                    location.pathname === "/dashboard/settings"
                      ? "bg-brand-blue-50 dark:bg-brand-blue-900/30 text-brand-blue-800 dark:text-brand-blue-400 font-medium"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <Settings size={18} className="mr-3 flex-shrink-0" />
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-brand-blue-200 dark:bg-brand-blue-800 flex items-center justify-center">
                  <span className="text-brand-blue-800 dark:text-brand-blue-200 font-semibold">
                    {user?.name?.charAt(0) || "U"}
                  </span>
                </div>
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-auto flex-shrink-0 p-1 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Left section */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-500 dark:text-gray-400 lg:hidden"
              >
                <Menu size={24} />
              </button>
              <h1 className="ml-4 lg:ml-0 text-xl font-semibold text-gray-800 dark:text-white">
                {isAdmin() ? "Admin Dashboard" : "Student Dashboard"}
              </h1>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white focus:outline-none"
                >
                  <div className="h-8 w-8 rounded-full bg-brand-blue-200 dark:bg-brand-blue-800 flex items-center justify-center">
                    <span className="text-brand-blue-800 dark:text-brand-blue-200 font-semibold">
                      {user?.name?.charAt(0) || "U"}
                    </span>
                  </div>
                  <span className="hidden md:inline-block">
                    {user?.name?.split(" ")[0] || "User"}
                  </span>
                  <ChevronDown size={16} />
                </button>

                {/* Profile dropdown menu */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                    <Link
                      to={isAdmin() ? "/admin/profile" : "/dashboard/profile"}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/dashboard/settings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setProfileOpen(false)}
                    >
                      Settings
                    </Link>
                    <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main content wrapper */}
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
