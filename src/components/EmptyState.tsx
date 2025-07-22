import { motion } from 'framer-motion';
import { Search, Inbox, AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  type?: 'no-results' | 'no-items' | 'error';
  message?: string;
  description?: string;
}

export const EmptyState = ({ 
  type = 'no-results', 
  message,
  description 
}: EmptyStateProps) => {
  const configs = {
    'no-results': {
      icon: Search,
      defaultMessage: 'No results found',
      defaultDescription: 'Try adjusting your search or filters',
      color: 'text-gray-400'
    },
    'no-items': {
      icon: Inbox,
      defaultMessage: 'No links available',
      defaultDescription: 'This section is empty for now',
      color: 'text-gray-400'
    },
    'error': {
      icon: AlertCircle,
      defaultMessage: 'Something went wrong',
      defaultDescription: 'Please try again later',
      color: 'text-red-400'
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          delay: 0.1,
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
        className={`p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4 ${config.color}`}
      >
        <Icon className="w-8 h-8" />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
      >
        {message || config.defaultMessage}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-gray-500 dark:text-gray-400 max-w-xs"
      >
        {description || config.defaultDescription}
      </motion.p>
    </motion.div>
  );
};