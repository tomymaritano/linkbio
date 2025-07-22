import { motion } from 'framer-motion';

interface LoadingStateProps {
  count?: number;
  type?: 'list' | 'grid';
}

const LoadingState = ({ count = 3, type = 'list' }: LoadingStateProps) => {
  if (type === 'grid') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="h-32 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center justify-between p-4 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse"
        >
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-4 w-32 rounded bg-gray-300 dark:bg-gray-700" />
          </div>
          <div className="w-4 h-4 rounded bg-gray-300 dark:bg-gray-700" />
        </motion.div>
      ))}
    </div>
  );
};

export default LoadingState;