import { useRef } from "react";
import { motion } from "framer-motion";
import type { TabKey } from "../types";
import { tabsConfig } from "../config";
import { TbGridDots, TbList } from "react-icons/tb";

type ListTabsProps = {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  view: 'list' | 'grid';
  onViewChange: (view: 'list' | 'grid') => void;
};

const ListTabs = ({ activeTab, onTabChange, view, onViewChange }: ListTabsProps) => {
  const tabRefs = useRef<Record<TabKey, HTMLButtonElement | null>>({
    "My projects": null,
    "Dev Resources": null,
    "UI Lover": null,
  });

  const handleClick = (tab: TabKey) => {
    onTabChange(tab);
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <div
        className="flex flex-1 overflow-x-auto snap-x snap-mandatory p-1 gap-2 sm:justify-center no-scrollbar
        bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-xl shadow-inner border border-white/10 transition-colors"
      >
      {tabsConfig.tabs.map((tab) => (
        <motion.button
          key={tab}
          ref={(el) => {
            tabRefs.current[tab] = el;
          }}
          onClick={() => handleClick(tab)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className={`relative snap-center whitespace-nowrap text-xs sm:text-sm font-body font-semibold px-2 sm:px-4 py-2 rounded-lg transition-all duration-300 flex-1 min-w-[80px] sm:min-w-[110px] text-center
            ${
              tab === activeTab
                ? "bg-white dark:bg-black/45 text-black dark:text-white shadow-sm"
                : "text-gray-500 dark:text-white/50 hover:text-black dark:hover:text-white"
            }`}
        >
          {tab}
          {tab === activeTab && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-4/5 bg-accent-500 rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
      </div>
      
      {/* View Toggle */}
      <motion.button
        onClick={() => onViewChange(view === 'list' ? 'grid' : 'list')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 sm:p-2.5 rounded-lg bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/10
          hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-200 group flex-shrink-0"
        aria-label={`Switch to ${view === 'list' ? 'grid' : 'list'} view`}
      >
        <div className="relative w-5 h-5">
          <motion.div
            initial={false}
            animate={{ opacity: view === 'list' ? 1 : 0, scale: view === 'list' ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <TbGridDots className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-accent-500 transition-colors" />
          </motion.div>
          <motion.div
            initial={false}
            animate={{ opacity: view === 'grid' ? 1 : 0, scale: view === 'grid' ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <TbList className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-accent-500 transition-colors" />
          </motion.div>
        </div>
      </motion.button>
    </div>
  );
};

export default ListTabs;