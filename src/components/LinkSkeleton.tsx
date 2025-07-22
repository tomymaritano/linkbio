import { motion } from 'framer-motion';

interface LinkSkeletonProps {
  count?: number;
  type?: 'list' | 'grid';
}

export const LinkSkeleton = ({ count = 3, type = 'list' }: LinkSkeletonProps) => {
  if (type === 'grid') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="h-28 sm:h-32 rounded-xl bg-gray-200/50 dark:bg-gray-800/50 
                       backdrop-blur-sm animate-pulse border border-gray-300/20 dark:border-gray-700/20"
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
          className="flex items-center justify-between w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl
                     bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm animate-pulse
                     border border-gray-300/20 dark:border-gray-700/20"
        >
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded bg-gray-300/50 dark:bg-gray-700/50" />
            <div className="space-y-2">
              <div className="h-3 w-32 rounded bg-gray-300/50 dark:bg-gray-700/50" />
              <div className="h-2 w-24 rounded bg-gray-300/30 dark:bg-gray-700/30" />
            </div>
          </div>
          <div className="w-4 h-4 rounded bg-gray-300/50 dark:bg-gray-700/50" />
        </motion.div>
      ))}
    </div>
  );
};