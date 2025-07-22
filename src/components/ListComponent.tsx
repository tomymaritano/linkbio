// components/ListComponent.tsx
import { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from "react";
import ListTabs from "./ListTabs";
import VirtualizedList from "./VirtualizedList";
import GridView from "./GridView";
import { SearchModal } from "./SearchModal";
import type { TabKey, MenuItem } from "../types";
import { linksConfig, tabsConfig } from "../config";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export interface ListComponentRef {
  openSearch: () => void;
}

const ListComponent = forwardRef<ListComponentRef>((_, ref) => {
  // Get initial tab from URL or use default
  const getInitialTab = (): TabKey => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabFromUrl = params.get('tab');
      if (tabFromUrl && tabsConfig.tabs.includes(tabFromUrl as TabKey)) {
        return tabFromUrl as TabKey;
      }
    }
    return tabsConfig.defaultTab;
  };

  const [activeTab, setActiveTab] = useState<TabKey>(getInitialTab());
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const items = linksConfig[activeTab] || [];
  
  // Initialize filtered items
  useEffect(() => {
    setFilteredItems(items);
  }, [activeTab]);

  // Update URL when tab changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('tab', activeTab);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }, [activeTab]);
  
  
  // Handle item selection from search
  const handleSelectItem = useCallback((item: MenuItem) => {
    // Navigate to the item's URL
    window.open(item.url, '_blank');
  }, []);
  
  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    openSearch: () => setIsSearchOpen(true)
  }), []);

  return (
    <div className="w-full flex flex-col gap-4 h-full">
      {/* Controls Section */}
      <div className="space-y-3">
        <ListTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          view={view} 
          onViewChange={setView} 
        />
        
        {/* Search Button */}
        <motion.button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl
                     bg-white/40 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10
                     text-sm text-black dark:text-white transition-all hover:bg-white/60 dark:hover:bg-black/30"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Search className="w-4 h-4" />
          <span className="text-gray-600 dark:text-gray-400">Search links, projects, or resources...</span>
        </motion.button>
      </div>
      
      {/* Content Section */}
      <div className="flex-1 min-h-0">
        {view === 'list' ? (
          <VirtualizedList items={filteredItems} activeTab={activeTab} />
        ) : (
          <GridView items={filteredItems} activeTab={activeTab} />
        )}
      </div>
      
      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        items={Object.values(linksConfig).flat()}
        onSelectItem={handleSelectItem}
      />
    </div>
  );
});

ListComponent.displayName = 'ListComponent';

export default ListComponent;