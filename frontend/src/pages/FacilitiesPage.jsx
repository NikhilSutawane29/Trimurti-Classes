import React from "react";
import { Link } from "react-router-dom";
import {
  Building,
  BookOpen,
  Cpu,
  Coffee,
  BookMarked,
  Users,
  WifiIcon,
  Clock,
  ArrowRight,
  Lightbulb,
  PenTool,
  RefreshCcw,
} from "lucide-react";

const FacilitiesPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-blue-900 to-brand-blue-700 text-white">
        <div className="container mx-auto px-4 py-20 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              State-of-the-Art Learning Facilities
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Discover the modern amenities and thoughtfully designed spaces
              that make Trimurti Classes the ideal environment for academic
              excellence
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 rounded-md bg-brand-gold-600 hover:bg-brand-gold-700 text-white font-medium transition-colors"
            >
              Schedule a Visit <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Facilities Overview */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Our Learning Environment
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Trimurti Classes provides a conducive learning environment with
              modern facilities designed to enhance the educational experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Classroom */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                <Building
                  size={64}
                  className="text-gray-400 dark:text-gray-500"
                />
                {/* In a real implementation, this would be an actual image */}
                <span className="sr-only">Modern classroom image</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                  <Building
                    size={20}
                    className="mr-2 text-brand-blue-700 dark:text-brand-blue-400"
                  />
                  Modern Classrooms
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Spacious, well-lit classrooms equipped with comfortable
                  seating and excellent acoustics for an optimal learning
                  environment.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-brand-blue-700 dark:text-brand-blue-400 mr-2">
                      •
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      Ergonomic furniture designed for extended study sessions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-blue-700 dark:text-brand-blue-400 mr-2">
                      •
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      Temperature-controlled environment for year-round comfort
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-blue-700 dark:text-brand-blue-400 mr-2">
                      •
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      Excellent visibility of teaching boards from all seats
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Library */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                <BookOpen
                  size={64}
                  className="text-gray-400 dark:text-gray-500"
                />
                {/* In a real implementation, this would be an actual image */}
                <span className="sr-only">Library image</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                  <BookOpen
                    size={20}
                    className="mr-2 text-brand-blue-700 dark:text-brand-blue-400"
                  />
                  Reference Library
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  A well-stocked library with an extensive collection of
                  textbooks, reference materials, and study resources for all
                  subjects.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-brand-blue-700 dark:text-brand-blue-400 mr-2">
                      •
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      Comprehensive collection of mathematics textbooks and
                      guides
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-blue-700 dark:text-brand-blue-400 mr-2">
                      •
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      Previous years' question papers for various examinations
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-blue-700 dark:text-brand-blue-400 mr-2">
                      •
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      Quiet reading area with individual study carrels
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Technology */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                <Cpu size={64} className="text-gray-400 dark:text-gray-500" />
                {/* In a real implementation, this would be an actual image */}
                <span className="sr-only">Technology image</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                  <Cpu
                    size={20}
                    className="mr-2 text-brand-blue-700 dark:text-brand-blue-400"
                  />
                  Technology Integration
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Modern teaching aids and technology to enhance the learning
                  experience and visualize complex mathematical concepts.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-brand-blue-700 dark:text-brand-blue-400 mr-2">
                      •
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      Interactive whiteboards for dynamic teaching
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-blue-700 dark:text-brand-blue-400 mr-2">
                      •
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      Audio-visual equipment for enhanced learning
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-blue-700 dark:text-brand-blue-400 mr-2">
                      •
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      Mathematical modeling software and tools
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Amenities */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Additional Amenities
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We believe in creating a comfortable environment that supports
              student wellbeing and productivity
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-blue-100 dark:bg-brand-blue-900 flex items-center justify-center mb-4">
                <Coffee
                  size={24}
                  className="text-brand-blue-700 dark:text-brand-blue-400"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Refreshment Area
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Dedicated space for breaks with healthy snacks and refreshments
                available for purchase
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-blue-100 dark:bg-brand-blue-900 flex items-center justify-center mb-4">
                <BookMarked
                  size={24}
                  className="text-brand-blue-700 dark:text-brand-blue-400"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Bookstore
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                On-site bookstore offering essential textbooks, stationery, and
                study materials
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-blue-100 dark:bg-brand-blue-900 flex items-center justify-center mb-4">
                <Users
                  size={24}
                  className="text-brand-blue-700 dark:text-brand-blue-400"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Discussion Zones
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Collaborative spaces where students can discuss problems and
                work together on assignments
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-blue-100 dark:bg-brand-blue-900 flex items-center justify-center mb-4">
                <WifiIcon
                  size={24}
                  className="text-brand-blue-700 dark:text-brand-blue-400"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Wi-Fi Campus
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                High-speed internet access throughout the premises for research
                and online resources
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Resources */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Comprehensive Learning Resources
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                At Trimurti Classes, we provide students with all the resources
                they need to excel in their mathematical journey.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 p-2 bg-brand-blue-100 dark:bg-brand-blue-900/50 rounded-full">
                    <Lightbulb
                      size={20}
                      className="text-brand-blue-700 dark:text-brand-blue-400"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Custom Study Materials
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Meticulously crafted notes, worksheets, and problem sets
                      designed by our expert faculty
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-4 p-2 bg-brand-blue-100 dark:bg-brand-blue-900/50 rounded-full">
                    <PenTool
                      size={20}
                      className="text-brand-blue-700 dark:text-brand-blue-400"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Practice Tests and Assessments
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Regular tests modeled after actual examinations to prepare
                      students for the real challenge
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-4 p-2 bg-brand-blue-100 dark:bg-brand-blue-900/50 rounded-full">
                    <RefreshCcw
                      size={20}
                      className="text-brand-blue-700 dark:text-brand-blue-400"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Revision Resources
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Comprehensive revision modules, concept maps, and formula
                      sheets for quick reference
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden shadow-md">
              <div className="h-80 flex items-center justify-center">
                <BookOpen
                  size={80}
                  className="text-gray-400 dark:text-gray-500"
                />
                {/* In a real implementation, this would be an actual image */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Hours */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Facility Hours
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Our facilities are available during the following hours
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center">
                <Clock
                  size={20}
                  className="text-brand-blue-700 dark:text-brand-blue-400 mr-3"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Monday - Friday
                  </h3>
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-medium">
                  7:00 AM - 8:00 PM
                </div>
              </div>

              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center">
                <Clock
                  size={20}
                  className="text-brand-blue-700 dark:text-brand-blue-400 mr-3"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Saturday
                  </h3>
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-medium">
                  8:00 AM - 6:00 PM
                </div>
              </div>

              <div className="p-6 flex items-center">
                <Clock
                  size={20}
                  className="text-brand-blue-700 dark:text-brand-blue-400 mr-3"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Sunday
                  </h3>
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-medium">
                  9:00 AM - 1:00 PM
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
              Note: Library and study areas may have extended hours during
              examination periods
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-brand-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Experience Our Facilities First-Hand
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Schedule a visit to Trimurti Classes and see how our facilities can
            enhance your learning journey
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 bg-brand-gold-600 hover:bg-brand-gold-700 rounded-md font-medium transition-colors"
            >
              Schedule a Tour
            </Link>
            <Link
              to="/admissions"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-md font-medium transition-colors"
            >
              Apply for Admission
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FacilitiesPage;
