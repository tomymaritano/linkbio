import { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MenuItem } from '../types';
import { createPortal } from 'react-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
}

export const SearchModal = ({ isOpen, onClose, items, onSelectItem }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    
    const lowQuery = query.toLowerCase();
    return items.filter(item => 
      item.label.toLowerCase().includes(lowQuery) ||
      item.description?.toLowerCase().includes(lowQuery) ||
      item.url.toLowerCase().includes(lowQuery)
    );
  }, [items, query]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSelectItem = (item: MenuItem) => {
    onSelectItem(item);
    setQuery('');
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search links, projects, or resources..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg
                         text-sm text-black dark:text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-accent-500/50
                         transition-all duration-200"
              />
              <button
                onClick={onClose}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg
                         hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close search"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            {/* Results count */}
            {query && (
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 pl-1">
                {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
              </div>
            )}
          </div>

          {/* Search Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query ? (
              filtered.length > 0 ? (
                <div className="p-2">
                  {filtered.map((item, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSelectItem(item)}
                      className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                               transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={`https://www.google.com/s2/favicons?domain=${new URL(item.url).hostname}&sz=32`}
                          alt=""
                          className="w-5 h-5 rounded"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {item.label}
                          </p>
                          {item.description && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500 dark:text-gray-400">No results found</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    Try searching with different keywords
                  </p>
                </div>
              )
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">Start typing to search</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Search across all links and resources
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};