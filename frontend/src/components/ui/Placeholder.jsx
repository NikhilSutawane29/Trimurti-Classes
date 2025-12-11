import React from 'react';
import { Hammer, LucideLoader, CircleDashed, Construction } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Placeholder Component
 *
 * A reusable component to display when a page or feature is under construction
 * or not yet implemented. Use this for temporary placeholders during development.
 *
 * @param {Object} props
 * @param {string} props.title - The title to display
 * @param {string} props.message - The message to display
 * @param {string} props.icon - The icon to display (construction, loader, hammer, or circle)
 * @param {string} props.className - Additional classes to apply
 */
const Placeholder = ({
  title = 'Coming Soon',
  message = 'This page is under construction and will be available soon.',
  icon = 'construction',
  className = '',
}) => {
  // Icon selection
  const IconComponent = {
    construction: Construction,
    loader: LucideLoader,
    hammer: Hammer,
    circle: CircleDashed
  }[icon] || Construction;

  return (
    <motion.div
      className={`w-full h-full min-h-[300px] flex flex-col items-center justify-center p-8 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{
          rotate: icon === 'loader' || icon === 'circle' ? 360 : [0, 15, 0, -15, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: icon === 'loader' || icon === 'circle' ? 3 : 1.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop"
        }}
        className="text-brand-blue-700 dark:text-brand-blue-500 mb-6"
      >
        <IconComponent size={48} />
      </motion.div>

      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3 text-center">
        {title}
      </h3>

      <p className="text-gray-600 dark:text-gray-300 max-w-md text-center">
        {message}
      </p>
    </motion.div>
  );
};

export default Placeholder;
