import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ownerPhoto from "../assets/images/owner.png";
import {
  ChevronRight,
  Clock,
  BookOpen,
  Users,
  Award,
  Star,
  CheckCircle,
} from "lucide-react";

const HomePage = () => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div
              className="lg:w-1/2 lg:pr-10 mb-10 lg:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Building Strong Foundations for a Brighter Future
              </h1>
              <motion.p
                className="text-xl md:text-2xl mb-6 text-blue-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Unlock your potential through knowledge, focus, and discipline
              </motion.p>
              <p className="text-lg mb-8 text-blue-100 opacity-90">
                Join Trimurti Classes for exceptional tutoring in all subjects
                across Gujarati & English medium
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/admissions"
                  className="px-6 py-3 bg-brand-gold-600 hover:bg-brand-gold-500 text-white font-medium rounded-md shadow-md transition-all transform hover:scale-105"
                >
                  Apply for Admission
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-white hover:bg-gray-100 text-brand-blue-800 font-medium rounded-md shadow-md transition-all transform hover:scale-105"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="lg:w-1/2 flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <div className="relative w-full max-w-md">
                <div className="absolute -top-4 -left-4 w-full h-full rounded-xl border-2 border-blue-300 bg-blue-400 bg-opacity-20"></div>
                <img
                  src="/hero-image.jpg"
                  alt="Students learning at Trimurti Classes"
                  className="w-full h-auto rounded-xl shadow-2xl relative z-10"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/600x400/1e40af/FFFFFF?text=Trimurti+Classes";
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Batch Timings Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Flexible Batch Timings
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose the timing that works best for your schedule. Our classes
              are designed to accommodate your needs.
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Morning Batch Card */}
            <motion.div
              variants={itemVariants}
              className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-100 dark:border-blue-800 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-800 text-brand-blue-800 dark:text-blue-200">
                  <Clock size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Morning Batch
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Start your day with focused learning
                  </p>
                  <p className="text-lg font-medium text-brand-blue-800 dark:text-blue-300">
                    7:00 AM to 11:00 AM
                  </p>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    Perfect for early risers who prefer to study with a fresh
                    mind. Small group sessions with personalized attention.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Afternoon Batch Card */}
            <motion.div
              variants={itemVariants}
              className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-100 dark:border-blue-800 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-800 text-brand-blue-800 dark:text-blue-200">
                  <Clock size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Afternoon Batch
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Intensive after-school learning
                  </p>
                  <p className="text-lg font-medium text-brand-blue-800 dark:text-blue-300">
                    3:00 PM to 8:00 PM
                  </p>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    Ideal for students attending regular school in the morning.
                    Comprehensive coverage of curriculum with practice sessions.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Medium & Subjects Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Coverage
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We provide quality education across multiple standards and mediums
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Gujarati Medium */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-lg"
            >
              <div className="bg-brand-blue-800 text-white px-6 py-4">
                <h3 className="text-xl font-bold">Gujarati Medium</h3>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <BookOpen
                      size={18}
                      className="mr-2 text-brand-blue-700 dark:text-blue-400"
                    />
                    Classes 5th to 10th
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 pl-7">
                    All subjects with special focus on Mathematics
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <BookOpen
                      size={18}
                      className="mr-2 text-brand-blue-700 dark:text-blue-400"
                    />
                    Classes 11th & 12th (Commerce)
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 pl-7">
                    All subjects including Accounts, Economics, and Statistics
                  </p>
                </div>

                <Link
                  to="/courses?medium=gujarati"
                  className="mt-4 inline-flex items-center text-brand-blue-800 dark:text-blue-400 font-medium"
                >
                  View All Courses
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </motion.div>

            {/* English Medium */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-lg"
            >
              <div className="bg-brand-gold-600 text-white px-6 py-4">
                <h3 className="text-xl font-bold">English Medium</h3>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <BookOpen
                      size={18}
                      className="mr-2 text-brand-gold-600 dark:text-yellow-400"
                    />
                    Classes 1st to 8th
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 pl-7">
                    All subjects with personalized attention
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 dark:text-gray-300 pl-7">
                    Our English medium program focuses on building strong
                    foundations across subjects with special emphasis on
                    Mathematics and Science
                  </p>
                </div>

                <Link
                  to="/courses?medium=english"
                  className="mt-4 inline-flex items-center text-brand-gold-600 dark:text-yellow-400 font-medium"
                >
                  View All Courses
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About the Tutor Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="lg:w-2/5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute inset-0 -rotate-6 rounded-2xl bg-brand-blue-200 dark:bg-brand-blue-800/50"></div>
                <img
                  src={ownerPhoto}
                  alt="Shailesh Sutawane - Founder & Principal Educator"
                  className="relative rounded-2xl shadow-lg object-contain w-full max-w-md mx-auto h-[500px]"
                />
              </div>
            </motion.div>

            <motion.div
              className="lg:w-3/5"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Meet Your Mentor
              </h2>
              <h3 className="text-2xl font-semibold text-brand-blue-800 dark:text-blue-400 mb-4">
                Mr. Shailesh Sutawane
              </h3>
              <div className="mb-6 space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  With over 20 years of teaching experience, Mr. Shailesh
                  Sutawane is a dedicated educator committed to bringing out the
                  best in every student.
                </p>
                <p>
                  Specializing in Mathematics, he believes in building strong
                  foundations through conceptual clarity rather than rote
                  learning. His teaching methodology focuses on developing
                  analytical thinking and problem-solving skills.
                </p>
                <p>
                  Mr. Sutawane's students have consistently achieved excellent
                  results in board examinations and competitive tests, a
                  testament to his effective teaching approach.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                  <Award
                    size={18}
                    className="text-brand-blue-800 dark:text-blue-400 mr-2"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    20+ Years Experience
                  </span>
                </div>
                <div className="flex items-center bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                  <Star
                    size={18}
                    className="text-brand-blue-800 dark:text-blue-400 mr-2"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    Mathematics Expert
                  </span>
                </div>
                <div className="flex items-center bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                  <Users
                    size={18}
                    className="text-brand-blue-800 dark:text-blue-400 mr-2"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    500+ Students Guided
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Trimurti Classes
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our approach to education sets us apart
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Feature Card 1 */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 card-hover"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-brand-blue-800 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Small Batch Sizes
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Limited students per batch ensuring personalized attention and
                better learning outcomes for every student.
              </p>
            </motion.div>

            {/* Feature Card 2 */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 card-hover"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-brand-blue-800 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Comprehensive Study Material
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Meticulously prepared notes, practice problems, and
                supplementary materials aligned with the curriculum.
              </p>
            </motion.div>

            {/* Feature Card 3 */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 card-hover"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-brand-blue-800 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Regular Assessment
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Frequent tests and evaluations to track progress and identify
                areas for improvement.
              </p>
            </motion.div>

            {/* Feature Card 4 */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 card-hover"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-brand-blue-800 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Proven Track Record
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Consistently excellent results with many students achieving top
                ranks in their classes and exams.
              </p>
            </motion.div>

            {/* Feature Card 5 */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 card-hover"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-brand-blue-800 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Flexible Schedule
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Morning and afternoon batches to accommodate different student
                schedules and preferences.
              </p>
            </motion.div>

            {/* Feature Card 6 */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 card-hover"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-brand-blue-800 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Parent Involvement
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Regular updates and parent-teacher meetings to keep parents
                informed about their child's progress.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Excel in Your Studies?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto">
              Join Trimurti Classes today and experience the difference quality
              education can make. Enrollment for new batches is now open.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-3 bg-white hover:bg-gray-100 text-brand-blue-800 font-medium rounded-md shadow-md transition-all transform hover:scale-105"
              >
                Enroll Now
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 bg-brand-gold-600 hover:bg-brand-gold-500 text-white font-medium rounded-md shadow-md transition-all transform hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Hear from our students about their experience at Trimurti Classes
          </p>

          <Link
            to="/about#testimonials"
            className="inline-flex items-center text-brand-blue-800 dark:text-blue-400 font-medium"
          >
            View All Testimonials
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
