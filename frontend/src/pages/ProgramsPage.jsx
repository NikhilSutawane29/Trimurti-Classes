import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Users,
  Award,
  CheckCircle,
  BookOpen,
  ArrowRight,
  Calculator,
  GraduationCap,
  Clock,
} from "lucide-react";

const ProgramsPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-blue-900 to-brand-blue-700 text-white">
        <div className="container mx-auto px-4 py-20 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Academic Excellence Through Personalized Learning
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Discover our specialized mathematics programs designed to build a
              strong foundation and nurture critical thinking skills
            </p>
            <Link
              to="/admissions"
              className="inline-flex items-center px-6 py-3 rounded-md bg-brand-gold-600 hover:bg-brand-gold-700 text-white font-medium transition-colors"
            >
              Apply for Admission <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Our Mathematics Programs
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Trimurti Classes offers comprehensive math programs for students
              of all ages, with a focus on building strong foundations and
              achieving academic excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {/* Primary School Program */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="h-3 bg-green-500"></div>
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                  <Calculator
                    size={24}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Classes 5-7: Core Subjects
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Building strong foundations across Mathematics, English,
                  Social Studies, and Gujarati with engaging teaching methods.
                </p>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle
                      size={18}
                      className="text-green-500 mt-0.5 mr-2 flex-shrink-0"
                    />
                    <span className="text-gray-600 dark:text-gray-300">
                      Mathematics, English, Social Studies & Gujarati
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={18}
                      className="text-green-500 mt-0.5 mr-2 flex-shrink-0"
                    />
                    <span className="text-gray-600 dark:text-gray-300">
                      Conceptual clarity and foundational skills
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={18}
                      className="text-green-500 mt-0.5 mr-2 flex-shrink-0"
                    />
                    <span className="text-gray-600 dark:text-gray-300">
                      Regular worksheets and practice tests
                    </span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock size={16} className="mr-1" />
                      <span>2 sessions per week</span>
                    </div>
                    <Link
                      to="/admissions"
                      className="text-green-600 dark:text-green-400 font-medium text-sm hover:underline flex items-center"
                    >
                      Learn more <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle School Program */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="h-3 bg-blue-500"></div>
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                  <BookOpen
                    size={24}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Classes 8-10: Mathematics & Science
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Comprehensive preparation for Classes 8-10 with focus on
                  Mathematics, Science (Physics, Chemistry, Biology), English,
                  and Social Studies for board exam excellence.
                </p>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle
                      size={18}
                      className="text-blue-500 mt-0.5 mr-2 flex-shrink-0"
                    />
                    <span className="text-gray-600 dark:text-gray-300">
                      Complete Mathematics and Science curriculum
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={18}
                      className="text-blue-500 mt-0.5 mr-2 flex-shrink-0"
                    />
                    <span className="text-gray-600 dark:text-gray-300">
                      English and Social Studies support
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={18}
                      className="text-blue-500 mt-0.5 mr-2 flex-shrink-0"
                    />
                    <span className="text-gray-600 dark:text-gray-300">
                      Board exam focused preparation
                    </span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock size={16} className="mr-1" />
                      <span>3 sessions per week</span>
                    </div>
                    <Link
                      to="/admissions"
                      className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline flex items-center"
                    >
                      Learn more <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* High School Program */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="h-3 bg-purple-500"></div>
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                  <GraduationCap
                    size={24}
                    className="text-purple-600 dark:text-purple-400"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Classes 11-12: Commerce Stream
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Specialized coaching for Commerce students covering Accounts,
                  Economics, Statistics, and Business Studies with intensive
                  board exam preparation and practical approach.
                </p>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle
                      size={18}
                      className="text-purple-500 mt-0.5 mr-2 flex-shrink-0"
                    />
                    <span className="text-gray-600 dark:text-gray-300">
                      Complete Commerce subject coverage
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={18}
                      className="text-purple-500 mt-0.5 mr-2 flex-shrink-0"
                    />
                    <span className="text-gray-600 dark:text-gray-300">
                      Accounts, Economics, Statistics & Business Studies
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={18}
                      className="text-purple-500 mt-0.5 mr-2 flex-shrink-0"
                    />
                    <span className="text-gray-600 dark:text-gray-300">
                      Practical examples and board exam strategies
                    </span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock size={16} className="mr-1" />
                      <span>4-5 sessions per week</span>
                    </div>
                    <Link
                      to="/admissions"
                      className="text-purple-600 dark:text-purple-400 font-medium text-sm hover:underline flex items-center"
                    >
                      Learn more <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Programs */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Specialized Programs
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Beyond our regular curriculum, we offer specialized programs to
              help students excel in specific areas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Subject Mastery Program */}
            <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6 border border-blue-100 dark:border-blue-900">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center mr-4">
                  <Award
                    size={24}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Subject Mastery Program
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Comprehensive coaching for all school subjects -
                    Mathematics, Science, Social Science, English, and Gujarati
                    with focus on concept clarity and board exam preparation.
                  </p>

                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <CheckCircle
                        size={16}
                        className="text-blue-500 mt-0.5 mr-2 flex-shrink-0"
                      />
                      <span className="text-gray-600 dark:text-gray-300">
                        Subject-wise test series and assessments
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={16}
                        className="text-blue-500 mt-0.5 mr-2 flex-shrink-0"
                      />
                      <span className="text-gray-600 dark:text-gray-300">
                        Previous years' board paper practice
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={16}
                        className="text-blue-500 mt-0.5 mr-2 flex-shrink-0"
                      />
                      <span className="text-gray-600 dark:text-gray-300">
                        Weekly doubt-clearing sessions
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Summer Camp */}
            <div className="bg-amber-50 dark:bg-gray-700 rounded-lg p-6 border border-amber-100 dark:border-amber-900">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center mr-4">
                  <Calendar
                    size={24}
                    className="text-amber-600 dark:text-amber-400"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Summer Math Camp
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Intensive summer programs that combine mathematics learning
                    with fun activities, projects, and math games.
                  </p>

                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <CheckCircle
                        size={16}
                        className="text-amber-500 mt-0.5 mr-2 flex-shrink-0"
                      />
                      <span className="text-gray-600 dark:text-gray-300">
                        2-week and 4-week programs available
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={16}
                        className="text-amber-500 mt-0.5 mr-2 flex-shrink-0"
                      />
                      <span className="text-gray-600 dark:text-gray-300">
                        Hands-on mathematical activities and games
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={16}
                        className="text-amber-500 mt-0.5 mr-2 flex-shrink-0"
                      />
                      <span className="text-gray-600 dark:text-gray-300">
                        Group projects and subject quizzes
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              What Makes Our Programs Special
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-blue-100 dark:bg-brand-blue-900 flex items-center justify-center mx-auto mb-4">
                <Users
                  size={32}
                  className="text-brand-blue-600 dark:text-brand-blue-400"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Small Batch Sizes
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Limited students per batch ensuring personalized attention and
                guidance for every student
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-blue-100 dark:bg-brand-blue-900 flex items-center justify-center mx-auto mb-4">
                <BookOpen
                  size={32}
                  className="text-brand-blue-600 dark:text-brand-blue-400"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Comprehensive Study Material
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Carefully crafted worksheets, problem sets, and notes designed
                by experienced educators
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-blue-100 dark:bg-brand-blue-900 flex items-center justify-center mx-auto mb-4">
                <Award
                  size={32}
                  className="text-brand-blue-600 dark:text-brand-blue-400"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Expert Faculty
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Classes conducted by experienced teachers with proven track
                records of student success
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-blue-100 dark:bg-brand-blue-900 flex items-center justify-center mx-auto mb-4">
                <Calendar
                  size={32}
                  className="text-brand-blue-600 dark:text-brand-blue-400"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Regular Assessments
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Periodic tests and evaluations to track progress and identify
                improvement areas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              What Our Students Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-blue-200 dark:bg-brand-blue-800 rounded-full flex items-center justify-center text-brand-blue-800 dark:text-brand-blue-200 font-bold text-lg mr-4">
                  RA
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Rahul Agarwal
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Class 10 Student
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "Trimurti Classes completely transformed my approach to
                mathematics. The teachers made complex concepts simple and
                interesting. I improved from barely passing to scoring 92% in my
                board exams!"
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-blue-200 dark:bg-brand-blue-800 rounded-full flex items-center justify-center text-brand-blue-800 dark:text-brand-blue-200 font-bold text-lg mr-4">
                  NP
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Neha Patel
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Class 12 Student
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "The comprehensive subject teaching at Trimurti Classes helped
                me excel in my board exams. The clear explanations and regular
                practice tests improved my understanding across all subjects."
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-blue-200 dark:bg-brand-blue-800 rounded-full flex items-center justify-center text-brand-blue-800 dark:text-brand-blue-200 font-bold text-lg mr-4">
                  AS
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Arjun Singh
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Parent of Class 7 Student
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "My son used to fear mathematics, but after joining Trimurti
                Classes, he's developed a genuine interest in the subject. The
                teachers are patient and the small batch size ensures individual
                attention."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-brand-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Begin the Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join Trimurti Classes and experience the difference our personalized
            approach to mathematics education can make
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/admissions"
              className="px-6 py-3 bg-brand-gold-600 hover:bg-brand-gold-700 rounded-md font-medium transition-colors"
            >
              Apply for Admission
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-md font-medium transition-colors"
            >
              Schedule a Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramsPage;
