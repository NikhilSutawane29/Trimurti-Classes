import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import { uploadApi, galleryApi } from '../../utils/api';

const AdminGalleryPage = () => {
  const [selectedFolder, setSelectedFolder] = useState('classrooms');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState({
    classrooms: [],
    events: [],
    'field-trips': []
  });

  const folders = [
    { id: 'classrooms', label: 'Classrooms', color: 'bg-blue-500' },
    { id: 'events', label: 'Events', color: 'bg-green-500' },
    { id: 'field-trips', label: 'Field Trips', color: 'bg-purple-500' }
  ];

  // Fetch gallery images on component mount and when folder changes
  useEffect(() => {
    fetchGalleryImages();
  }, [selectedFolder]);

  const fetchGalleryImages = async () => {
    setLoading(true);
    try {
      const response = await galleryApi.getByCategory(selectedFolder);
      setImages(prev => ({
        ...prev,
        [selectedFolder]: response.data || []
      }));
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    
    files.forEach((file) => {
      formData.append('images', file);
    });
    formData.append('folder', selectedFolder);

    try {
      // Upload images to Cloudinary
      const uploadResponse = await uploadApi.uploadMultiple(formData);
      console.log('Upload response:', uploadResponse);
      
      // Save to database
      const galleryData = {
        images: uploadResponse.data,
        category: selectedFolder
      };
      
      await galleryApi.addImages(galleryData);
      
      // Refresh gallery images
      await fetchGalleryImages();
      
      alert('Images uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (imageId) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      await galleryApi.delete(imageId);
      
      // Refresh gallery images
      await fetchGalleryImages();
      
      alert('Image deleted successfully!');
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete image');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <Link
                to="/admin"
                className="flex items-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white shrink-0"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back</span>
              </Link>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white truncate">
                  Gallery Manager
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                  Upload and manage gallery images
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Folder Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setSelectedFolder(folder.id)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors ${
                selectedFolder === folder.id
                  ? `${folder.color} text-white`
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {folder.label}
            </button>
          ))}
        </div>

        {/* Upload Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Upload to {folders.find(f => f.id === selectedFolder)?.label}
          </h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <label className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors text-sm sm:text-base">
              <Upload size={18} className="sm:w-5 sm:h-5" />
              {uploading ? 'Uploading...' : 'Choose Images'}
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Select multiple images to upload
            </span>
          </div>
        </div>

        {/* Images Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Current Images
          </h2>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">Loading...</p>
            </div>
          ) : images[selectedFolder].length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                No images uploaded yet
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {images[selectedFolder].map((image) => (
                <div key={image._id} className="relative group">
                  <img
                    src={image.url}
                    alt={image.title || `Gallery image`}
                    className="w-full h-40 sm:h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleDelete(image._id)}
                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminGalleryPage;
