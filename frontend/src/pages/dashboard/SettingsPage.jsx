import React, { useState, useEffect } from "react";
import {
  User,
  Bell,
  Lock,
  Languages,
  Save,
  Loader,
  X,
  Mail,
  Moon,
  Sun,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useToast } from "../../contexts/ToastContext";

const SettingsPage = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const toast = useToast();

  // Settings state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [settings, setSettings] = useState({
    // Account settings
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",

    // Notification settings
    emailNotifications: true,
    courseUpdates: true,
    newMessages: true,
    assignmentReminders: true,

    // Privacy settings
    showProfile: true,
    shareProgress: false,

    // Preferences
    language: "english",
  });

  useEffect(() => {
    // Populate form with user data when available
    if (user) {
      setSettings((prev) => ({
        ...prev,
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validatePasswordForm = () => {
    if (settings.newPassword !== settings.confirmPassword) {
      toast.error("New passwords don't match");
      return false;
    }

    if (settings.newPassword && settings.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }

    return true;
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (!validatePasswordForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset password fields
      setSettings((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      toast.success("Password updated successfully!");
    } catch (error) {
      toast.error("Failed to update password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNotificationUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Notification preferences updated!");
    } catch (error) {
      toast.error("Failed to update notification settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrivacyUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Privacy settings updated!");
    } catch (error) {
      toast.error("Failed to update privacy settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreferencesUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Preferences updated!");
    } catch (error) {
      toast.error("Failed to update preferences.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-8">
        {/* Account Security */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <Lock
                size={20}
                className="mr-2 text-brand-blue-700 dark:text-brand-blue-400"
              />
              Account Security
            </h2>
          </div>

          <div className="p-6">
            <form onSubmit={handlePasswordUpdate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="flex items-center">
                  <Mail
                    size={16}
                    className="text-gray-500 dark:text-gray-400 mr-2"
                  />
                  <input
                    type="email"
                    name="email"
                    value={settings.email}
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-none rounded-md"
                    disabled={true}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Your email cannot be changed. Contact support for assistance.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="currentPassword"
                      value={settings.currentPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                      placeholder="Enter your current password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      New Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      value={settings.newPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={settings.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || !settings.currentPassword}
                  className="px-4 py-2 bg-brand-blue-700 text-white rounded-md hover:bg-brand-blue-800 transition-colors disabled:opacity-70 flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader size={18} className="mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      Update Password
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <Bell
                size={20}
                className="mr-2 text-brand-blue-700 dark:text-brand-blue-400"
              />
              Notifications
            </h2>
          </div>

          <div className="p-6">
            <form onSubmit={handleNotificationUpdate} className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="emailNotifications"
                      name="emailNotifications"
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={handleChange}
                      className="focus:ring-brand-blue-500 h-4 w-4 text-brand-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label
                      htmlFor="emailNotifications"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Email Notifications
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Receive email notifications for important updates
                    </p>
                  </div>
                </div>
              </div>

              {settings.emailNotifications && (
                <div className="pl-8 space-y-4 border-l-2 border-gray-200 dark:border-gray-700 ml-2">
                  <div className="flex items-center">
                    <input
                      id="courseUpdates"
                      name="courseUpdates"
                      type="checkbox"
                      checked={settings.courseUpdates}
                      onChange={handleChange}
                      className="focus:ring-brand-blue-500 h-4 w-4 text-brand-blue-600 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="courseUpdates"
                      className="ml-3 text-sm text-gray-700 dark:text-gray-300"
                    >
                      Class Schedule Updates
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="newMessages"
                      name="newMessages"
                      type="checkbox"
                      checked={settings.newMessages}
                      onChange={handleChange}
                      className="focus:ring-brand-blue-500 h-4 w-4 text-brand-blue-600 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="newMessages"
                      className="ml-3 text-sm text-gray-700 dark:text-gray-300"
                    >
                      New Messages
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="assignmentReminders"
                      name="assignmentReminders"
                      type="checkbox"
                      checked={settings.assignmentReminders}
                      onChange={handleChange}
                      className="focus:ring-brand-blue-500 h-4 w-4 text-brand-blue-600 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="assignmentReminders"
                      className="ml-3 text-sm text-gray-700 dark:text-gray-300"
                    >
                      Homework & Test Reminders
                    </label>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-brand-blue-700 text-white rounded-md hover:bg-brand-blue-800 transition-colors disabled:opacity-70 flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader size={18} className="mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      Save Preferences
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <User
                size={20}
                className="mr-2 text-brand-blue-700 dark:text-brand-blue-400"
              />
              Privacy
            </h2>
          </div>

          <div className="p-6">
            <form onSubmit={handlePrivacyUpdate} className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="showProfile"
                      name="showProfile"
                      type="checkbox"
                      checked={settings.showProfile}
                      onChange={handleChange}
                      className="focus:ring-brand-blue-500 h-4 w-4 text-brand-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label
                      htmlFor="showProfile"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Include in class directory
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Allow your name to be included in the printed class
                      directory
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="shareProgress"
                      name="shareProgress"
                      type="checkbox"
                      checked={settings.shareProgress}
                      onChange={handleChange}
                      className="focus:ring-brand-blue-500 h-4 w-4 text-brand-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label
                      htmlFor="shareProgress"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Share my academic achievements
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Allow the institution to recognize your achievements in
                      newsletters and notice boards
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-brand-blue-700 text-white rounded-md hover:bg-brand-blue-800 transition-colors disabled:opacity-70 flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader size={18} className="mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      Save Privacy Settings
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <Languages
                size={20}
                className="mr-2 text-brand-blue-700 dark:text-brand-blue-400"
              />
              Preferences
            </h2>
          </div>

          <div className="p-6">
            <form onSubmit={handlePreferencesUpdate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Language
                </label>
                <select
                  name="language"
                  value={settings.language}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                >
                  <option value="english">English</option>
                  <option value="gujarati">Gujarati</option>
                  <option value="hindi">Hindi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Theme
                </label>
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className={`px-4 py-2 rounded-md flex items-center ${
                      theme === "light"
                        ? "bg-brand-blue-100 text-brand-blue-800 border-2 border-brand-blue-500"
                        : "bg-white text-gray-700 border border-gray-300"
                    }`}
                  >
                    <Sun size={18} className="mr-2" />
                    Light
                  </button>
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className={`px-4 py-2 rounded-md flex items-center ${
                      theme === "dark"
                        ? "bg-brand-blue-800 text-white border-2 border-brand-blue-500"
                        : "bg-gray-800 text-white border border-gray-700"
                    }`}
                  >
                    <Moon size={18} className="mr-2" />
                    Dark
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-brand-blue-700 text-white rounded-md hover:bg-brand-blue-800 transition-colors disabled:opacity-70 flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader size={18} className="mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      Save Preferences
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
