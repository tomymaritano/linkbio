import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EmptyState } from "./EmptyState";
import type { MenuItem } from "../types";
// import { fadeInUp, staggerContainer } from "../utils/animations";

interface GridViewProps {
  items: MenuItem[];
  activeTab: string;
}

const GridView = ({ items, activeTab }: GridViewProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isExternal = (url: string) => /^https?:\/\//.test(url);

  // Reset scroll position when activeTab changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  // Handle empty state
  if (items.length === 0) {
    return (
      <EmptyState 
        type="no-results"
        message="No links found"
        description="Try adjusting your search or check another tab"
      />
    );
  }

  return (
    <motion.div 
      ref={scrollRef}
      className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 h-full overflow-y-auto overflow-x-hidden pr-2 scrollbar-thin"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="sync">
        {items.map((item, index) => {
          const external = isExternal(item.url);
          return (
            <motion.a
              key={`${activeTab}-${item.label}`}
              href={item.url}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              layout
              custom={index}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex flex-col items-center justify-center p-3 sm:p-4 h-28 sm:h-32 rounded-xl
                bg-white/40 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10
                text-center transition-all hover:bg-white/60 dark:hover:bg-black/30"
            >
              <img 
                src={`https://www.google.com/s2/favicons?domain=${new URL(item.url).hostname}&sz=64`}
                alt=""
                className="w-6 h-6 sm:w-8 sm:h-8 mb-2 rounded"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="text-xs font-body font-semibold text-black dark:text-white line-clamp-2">
                {item.label.split(' – ')[0]}
              </span>
              {item.description && (
                <span className="text-xs text-gray-600 dark:text-white/60 mt-1 line-clamp-1">
                  {item.description}
                </span>
              )}
              {external && (
                <ArrowUpRight className="absolute top-2 right-2 w-3 h-3 text-gray-600 dark:text-white/60 
                  opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </motion.a>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};

export default GridView;