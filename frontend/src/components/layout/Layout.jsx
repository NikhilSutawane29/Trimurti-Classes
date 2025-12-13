import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, ChevronDown } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Main Layout Component
 *
 * Provides the primary layout structure including:
 * - Responsive header with navigation
 * - Main content area
 * - Footer
 */
const Layout = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountMenuTimeoutRef = React.useRef(null);
  const location = useLocation();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Navigation links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Programs", path: "/programs" },
    { name: "Facilities", path: "/facilities" },
    { name: "Gallery", path: "/gallery" },
    { name: "Success Stories", path: "/success-stories" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          scrolled
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md"
            : "bg-white dark:bg-gray-900"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-brand-blue-800 dark:text-white">
              Trimurti<span className="text-brand-gold-600">Classes</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-brand-blue-800 dark:hover:text-brand-blue-400 ${
                  location.pathname === link.path
                    ? "text-brand-blue-800 dark:text-brand-blue-400"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Admission Call to Action */}
            <div className="flex items-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-transparent border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 h-9 px-4 py-2"
              >
                Contact Us
              </Link>
              <Link
                to="/admissions"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-brand-blue-800 text-white hover:bg-brand-blue-700 h-9 px-4 py-2"
              >
                Apply for Admission
              </Link>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 mr-1"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-700"
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === link.path
                        ? "bg-brand-blue-100 dark:bg-brand-blue-900/30 text-brand-blue-800 dark:text-brand-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="flex flex-col gap-2 pt-2">
                  <Link
                    to="/contact"
                    className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 h-9 px-4 py-2"
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/admissions"
                    className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium bg-brand-blue-800 text-white hover:bg-brand-blue-700 h-9 px-4 py-2"
                  >
                    Apply for Admission
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                Trimurti Classes
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                Building Strong Foundations for a Brighter Future
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Unlock your potential through knowledge and discipline
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-4 text-gray-900 dark:text-white uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-brand-blue-800 dark:hover:text-brand-blue-400"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-4 text-gray-900 dark:text-white uppercase tracking-wider">
                Batch Timings
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>Morning Batch: 7 AM to 11 AM</li>
                <li>Afternoon Batch: 3 PM to 8 PM</li>
                <li>Weekend Special: 8 AM to 12 PM</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-4 text-gray-900 dark:text-white uppercase tracking-wider">
                Contact Us
              </h3>
              <address className="not-italic text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <p>Shailesh Sutawane</p>
                <p>S.F./1 Amrapali Apartment,</p>
                <p>Near Air Force Station,</p>
                <p>Makarpura Road, Vadodara</p>
                <p className="pt-2">
                  <a
                    href="tel:+919909379193"
                    className="hover:text-brand-blue-800 dark:hover:text-brand-blue-400"
                  >
                    +91 99093 79193
                  </a>
                  {" / "}
                  <a
                    href="tel:+919773034036"
                    className="hover:text-brand-blue-800 dark:hover:text-brand-blue-400"
                  >
                    +91 97730 34036
                  </a>
                </p>
                <p className="pt-2">
                  <a
                    href="mailto:shaileshsutawane@gmail.com"
                    className="hover:text-brand-blue-800 dark:hover:text-brand-blue-400"
                  >
                    shaileshsutawane@gmail.com
                  </a>
                </p>
              </address>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Trimurti Classes. All rights
              reserved.
            </p>
            <div className="mt-4 md:mt-0 flex flex-wrap justify-center gap-4 md:gap-6">
              <Link
                to="/admissions"
                className="text-sm text-gray-500 hover:text-brand-blue-800 dark:hover:text-brand-blue-400"
              >
                Admission Process
              </Link>
              <Link
                to="/facilities"
                className="text-sm text-gray-500 hover:text-brand-blue-800 dark:hover:text-brand-blue-400"
              >
                Our Facilities
              </Link>
              <Link
                to="/gallery"
                className="text-sm text-gray-500 hover:text-brand-blue-800 dark:hover:text-brand-blue-400"
              >
                Gallery
              </Link>
              <span className="text-gray-400 hidden md:inline">•</span>
              <Link
                to="/admin/login"
                className="text-sm text-gray-400 hover:text-brand-blue-600 dark:hover:text-brand-blue-400 transition-colors"
                title="Admin Access"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
