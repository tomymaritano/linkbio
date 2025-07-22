// components/ListComponent.tsx
import { useState, useEffect, useCallback } from "react";
import ListTabs from "./ListTabs";
import VirtualizedList from "./VirtualizedList";
import GridView from "./GridView";
import { SearchBar } from "./SearchBar";
import type { TabKey, MenuItem } from "../types";
import { linksConfig, tabsConfig } from "../config";

const ListComponent = () => {
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
  
  // Handle search filter
  const handleFilter = useCallback((filtered: MenuItem[]) => {
    setFilteredItems(filtered);
  }, []);

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
        
        {/* Search Bar - Only show for tabs with many items */}
        {items.length > 5 && (
          <SearchBar 
            items={items} 
            onFilter={handleFilter}
            placeholder={`Search in ${activeTab}...`}
          />
        )}
      </div>
      
      {/* Content Section */}
      <div className="flex-1 min-h-0">
        {view === 'list' ? (
          <VirtualizedList items={filteredItems} activeTab={activeTab} />
        ) : (
          <GridView items={filteredItems} activeTab={activeTab} />
        )}
      </div>
    </div>
  );
};

export default ListComponent;