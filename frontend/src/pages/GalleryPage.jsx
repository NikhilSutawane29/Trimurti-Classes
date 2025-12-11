import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Image,
  Users,
  Award,
  GraduationCap,
  Building,
  CalendarDays,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { galleryApi } from "../utils/api";

const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch gallery images on component mount
  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    setLoading(true);
    try {
      const response = await galleryApi.getAll();
      // Transform API data to match existing structure
      const items = response.data.map(img => ({
        id: img._id,
        image: img.url,
        category: img.category,
        title: img.title || getCategoryTitle(img.category)
      }));
      setGalleryItems(items);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryTitle = (category) => {
    const titles = {
      'classrooms': 'Classroom',
      'events': 'Event',
      'field-trips': 'Field Trip'
    };
    return titles[category] || 'Gallery';
  };

  // Filter gallery items
  const filterItems = (category) => {
    setActiveFilter(category);
  };

  // Open lightbox
  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const filteredGallery =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-blue-900 to-brand-blue-700 text-white">
        <div className="container mx-auto px-4 py-20 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Gallery</h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Experience the vibrant learning environment and activities at
              Trimurti Classes through our gallery
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Moments Captured
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Browse through photos from our classes, events, and achievements
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              onClick={() => filterItems("all")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFilter === "all"
                  ? "bg-brand-blue-100 dark:bg-brand-blue-900/40 text-brand-blue-800 dark:text-brand-blue-400"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              All
            </button>
            <button
              onClick={() => filterItems("classrooms")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFilter === "classrooms"
                  ? "bg-brand-blue-100 dark:bg-brand-blue-900/40 text-brand-blue-800 dark:text-brand-blue-400"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Classrooms
            </button>
            <button
              onClick={() => filterItems("events")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFilter === "events"
                  ? "bg-brand-blue-100 dark:bg-brand-blue-900/40 text-brand-blue-800 dark:text-brand-blue-400"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Events
            </button>
            <button
              onClick={() => filterItems("field-trips")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFilter === "field-trips"
                  ? "bg-brand-blue-100 dark:bg-brand-blue-900/40 text-brand-blue-800 dark:text-brand-blue-400"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Field Trips
            </button>
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">Loading gallery...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md cursor-pointer transform transition-transform hover:scale-105"
                  onClick={() => openLightbox(item)}
                >
                  <div className="relative h-48 md:h-56 lg:h-64">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Show icon based on category */}
                    <div className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 p-1.5 rounded-full">
                      {item.category === "classrooms" && (
                        <Users size={16} className="text-brand-blue-600" />
                      )}
                      {item.category === "events" && (
                        <CalendarDays size={16} className="text-amber-600" />
                      )}
                      {item.category === "field-trips" && (
                        <GraduationCap size={16} className="text-green-600" />
                      )}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                      {item.title}
                    </h3>
                    {item.date && (
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                        {item.date}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredGallery.length === 0 && (
            <div className="text-center py-12">
              <Image size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No images found in this category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-brand-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Become Part of Our Story</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join Trimurti Classes and create your own success story with us
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/admissions"
              className="px-6 py-3 bg-brand-gold-600 hover:bg-brand-gold-700 rounded-md font-medium transition-colors"
            >
              Apply for Admission{" "}
              <ArrowRight className="inline ml-2" size={18} />
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-md font-medium transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white p-2"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            {/* Image container */}
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
              <div className="h-80 md:h-96">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain bg-gray-900"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {selectedImage.description}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                  {selectedImage.date}
                </p>
              </div>
            </div>

            {/* Navigation arrows */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-12 hidden md:block">
              <button
                onClick={() => {
                  const currentIndex = galleryItems.findIndex(
                    (item) => item.id === selectedImage.id,
                  );
                  if (currentIndex > 0) {
                    setSelectedImage(galleryItems[currentIndex - 1]);
                  }
                }}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} className="text-white" />
              </button>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-12 hidden md:block">
              <button
                onClick={() => {
                  const currentIndex = galleryItems.findIndex(
                    (item) => item.id === selectedImage.id,
                  );
                  if (currentIndex < galleryItems.length - 1) {
                    setSelectedImage(galleryItems[currentIndex + 1]);
                  }
                }}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={24} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Gallery items - Images from public/gallery folders
const galleryItems = [
  {
    id: "img1",
    title: "Advanced Math Class Session",
    description:
      "Students engaged in solving complex mathematical problems during an advanced class for 10th grade.",
    date: "September 15, 2023",
    category: "classrooms",
    image: "/gallery/classrooms/classroom-1.jpg",
  },
  {
    id: "img2",
    title: "Interactive Geometry Session",
    description:
      "Middle school students participating in an interactive geometry lesson with hands-on models.",
    date: "September 28, 2023",
    category: "classrooms",
    image: "/gallery/classrooms/classroom-2.jpg",
  },
  {
    id: "img3",
    title: "Summer Math Camp Activity",
    description:
      "Students engaged in a group problem-solving activity during our Summer Mathematics Camp.",
    date: "May 25, 2023",
    category: "classrooms",
    image: "/gallery/classrooms/classroom-3.jpg",
  },
  {
    id: "img4",
    title: "Teacher's Day Celebration",
    description:
      "Students and teachers celebrating Teacher's Day with performances and heartfelt gratitude.",
    date: "September 5, 2023",
    category: "events",
    image: "/gallery/events/teachers-day-1.jpg",
  },
  {
    id: "img5",
    title: "Teacher's Day Cultural Program",
    description:
      "Students presenting cultural programs to honor their beloved teachers.",
    date: "September 5, 2023",
    category: "events",
    image: "/gallery/events/teachers-day-2.jpg",
  },
  {
    id: "img6",
    title: "Unit Test Preparation",
    description:
      "Students preparing and appearing for their unit tests with full concentration.",
    date: "October 15, 2023",
    category: "events",
    image: "/gallery/events/unit-test-1.jpg",
  },
  {
    id: "img7",
    title: "Unit Test Session",
    description:
      "Organized unit test session ensuring fair and transparent examination process.",
    date: "October 16, 2023",
    category: "events",
    image: "/gallery/events/unit-test-2.jpg",
  },
  {
    id: "img8",
    title: "Science Center Field Trip",
    description:
      "Students exploring mathematical and scientific concepts at the local Science Center during an educational field trip.",
    date: "October 12, 2023",
    category: "field-trips",
    image: "/gallery/field-trips/field-trip-1.jpg",
  },
  {
    id: "img9",
    title: "Educational Visit to Observatory",
    description:
      "Students learning about mathematical applications in astronomy during a visit to the local observatory.",
    date: "November 8, 2023",
    category: "field-trips",
    image: "/gallery/field-trips/field-trip-2.jpg",
  },
  {
    id: "img10",
    title: "Historical Monument Visit",
    description:
      "Students exploring historical monuments to learn about architecture and our cultural heritage.",
    date: "December 3, 2023",
    category: "field-trips",
    image: "/gallery/field-trips/field-trip-3.jpg",
  },
];

export default GalleryPage;
