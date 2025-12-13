import React from "react";
import { Link } from "react-router-dom";
import {
  Award,
  Star,
  TrendingUp,
  Users,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Building,
  Briefcase,
} from "lucide-react";

const SuccessStoriesPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-blue-900 to-brand-blue-700 text-white">
        <div className="container mx-auto px-4 py-20 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Success Stories
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Discover how students at Trimurti Classes have transformed their
              academic journey and achieved remarkable success
            </p>
          </div>
        </div>
      </section>

      {/* Featured Success Stories */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Featured Alumni
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Meet some of our outstanding students who have excelled in their
              academic and professional pursuits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Success Story 1 */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
              <div className="h-48 bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                {/* In a real implementation, this would be an actual student photo */}
                <div className="w-24 h-24 bg-brand-blue-200 dark:bg-brand-blue-800 rounded-full flex items-center justify-center text-brand-blue-800 dark:text-brand-blue-200 font-bold text-xl">
                  RP
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Rahul Patel
                  </h3>
                  <div className="ml-auto flex">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  </div>
                </div>
                <p className="text-brand-blue-600 dark:text-brand-blue-400 font-medium mb-3">
                  Yanshi School
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "Trimurti Classes helped me build a strong foundation in
                  mathematics that was crucial for my board exams and beyond.
                  The personalized attention and rigorous practice sessions made
                  all the difference."
                </p>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Award className="w-5 h-5 mr-2" />
                    <span>GSEB Board: 85.6%</span>
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mt-2">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    <span>Batch of 2019-2021</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Story 2 */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
              <div className="h-48 bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                {/* In a real implementation, this would be an actual student photo */}
                <div className="w-24 h-24 bg-brand-blue-200 dark:bg-brand-blue-800 rounded-full flex items-center justify-center text-brand-blue-800 dark:text-brand-blue-200 font-bold text-xl">
                  AS
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Ananya Singh
                  </h3>
                  <div className="ml-auto flex">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  </div>
                </div>
                <p className="text-brand-blue-600 dark:text-brand-blue-400 font-medium mb-3">
                  Ambe School
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "The strong mathematical and science foundation I received at
                  Trimurti Classes was invaluable for my academic success. The
                  faculty's guidance and comprehensive teaching helped me
                  achieve my dream of studying geting a Good marks in my class."
                </p>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Award className="w-5 h-5 mr-2" />
                    <span>Gujarat Board: 90.8%</span>
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mt-2">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    <span>Batch of 2020-2022</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Story 3 */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
              <div className="h-48 bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                {/* In a real implementation, this would be an actual student photo */}
                <div className="w-24 h-24 bg-brand-blue-200 dark:bg-brand-blue-800 rounded-full flex items-center justify-center text-brand-blue-800 dark:text-brand-blue-200 font-bold text-xl">
                  VK
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Varun Kumar
                  </h3>
                  <div className="ml-auto flex">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  </div>
                </div>
                <p className="text-brand-blue-600 dark:text-brand-blue-400 font-medium mb-3">
                  Gujarat Board Topper - 90.6% in Mathematics
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "The comprehensive subject coverage and regular practice tests
                  at Trimurti Classes prepared me thoroughly for board exams.
                  The faculty's expertise across all subjects - especially
                  Science and Mathematics - was exceptional."
                </p>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Award className="w-5 h-5 mr-2" />
                    <span>99.8 Percentile in CBSE</span>
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mt-2">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    <span>Batch of 2019-2021</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-brand-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Our Impact in Numbers</h2>
            <p className="text-blue-100">The results speak for themselves</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <p className="text-blue-100">Students Taught Successfully</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">96%</div>
              <p className="text-blue-100">Board Exam Success Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <p className="text-blue-100">School Toppers & 90%+ Scorers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">20+</div>
              <p className="text-blue-100">Years of Excellence</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-blue-100 max-w-3xl mx-auto">
              These achievements reflect our commitment to educational
              excellence and our students' dedication to their academic goals.
            </p>
          </div>
        </div>
      </section>

      {/* Board Toppers */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Board Examination Toppers
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our students consistently achieve top ranks in board examinations
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Year
                  </th>
                  <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Board
                  </th>
                  <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Percentage/CGPA
                  </th>
                  <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Current Pursuit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {boardToppers.map((student, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? "bg-white dark:bg-gray-800"
                        : "bg-gray-50 dark:bg-gray-750"
                    }
                  >
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                      {student.name}
                    </td>
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                      {student.year}
                    </td>
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                      {student.board}
                    </td>
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                      {student.score}
                    </td>
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                      {student.current}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Hear directly from our students about their experience at Trimurti
              Classes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-brand-blue-200 dark:bg-brand-blue-800 rounded-full flex items-center justify-center text-brand-blue-800 dark:text-brand-blue-200 font-bold text-lg mr-4">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.info}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parents' Feedback */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Parents' Feedback
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              What parents are saying about their children's progress at
              Trimurti Classes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {parentFeedbacks.map((feedback, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex"
              >
                <div className="mr-4 flex-shrink-0">
                  <div className="w-12 h-12 bg-brand-gold-200 dark:bg-brand-gold-900 rounded-full flex items-center justify-center text-brand-gold-800 dark:text-brand-gold-300 font-bold text-lg">
                    {feedback.initials}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {feedback.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    "{feedback.quote}"
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {feedback.info}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-brand-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Write Your Success Story With Us
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join Trimurti Classes and take the first step towards academic
            excellence and a bright future
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
    </div>
  );
};

// Sample data for board toppers
const boardToppers = [
  {
    name: "Bhargavi Panchal",
    year: "2023",
    board: "GSEB",
    score: "85.6%",
    current: "NIRMA - Architecture Engineering",
  },
  {
    name: "Priya Patel",
    year: "2023",
    board: "Gujarat Board",
    score: "90.2%",
    current: "MS University",
  },
  {
    name: "Rahul Mehta",
    year: "2022",
    board: "CBSE",
    score: "89.8%",
    current: "Surat - Engineering",
  },
  {
    name: "Neha Singh",
    year: "2022",
    board: "CBSE",
    score: "86.2%",
    current: "Bharuch - Engineering",
  },
  {
    name: "Karan Joshi",
    year: "2021",
    board: "Gujarat Board",
    score: "91.5%",
    current: "Ahmedabad College - BBA",
  },
  {
    name: "Sneha Patel",
    year: "2021",
    board: "GSEB",
    score: "90.0%",
    current: "Surat - BCOM",
  },
];

// Sample testimonials
const testimonials = [
  {
    name: "Arjun Singh",
    initials: "AS",
    info: "Class 12, GSEB (92.5%)",
    quote:
      "The teaching methodology at Trimurti Classes made complex mathematical concepts easy to understand. The regular tests and personalized feedback helped me improve consistently.",
  },
  {
    name: "Meera Shah",
    initials: "MS",
    info: "Class 12, Gujarat Board (90.6%)",
    quote:
      "The faculty at Trimurti Classes is exceptional. They not only focus on academic excellence but also instill discipline and proper study habits which are essential for board exams and overall development.",
  },
  {
    name: "Rohan Desai",
    initials: "RD",
    info: "Class 10, Gujarat Board (84%)",
    quote:
      "I was struggling with mathematics before joining Trimurti Classes. The step-by-step approach and clear explanation of fundamentals helped me overcome my fear of the subject.",
  },
  {
    name: "Nisha Kumar",
    initials: "NK",
    info: "Class 12, GSEB Board (85.2%)",
    quote:
      "The rigorous practice and regular mock tests at Trimurti Classes prepared me well for board exams. The strong foundation in mathematics helped me excel in science subjects too.",
  },
  {
    name: "Vikram Patel",
    initials: "VP",
    info: "Class 12, GSEB (78.2%)",
    quote:
      "What sets Trimurti Classes apart is the individual attention given to each student. My weak areas were identified and addressed effectively, which significantly improved my performance.",
  },
  {
    name: "Anjali Verma",
    initials: "AV",
    info: "School Topper - All Subjects Excellence",
    quote:
      "The comprehensive subject teaching at Trimurti Classes was instrumental in my success across all subjects. The balanced focus on Mathematics, Science, Social Science, English, and Gujarati helped me achieve excellence in every subject.",
  },
];

// Sample parent feedbacks
const parentFeedbacks = [
  {
    name: "Mrs. Patel",
    initials: "SP",
    quote:
      "We've seen a remarkable improvement in our son's mathematical skills since he joined Trimurti Classes. The teachers are highly qualified and dedicated to student success.",
    info: "Parent of a Class 10 student",
  },
  {
    name: "Mr. Sharma",
    initials: "VS",
    quote:
      "What impressed me most is the regular updates we receive about our daughter's progress. The faculty is approachable and genuinely cares about each student's academic growth.",
    info: "Parent of a Class 12 student",
  },
  {
    name: "Mrs. Desai",
    initials: "RD",
    quote:
      "The disciplined environment and focus on fundamentals at Trimurti Classes have instilled good study habits in my son. His grades have improved significantly in all subjects.",
    info: "Parent of a Class 8 student",
  },
  {
    name: "Mr. Kumar",
    initials: "AK",
    quote:
      "Our daughter had math anxiety before joining Trimurti Classes. The supportive teachers and step-by-step approach helped her overcome her fear and develop confidence in the subject.",
    info: "Parent of a Class 9 student",
  },
];

export default SuccessStoriesPage;
