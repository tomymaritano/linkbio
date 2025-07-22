import { motion } from "framer-motion";
import { LayoutGrid, List } from "lucide-react";

interface ViewToggleProps {
  view: 'list' | 'grid';
  onViewChange: (view: 'list' | 'grid') => void;
}

const ViewToggle = ({ view, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex items-center gap-1 p-1 bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onViewChange('list')}
        className={`relative p-2 rounded-lg transition-all duration-300 ${
          view === 'list' 
            ? 'bg-white dark:bg-black/45 text-black dark:text-white shadow-sm' 
            : 'text-gray-500 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10'
        }`}
        aria-label="List view"
      >
        <List className="w-4 h-4" />
        {view === 'list' && (
          <motion.div
            layoutId="view-indicator"
            className="absolute inset-0 bg-accent-500/10 rounded-lg"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onViewChange('grid')}
        className={`relative p-2 rounded-lg transition-all duration-300 ${
          view === 'grid' 
            ? 'bg-white dark:bg-black/45 text-black dark:text-white shadow-sm' 
            : 'text-gray-500 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10'
        }`}
        aria-label="Grid view"
      >
        <LayoutGrid className="w-4 h-4" />
        {view === 'grid' && (
          <motion.div
            layoutId="view-indicator"
            className="absolute inset-0 bg-accent-500/10 rounded-lg"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </motion.button>
    </div>
  );
};

export default ViewToggle;