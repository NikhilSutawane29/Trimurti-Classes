import React, { useState } from "react";
import {
  Search,
  HelpCircle,
  BookOpen,
  Mail,
  Phone,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  FileText,
  Video,
  SendHorizontal,
  CalendarDays,
  Loader,
} from "lucide-react";
import { useToast } from "../../contexts/ToastContext";

const HelpCenterPage = () => {
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFaqs, setExpandedFaqs] = useState({});
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
    priority: "medium",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle FAQ item expansion
  const toggleFaq = (id) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Handle contact form changes
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form
      setContactForm({
        subject: "",
        message: "",
        priority: "medium",
      });

      toast.success("Your message has been sent! We'll get back to you soon.");
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter FAQs based on search query and category
  const filteredFaqs = faqs
    .filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter(
      (faq) => selectedCategory === "all" || faq.category === selectedCategory,
    );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Help Center
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Find answers to common questions and get support
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help..."
            className="pl-10 w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-md text-sm ${
              selectedCategory === "all"
                ? "bg-brand-blue-100 dark:bg-brand-blue-900/40 text-brand-blue-800 dark:text-brand-blue-400"
                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            All Topics
          </button>
          <button
            onClick={() => setSelectedCategory("account")}
            className={`px-4 py-2 rounded-md text-sm ${
              selectedCategory === "account"
                ? "bg-brand-blue-100 dark:bg-brand-blue-900/40 text-brand-blue-800 dark:text-brand-blue-400"
                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            Account
          </button>
          <button
            onClick={() => setSelectedCategory("courses")}
            className={`px-4 py-2 rounded-md text-sm ${
              selectedCategory === "courses"
                ? "bg-brand-blue-100 dark:bg-brand-blue-900/40 text-brand-blue-800 dark:text-brand-blue-400"
                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            Courses
          </button>
          <button
            onClick={() => setSelectedCategory("payment")}
            className={`px-4 py-2 rounded-md text-sm ${
              selectedCategory === "payment"
                ? "bg-brand-blue-100 dark:bg-brand-blue-900/40 text-brand-blue-800 dark:text-brand-blue-400"
                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            Payment
          </button>
          <button
            onClick={() => setSelectedCategory("technical")}
            className={`px-4 py-2 rounded-md text-sm ${
              selectedCategory === "technical"
                ? "bg-brand-blue-100 dark:bg-brand-blue-900/40 text-brand-blue-800 dark:text-brand-blue-400"
                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            Technical
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Help Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <HelpCircle
                  size={20}
                  className="mr-2 text-brand-blue-700 dark:text-brand-blue-400"
                />
                Frequently Asked Questions
              </h2>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                    >
                      <button
                        className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
                        onClick={() => toggleFaq(faq.id)}
                      >
                        <span className="font-medium text-gray-800 dark:text-white">
                          {faq.question}
                        </span>
                        {expandedFaqs[faq.id] ? (
                          <ChevronDown
                            size={20}
                            className="text-gray-500 dark:text-gray-400"
                          />
                        ) : (
                          <ChevronRight
                            size={20}
                            className="text-gray-500 dark:text-gray-400"
                          />
                        )}
                      </button>

                      {expandedFaqs[faq.id] && (
                        <div className="p-4 pt-0 text-gray-600 dark:text-gray-300 text-sm">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      No results found for "{searchQuery}". Try a different
                      search term.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Guides */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <BookOpen
                  size={20}
                  className="mr-2 text-brand-blue-700 dark:text-brand-blue-400"
                />
                Quick Guides
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guides.map((guide) => (
                  <div
                    key={guide.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                  >
                    <div className="flex items-center mb-3">
                      <guide.icon
                        size={18}
                        className="text-brand-blue-700 dark:text-brand-blue-400 mr-2"
                      />
                      <h3 className="font-medium text-gray-800 dark:text-white">
                        {guide.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {guide.description}
                    </p>
                    <div className="mt-3">
                      <a
                        href="#"
                        className="text-sm text-brand-blue-700 dark:text-brand-blue-400 font-medium hover:underline"
                      >
                        Read guide
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Support */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <MessageCircle
                  size={20}
                  className="mr-2 text-brand-blue-700 dark:text-brand-blue-400"
                />
                Contact Support
              </h2>
            </div>

            <div className="p-6">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactChange}
                    required
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                    placeholder="What do you need help with?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md resize-none"
                    placeholder="Describe your issue in detail..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={contactForm.priority}
                    onChange={handleContactChange}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                  >
                    <option value="low">Low - General question</option>
                    <option value="medium">Medium - Need assistance</option>
                    <option value="high">High - Urgent issue</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-brand-blue-700 text-white rounded-md hover:bg-brand-blue-800 transition-colors disabled:opacity-70 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader size={18} className="mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <SendHorizontal size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Direct Contact */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Contact Information
              </h2>
            </div>

            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Phone
                    size={18}
                    className="text-brand-blue-700 dark:text-brand-blue-400 mr-2 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      Call Us
                    </p>
                    <a
                      href="tel:+919909379193"
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-brand-blue-700 dark:hover:text-brand-blue-400"
                    >
                      +91 99093 79193
                    </a>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Mon-Sat, 9AM-6PM
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail
                    size={18}
                    className="text-brand-blue-700 dark:text-brand-blue-400 mr-2 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      Email Us
                    </p>
                    <a
                      href="mailto:support@trimurti-classes.com"
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-brand-blue-700 dark:hover:text-brand-blue-400"
                    >
                      support@trimurti-classes.com
                    </a>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  For urgent matters, please call us directly. For general
                  inquiries, email or the contact form is preferred.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// FAQ data
const faqs = [
  {
    id: 1,
    category: "account",
    question: "How do I change my password?",
    answer:
      "You can change your password in the Settings page. Go to your dashboard, click on Settings, then navigate to the 'Account Security' section and follow the instructions to update your password.",
  },
  {
    id: 2,
    category: "account",
    question: "How do I update my profile information?",
    answer:
      "To update your profile, go to the Dashboard, click on 'Profile' in the sidebar, and click the 'Edit Profile' button. You can update your personal information, contact details, and profile picture.",
  },
  {
    id: 3,
    category: "courses",
    question: "How do I enroll in a course?",
    answer:
      "To enroll in a course, browse the available courses, select the one you're interested in, and click the 'Enroll' button on the course detail page. Follow the instructions to complete the enrollment process.",
  },
  {
    id: 4,
    category: "courses",
    question: "How are course materials provided?",
    answer:
      "Course materials are provided in physical form during classes. Some additional resources may be available for download from our website to supplement your learning.",
  },
  {
    id: 5,
    category: "payment",
    question: "What payment methods are accepted?",
    answer:
      "We accept various payment methods including credit/debit cards, net banking, UPI, and other digital payment options. All payments are processed securely through our payment gateway.",
  },
  {
    id: 6,
    category: "payment",
    question: "How do I get a receipt for my payment?",
    answer:
      "After a successful payment, a receipt is automatically generated and sent to your registered email address. You can also view and download your payment receipts from the 'Payments' section in your dashboard.",
  },
  {
    id: 7,
    category: "technical",
    question: "What should I do if I can't access my course?",
    answer:
      "If you're having trouble accessing your course, first try refreshing the page and clearing your browser cache. If the issue persists, check your internet connection and try using a different browser. If you still face issues, please contact our support team.",
  },
  {
    id: 8,
    category: "technical",
    question: "Is the platform compatible with mobile devices?",
    answer:
      "Yes, our website is mobile-friendly. You can access your student dashboard, check schedules, and view announcements from any smartphone or tablet.",
  },
];

// Quick guides data
const guides = [
  {
    id: 1,
    icon: FileText,
    title: "Getting Started Guide",
    description:
      "Learn how to navigate the platform, set up your profile, and start your learning journey.",
  },
  {
    id: 2,
    icon: Video,
    title: "Classroom Schedules",
    description:
      "Information about batch timings, classroom locations, and attendance policies.",
  },
  {
    id: 3,
    icon: BookOpen,
    title: "Study Materials Guide",
    description:
      "How to effectively use the provided textbooks, worksheets, and supplementary materials.",
  },
  {
    id: 4,
    icon: MessageCircle,
    title: "Communication Channels",
    description:
      "Learn how to stay updated with announcements and communicate with teachers and staff.",
  },
];

export default HelpCenterPage;
