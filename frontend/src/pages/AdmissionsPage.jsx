import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ClipboardList,
  Calendar,
  FileText,
  CreditCard,
  CheckCircle,
  User,
  Mail,
  Phone,
  School,
  ChevronDown,
  ChevronRight,
  Send,
  Loader,
  ArrowRight,
  Clock,
  HelpCircle,
  BookOpen,
} from "lucide-react";

const AdmissionsPage = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    standard: "",
    medium: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call the admission API endpoint
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/admissions`,
        formData,
      );

      if (response.data.success) {
        // Show success message
        setSubmitted(true);

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          standard: "",
          medium: "",
          subject: "",
          message: "",
        });

        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error submitting admission form:", error);
      alert(
        error.response?.data?.message ||
          "Failed to submit admission form. Please try again or contact us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-blue-900 to-brand-blue-700 text-white">
        <div className="container mx-auto px-4 py-20 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Trimurti Classes
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Begin your journey towards academic excellence with our
              comprehensive mathematics programs
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#apply-now"
                className="px-6 py-3 bg-brand-gold-600 hover:bg-brand-gold-700 rounded-md font-medium transition-colors"
              >
                Apply Now
              </a>
              <Link
                to="/contact"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-md font-medium transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admission Process
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Follow these simple steps to join our community of learners
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line connecting steps */}
              <div className="hidden md:block absolute left-[21px] top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

              {/* Step 1 */}
              <div className="mb-8 md:mb-12 flex flex-col md:flex-row">
                <div className="flex items-center justify-center md:justify-start mb-4 md:mb-0">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-blue-100 dark:bg-brand-blue-900 flex items-center justify-center text-brand-blue-700 dark:text-brand-blue-300 font-bold z-10">
                    1
                  </div>
                </div>
                <div className="md:ml-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <FileText className="w-5 h-5 text-brand-blue-600 dark:text-brand-blue-400 mr-2" />
                    Submit Application
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Complete and submit the application form with accurate
                    personal and academic information. You can apply online
                    through our website or visit our center for a physical
                    application form.
                  </p>
                  <div className="mt-4 flex gap-2 flex-wrap">
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 text-sm rounded-full text-gray-700 dark:text-gray-300">
                      Online Application
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 text-sm rounded-full text-gray-700 dark:text-gray-300">
                      In-Person Application
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="mb-8 md:mb-12 flex flex-col md:flex-row">
                <div className="flex items-center justify-center md:justify-start mb-4 md:mb-0">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-blue-100 dark:bg-brand-blue-900 flex items-center justify-center text-brand-blue-700 dark:text-brand-blue-300 font-bold z-10">
                    2
                  </div>
                </div>
                <div className="md:ml-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <User className="w-5 h-5 text-brand-blue-600 dark:text-brand-blue-400 mr-2" />
                    Discuss Subjects & Batch Timing
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Meet with our faculty to discuss your subject requirements,
                    current academic level, and learning goals. We'll help you
                    choose the right subjects and batch timing that fits your
                    schedule. This is also an opportunity to address any
                    questions about our teaching methodology.
                  </p>
                  <div className="mt-4 flex gap-2 flex-wrap">
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 text-sm rounded-full text-gray-700 dark:text-gray-300">
                      Subject Selection
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 text-sm rounded-full text-gray-700 dark:text-gray-300">
                      Batch Timing
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 text-sm rounded-full text-gray-700 dark:text-gray-300">
                      Faculty Interaction
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row">
                <div className="flex items-center justify-center md:justify-start mb-4 md:mb-0">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-blue-100 dark:bg-brand-blue-900 flex items-center justify-center text-brand-blue-700 dark:text-brand-blue-300 font-bold z-10">
                    3
                  </div>
                </div>
                <div className="md:ml-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <CreditCard className="w-5 h-5 text-brand-blue-600 dark:text-brand-blue-400 mr-2" />
                    Complete Registration & Start Learning
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Complete the enrollment by submitting required documents and
                    paying the applicable fees. Once registered, you'll receive
                    your class schedule, study materials, and can start
                    attending classes immediately. Welcome to Trimurti Classes!
                  </p>
                  <div className="mt-4 flex gap-2 flex-wrap">
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 text-sm rounded-full text-gray-700 dark:text-gray-300">
                      Documentation
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 text-sm rounded-full text-gray-700 dark:text-gray-300">
                      Fee Payment
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 text-sm rounded-full text-gray-700 dark:text-gray-300">
                      Start Classes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility & Requirements */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Eligibility Criteria */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <CheckCircle className="w-6 h-6 text-brand-blue-600 dark:text-brand-blue-400 mr-2" />
                  Eligibility Criteria
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-brand-blue-600 dark:text-brand-blue-400 mr-2">
                      •
                    </span>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">
                        Age Requirement
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Students from 6 years (Class 1) to 18 years (Class 12)
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-blue-600 dark:text-brand-blue-400 mr-2">
                      •
                    </span>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">
                        Academic Standing
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Minimum 60% marks in mathematics in the previous
                        academic year
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-blue-600 dark:text-brand-blue-400 mr-2">
                      •
                    </span>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">
                        Commitment
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Willingness to attend regular classes and complete
                        assignments
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-blue-600 dark:text-brand-blue-400 mr-2">
                      •
                    </span>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">
                        Regular Attendance
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Commitment to attend classes regularly and participate
                        actively in learning
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Required Documents */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <FileText className="w-6 h-6 text-brand-blue-600 dark:text-brand-blue-400 mr-2" />
                  Required Documents
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-brand-blue-600 dark:text-brand-blue-400 mr-2">
                      •
                    </span>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">
                        Completed Application Form
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Filled with accurate information and signed by
                        parent/guardian
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-blue-600 dark:text-brand-blue-400 mr-2">
                      •
                    </span>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">
                        Academic Records
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Previous 2 years' report cards or mark sheets
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-blue-600 dark:text-brand-blue-400 mr-2">
                      •
                    </span>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">
                        Identification
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Birth certificate or student ID card
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-blue-600 dark:text-brand-blue-400 mr-2">
                      •
                    </span>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">
                        Passport Size Photographs
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        3 recent color photographs
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-blue-600 dark:text-brand-blue-400 mr-2">
                      •
                    </span>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">
                        Address Proof
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Copy of any valid address proof document
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Fee Structure
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Transparent and flexible payment options to suit your needs
            </p>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Class/Standard
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Monthly Fee
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Yearly Fee
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    Class 5
                  </td>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    ₹1,000
                  </td>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    ₹12,000
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    Class 6
                  </td>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    ₹1,000
                  </td>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    ₹12,000
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    Class 7
                  </td>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    ₹1,000
                  </td>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    ₹12,000
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    Class 8
                  </td>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    ₹1,000
                  </td>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    ₹12,000
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    Class 9
                  </td>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    ₹1,250
                  </td>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    ₹15,000
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    Class 10
                  </td>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    ₹1,500
                  </td>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    ₹18,000
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    Class 11
                  </td>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    ₹1,250
                  </td>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    ₹15,000
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    Class 12
                  </td>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    ₹1,417
                  </td>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                    ₹17,000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="max-w-3xl mx-auto mt-8 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Additional Information
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-brand-blue-600 dark:text-brand-blue-400 mr-2">
                  •
                </span>
                Study materials and worksheets are included in the fees
              </li>
              <li className="flex items-start">
                <span className="text-brand-blue-600 dark:text-brand-blue-400 mr-2">
                  •
                </span>
                Sibling discount of 10% available on tuition fees for the second
                child
              </li>
              <li className="flex items-start">
                <span className="text-brand-blue-600 dark:text-brand-blue-400 mr-2">
                  •
                </span>
                Merit scholarships available based on academic performance
              </li>
              <li className="flex items-start">
                <span className="text-brand-blue-600 dark:text-brand-blue-400 mr-2">
                  •
                </span>
                Multiple payment options: Cash, Bank Transfer, UPI, Online Payment
              </li>
              <li className="flex items-start">
                <span className="text-brand-blue-600 dark:text-brand-blue-400 mr-2">
                  •
                </span>
                Yearly payment provides better value compared to monthly payments
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-12 bg-brand-blue-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Important Dates
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Mark your calendar with these key dates for the upcoming session
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-brand-blue-100 dark:bg-brand-blue-900/50 rounded-md">
                  <Calendar className="w-6 h-6 text-brand-blue-700 dark:text-brand-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Admission Open
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    March 15, 2024 - Onwards
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-brand-blue-100 dark:bg-brand-blue-900/50 rounded-md">
                  <Calendar className="w-6 h-6 text-brand-blue-700 dark:text-brand-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Enrollment Discussions
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Monday to Saturday (10 AM - 6 PM)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-brand-blue-100 dark:bg-brand-blue-900/50 rounded-md">
                  <Calendar className="w-6 h-6 text-brand-blue-700 dark:text-brand-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Regular Session Begins
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    June 10, 2024
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-brand-blue-100 dark:bg-brand-blue-900/50 rounded-md">
                  <Calendar className="w-6 h-6 text-brand-blue-700 dark:text-brand-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Orientation Program
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    June 8, 2024 (11 AM - 1 PM)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find answers to common questions about our admissions process
            </p>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-gray-200 dark:divide-gray-700">
            {admissionFaqs.map((faq, index) => (
              <div key={index} className="py-5">
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full justify-between items-start text-left focus:outline-none"
                >
                  <div className="flex items-center">
                    <HelpCircle className="w-5 h-5 text-brand-blue-600 dark:text-brand-blue-400 mr-3 flex-shrink-0" />
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </span>
                  </div>
                  <span className="flex-shrink-0">
                    {expandedFaq === index ? (
                      <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </span>
                </button>
                {expandedFaq === index && (
                  <div className="mt-2 ml-8 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-now" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Apply Now
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Fill out the form below to start your application process
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {submitted ? (
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Application Submitted Successfully!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Thank you for your interest in Trimurti Classes. Our team will
                  contact you within 1-2 business days to discuss subject
                  selection, batch timing, and complete your enrollment. We look
                  forward to welcoming you!
                </p>
                <div className="flex justify-center gap-4 mt-6">
                  <button
                    onClick={() => {
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        standard: "",
                        medium: "",
                        subject: "",
                        message: "",
                      });
                      setSubmitted(false);
                    }}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Submit Another Application
                  </button>
                  <Link
                    to="/contact"
                    className="px-4 py-2 bg-brand-blue-600 text-white rounded-md hover:bg-brand-blue-700 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Full Name *
                    </label>
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-gray-400 mr-2" />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-brand-blue-500 focus:border-brand-blue-500 dark:focus:ring-brand-blue-400 dark:focus:border-brand-blue-400"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email Address *
                    </label>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-gray-400 mr-2" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-brand-blue-500 focus:border-brand-blue-500 dark:focus:ring-brand-blue-400 dark:focus:border-brand-blue-400"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Phone Number *
                    </label>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-gray-400 mr-2" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-brand-blue-500 focus:border-brand-blue-500 dark:focus:ring-brand-blue-400 dark:focus:border-brand-blue-400"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="standard"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Class/Standard *
                    </label>
                    <div className="flex items-center">
                      <School className="w-5 h-5 text-gray-400 mr-2" />
                      <select
                        id="standard"
                        name="standard"
                        value={formData.standard}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-brand-blue-500 focus:border-brand-blue-500 dark:focus:ring-brand-blue-400 dark:focus:border-brand-blue-400"
                      >
                        <option value="">Select Class/Standard</option>
                        <option value="Class 1">Class 1</option>
                        <option value="Class 2">Class 2</option>
                        <option value="Class 3">Class 3</option>
                        <option value="Class 4">Class 4</option>
                        <option value="Class 5">Class 5</option>
                        <option value="Class 6">Class 6</option>
                        <option value="Class 7">Class 7</option>
                        <option value="Class 8">Class 8</option>
                        <option value="Class 9">Class 9</option>
                        <option value="Class 10">Class 10</option>
                        <option value="Class 11">Class 11</option>
                        <option value="Class 12">Class 12</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="medium"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Medium *
                    </label>
                    <div className="flex items-center">
                      <BookOpen className="w-5 h-5 text-gray-400 mr-2" />
                      <select
                        id="medium"
                        name="medium"
                        value={formData.medium}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-brand-blue-500 focus:border-brand-blue-500 dark:focus:ring-brand-blue-400 dark:focus:border-brand-blue-400"
                      >
                        <option value="">Select Medium</option>
                        <option value="english">English</option>
                        <option value="gujarati">Gujarati</option>
                      </select>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-brand-blue-500 focus:border-brand-blue-500 dark:focus:ring-brand-blue-400 dark:focus:border-brand-blue-400"
                      placeholder="e.g., Admission Inquiry for Class 10 Mathematics"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-brand-blue-500 focus:border-brand-blue-500 dark:focus:ring-brand-blue-400 dark:focus:border-brand-blue-400"
                      placeholder="Any specific requirements or questions..."
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-brand-blue-600 text-white rounded-md hover:bg-brand-blue-700 transition-colors disabled:opacity-70 flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Application
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-brand-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Have Questions About Admissions?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our admissions team is here to help you navigate the process and
            answer any questions you may have
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 bg-white text-brand-blue-800 rounded-md font-medium transition-colors hover:bg-gray-100"
            >
              Contact Admissions Team
            </Link>
            <a
              href="tel:+919909379193"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-md font-medium transition-colors"
            >
              Call Us: +91 99093 79193
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// Sample admission FAQs
const admissionFaqs = [
  {
    question: "When is the best time to apply for admission?",
    answer:
      "While we accept applications throughout the year, we recommend applying at least 2-3 months before the start of the academic session to ensure a smooth transition. The main admission period is from March to May for the session beginning in June.",
  },
  {
    question: "How do I choose the right batch timing?",
    answer:
      "We offer morning (8 AM - 11 AM) and afternoon (4 PM - 8 PM) batches to suit your schedule. During the enrollment discussion, we'll help you choose the best timing based on your school hours and personal preferences to ensure optimal learning.",
  },
  {
    question: "Are there any scholarships available?",
    answer:
      "Yes, we offer merit-based scholarships to deserving students. Scholarships are awarded based on academic performance, dedication, and previous academic records. The scholarship can cover up to 50% of the tuition fees. Please discuss this during your enrollment meeting.",
  },
  {
    question: "What is the class size?",
    answer:
      "We maintain small batch sizes to ensure personalized attention. Primary classes typically have 15-20 students, while middle and high school classes have 20-25 students per batch. This allows our teachers to provide individual attention and address specific learning needs.",
  },
  {
    question: "Can I change batches if needed?",
    answer:
      "Yes, we understand that schedules may change. Batch transfers are possible subject to availability and should be requested through a formal application. We try our best to accommodate such requests.",
  },
  {
    question: "Is there a refund policy for fees paid?",
    answer:
      "Registration fees are non-refundable. For tuition fees, if a student withdraws before classes begin, a full refund minus an administrative fee is provided. If withdrawal occurs within the first month, a 50% refund is given. No refunds are provided after the first month of classes.",
  },
];

export default AdmissionsPage;
