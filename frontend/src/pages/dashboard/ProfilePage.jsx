import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Home,
  Book,
  Pencil,
  Check,
  X,
  Upload,
  Loader,
  Save,
  CheckCircle,
  School,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import { useRef } from "react";

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const toast = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    standard: "",
    medium: "",
    parentName: "",
    parentPhone: "",
  });

  useEffect(() => {
    // Populate form with user data when available
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        standard: user.standard || "",
        medium: user.medium || "",
        parentName: user.parentName || "",
        parentPhone: user.parentPhone || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, this would call the API
      // await updateProfile(profileData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would upload the photo to a server here
      if (profilePhoto) {
        console.log("Uploading photo:", profilePhoto.name);
        // The actual photo upload would happen here
      }

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelEdit = () => {
    // Reset form data to current user data
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        standard: user.standard || "",
        medium: user.medium || "",
        parentName: user.parentName || "",
        parentPhone: user.parentPhone || "",
      });
    }
    setProfilePhoto(null);
    setPhotoPreview(null);
    setIsEditing(false);
  };

  // Handle file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle photo change when file is selected
  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Only accept images
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file.");
        return;
      }

      // Update state with selected file
      setProfilePhoto(file);

      // Create preview URL for the image
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          My Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          View and manage your personal information
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-brand-blue-800 to-brand-blue-600 p-6 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center text-brand-blue-800 text-4xl font-bold overflow-hidden">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : user?.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user?.name?.charAt(0) || "U"
                )}
              </div>
              {isEditing && (
                <div className="absolute bottom-0 right-0">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-md"
                    title="Upload new photo"
                  >
                    <Upload
                      size={16}
                      className="text-brand-blue-800 dark:text-brand-blue-400"
                    />
                  </button>
                </div>
              )}
            </div>

            {/* User Info Summary */}
            <div>
              <h2 className="text-2xl font-bold">
                {user?.name || "User Name"}
              </h2>
              <p className="text-blue-100">Student</p>
              <div className="flex items-center mt-2">
                <Mail size={16} className="mr-2" />
                <span>{user?.email || "email@example.com"}</span>
              </div>
            </div>

            {/* Edit Button */}
            {!isEditing && (
              <div className="md:ml-auto">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-white text-brand-blue-800 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Pencil size={16} />
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information Section */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <User
                    size={18}
                    className="mr-2 text-brand-blue-700 dark:text-brand-blue-400"
                  />
                  Personal Information
                </h3>
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                    disabled={isSubmitting}
                  />
                ) : (
                  <p className="text-gray-800 dark:text-gray-200">
                    {profileData.name || "Not provided"}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                    disabled={true} // Email can't be changed
                  />
                ) : (
                  <p className="text-gray-800 dark:text-gray-200">
                    {profileData.email || "Not provided"}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                    disabled={isSubmitting}
                  />
                ) : (
                  <p className="text-gray-800 dark:text-gray-200">
                    {profileData.phone || "Not provided"}
                  </p>
                )}
              </div>

              {/* Address Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Address
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                    disabled={isSubmitting}
                  />
                ) : (
                  <p className="text-gray-800 dark:text-gray-200">
                    {profileData.address || "Not provided"}
                  </p>
                )}
              </div>

              {/* Academic Information Section */}
              <div className="md:col-span-2 mt-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <Book
                    size={18}
                    className="mr-2 text-brand-blue-700 dark:text-brand-blue-400"
                  />
                  Academic Information
                </h3>
              </div>

              {/* Standard/Class Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Standard/Class
                </label>
                {isEditing ? (
                  <select
                    name="standard"
                    value={profileData.standard}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                    disabled={isSubmitting}
                  >
                    <option value="">Select Standard</option>
                    <option value="1">1st</option>
                    <option value="2">2nd</option>
                    <option value="3">3rd</option>
                    <option value="4">4th</option>
                    <option value="5">5th</option>
                    <option value="6">6th</option>
                    <option value="7">7th</option>
                    <option value="8">8th</option>
                    <option value="9">9th</option>
                    <option value="10">10th</option>
                    <option value="11">11th</option>
                    <option value="12">12th</option>
                  </select>
                ) : (
                  <p className="text-gray-800 dark:text-gray-200">
                    {profileData.standard
                      ? `${profileData.standard}${
                          ["1", "2", "3"].includes(profileData.standard)
                            ? ["1"].includes(profileData.standard)
                              ? "st"
                              : ["2"].includes(profileData.standard)
                                ? "nd"
                                : "rd"
                            : "th"
                        }`
                      : "Not provided"}
                  </p>
                )}
              </div>

              {/* Medium Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Medium
                </label>
                {isEditing ? (
                  <select
                    name="medium"
                    value={profileData.medium}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                    disabled={isSubmitting}
                  >
                    <option value="">Select Medium</option>
                    <option value="gujarati">Gujarati</option>
                    <option value="english">English</option>
                  </select>
                ) : (
                  <p className="text-gray-800 dark:text-gray-200 capitalize">
                    {profileData.medium || "Not provided"}
                  </p>
                )}
              </div>

              {/* Parent Information Section */}
              <div className="md:col-span-2 mt-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <School
                    size={18}
                    className="mr-2 text-brand-blue-700 dark:text-brand-blue-400"
                  />
                  Parent/Guardian Information
                </h3>
              </div>

              {/* Parent Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Parent/Guardian Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="parentName"
                    value={profileData.parentName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                    disabled={isSubmitting}
                  />
                ) : (
                  <p className="text-gray-800 dark:text-gray-200">
                    {profileData.parentName || "Not provided"}
                  </p>
                )}
              </div>

              {/* Parent Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Parent/Guardian Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="parentPhone"
                    value={profileData.parentPhone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                    disabled={isSubmitting}
                  />
                ) : (
                  <p className="text-gray-800 dark:text-gray-200">
                    {profileData.parentPhone || "Not provided"}
                  </p>
                )}
              </div>
            </div>

            {/* Form Actions */}
            {isEditing && (
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={cancelEdit}
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="flex items-center">
                    <X size={18} className="mr-2" />
                    Cancel
                  </span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-brand-blue-700 text-white rounded-md hover:bg-brand-blue-800 transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <Loader size={18} className="mr-2 animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Save size={18} className="mr-2" />
                      Save Changes
                    </span>
                  )}
                </button>
              </div>
            )}
          </form>

          {/* Account Status Section */}
          <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Account Status
            </h3>
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
              <CheckCircle size={20} />
              <span className="font-medium">Active</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Your account is in good standing. Contact support if you have any
              issues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
