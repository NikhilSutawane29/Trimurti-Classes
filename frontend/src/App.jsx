import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

// Layout Components
import Layout from "./components/layout/Layout";

// Protected Route Components
import AdminRoute from "./components/auth/AdminRoute";

// Public Pages
import HomePage from "./pages/HomePage";
import ProgramsPage from "./pages/ProgramsPage";
import FacilitiesPage from "./pages/FacilitiesPage";
import GalleryPage from "./pages/GalleryPage";
import SuccessStoriesPage from "./pages/SuccessStoriesPage";
import AdmissionsPage from "./pages/AdmissionsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";

// Admin Pages
import AdminDashboardPage from "./pages/dashboard/AdminDashboardPage";
import AdminAdmissionsPage from "./pages/dashboard/AdminAdmissionsPage";
import AdminContactsPage from "./pages/dashboard/AdminContactsPage";
import AdminGalleryPage from "./pages/dashboard/AdminGalleryPage";

// Context and Hooks
import { useAuth } from "./contexts/AuthContext";

function App() {
  const location = useLocation();
  const { checkAuth } = useAuth();

  // Check authentication status on app load
  useEffect(() => {
    checkAuth();
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes with Main Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/success-stories" element={<SuccessStoriesPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Admin Login - No Layout */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Admin Routes - Protected */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/admissions" element={<AdminAdmissionsPage />} />
          <Route path="/admin/contacts" element={<AdminContactsPage />} />
          <Route path="/admin/gallery" element={<AdminGalleryPage />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
