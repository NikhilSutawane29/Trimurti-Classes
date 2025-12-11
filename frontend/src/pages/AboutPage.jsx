import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, Star, Users, Clock, Heart } from 'lucide-react';
import Placeholder from '../components/ui/Placeholder';

const AboutPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About Trimurti Classes
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Excellence in education since 2005, dedicated to nurturing young minds and building strong foundations in mathematics and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-brand-blue-100 dark:bg-brand-blue-800 rounded-full mr-4">
                  <Star className="w-6 h-6 text-brand-blue-800 dark:text-blue-300" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                To provide exceptional educational guidance that empowers students to excel academically and develop a lifelong love for learning, especially in mathematics.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-brand-blue-100 dark:bg-brand-blue-800 rounded-full mr-4">
                  <Heart className="w-6 h-6 text-brand-blue-800 dark:text-blue-300" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Vision</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                To be recognized as the premier educational institution that transforms students into confident, knowledgeable individuals ready to take on future challenges.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Our Story
            </h2>

            <Placeholder
              title="Our Journey"
              message="The complete history of Trimurti Classes, from our humble beginnings to becoming a trusted name in education, will be shared here."
              icon="construction"
              className="bg-white dark:bg-gray-700"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 text-center"
            >
              <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-brand-blue-800 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Excellence</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We strive for the highest standards in education and student achievement.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 text-center"
            >
              <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-brand-blue-800 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Personalized Attention</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Every student receives individualized support tailored to their learning needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 text-center"
            >
              <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-brand-blue-800 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Integrity</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We uphold honesty, ethics, and accountability in all our educational practices.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800" id="gallery">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Gallery
          </h2>

          <Placeholder
            title="Photo Gallery Coming Soon"
            message="A collection of photos showcasing our classrooms, students, events, and achievements will be displayed here."
            icon="loader"
            className="bg-white dark:bg-gray-700"
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16" id="testimonials">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Student Testimonials
          </h2>

          <Placeholder
            title="Student Success Stories"
            message="Read what our students and parents have to say about their experience with Trimurti Classes."
            icon="loader"
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          />
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
            <h2 className="text-3xl font-bold mb-6">Join the Trimurti Family</h2>
            <p className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto">
              Take the first step towards academic excellence. Contact us today to learn more about our programs and enrollment process.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="px-8 py-3 bg-white hover:bg-gray-100 text-brand-blue-800 font-medium rounded-md shadow-md transition-all transform hover:scale-105"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
