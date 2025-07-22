import { useState, useMemo, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MenuItem } from '../types';

interface SearchBarProps {
  items: MenuItem[];
  onFilter: (filtered: MenuItem[]) => void;
  placeholder?: string;
}

export const SearchBar = ({ items, onFilter, placeholder = "Search links..." }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
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
    onFilter(filtered);
  }, [filtered, onFilter]);

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="relative">
      <motion.div 
        className={`relative transition-all duration-200 ${
          isFocused ? 'scale-[1.02]' : ''
        }`}
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-white/40 dark:bg-black/20 
                     backdrop-blur-md border border-black/10 dark:border-white/10
                     text-sm text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500/50
                     transition-all duration-200"
        />
        
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md
                         hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Results count */}
      <AnimatePresence>
        {query && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute -bottom-6 left-0 text-xs text-gray-500 dark:text-gray-400"
          >
            {filtered.length} {filtered.length === 1 ? 'result' : 'results'} found
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};