import { useRef, useEffect, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { motion, AnimatePresence } from 'framer-motion';
import ListItemWithPreview from './ListItemWithPreview';
import { LinkSkeleton } from './LinkSkeleton';
import { EmptyState } from './EmptyState';
import type { MenuItem } from '../types';
// import { fadeInUp } from '../utils/animations';

interface VirtualizedListProps {
  items: MenuItem[];
  activeTab: string;
}

const VirtualizedList = ({ items, activeTab }: VirtualizedListProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72, // Estimated height of each item (increased for better spacing)
    overscan: 5, // Number of items to render outside of viewport
    gap: 8, // Add gap between items
  });

  // Reset scroll position when activeTab changes
  useEffect(() => {
    setIsLoading(true);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    if (parentRef.current) {
      parentRef.current.scrollTop = 0;
    }
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Only use virtualization for lists with more than 50 items (increased threshold)
  const shouldVirtualize = items.length > 50;

  // Handle empty state
  if (!isLoading && items.length === 0) {
    return (
      <EmptyState 
        type="no-results"
        message="No links found"
        description="Try adjusting your search or check another tab"
      />
    );
  }

  if (!shouldVirtualize) {
    // For small lists, use the regular animated list
    return (
      <div ref={scrollRef} className="space-y-2 h-full overflow-y-auto overflow-x-hidden pr-2 scrollbar-thin">
        {isLoading ? (
          <LinkSkeleton count={Math.min(items.length, 5)} />
        ) : (
          <AnimatePresence mode="sync">
            {items.map((item, index) => (
            <motion.div
              key={`${activeTab}-${item.label}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ListItemWithPreview item={item} />
            </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    );
  }

  // For large lists, use virtualization
  return (
    <div
      ref={parentRef}
      className="h-full overflow-y-auto overflow-x-hidden scrollbar-thin"
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        <AnimatePresence mode="sync">
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const item = items[virtualItem.index];
            return (
              <motion.div
                key={`${activeTab}-${item.label}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: virtualItem.index * 0.02 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                  paddingBottom: '8px',
                }}
              >
                <ListItemWithPreview item={item} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VirtualizedList;