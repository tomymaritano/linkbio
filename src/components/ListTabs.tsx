import { useState } from "react";
import { motion } from "framer-motion";
import type { TabKey } from "../types";

const tabs: TabKey[] = ["My projects", "Dev Resources", "UI Lover"];

type ListTabsProps = {
  onTabChange: (tab: TabKey) => void;
};

const ListTabs = ({ onTabChange }: ListTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>(tabs[0]);

  const handleClick = (tab: TabKey) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="flex w-full overflow-x-auto bg-gray-100 dark:bg-[#21262C] p-1 rounded-xl gap-2 sm:justify-center scrollbar-hide">
      {tabs.map((tab) => (
        <motion.button
          key={tab}
          onClick={() => handleClick(tab)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className={`relative whitespace-nowrap text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 flex-1 min-w-[110px] text-center
            ${
              tab === activeTab
                ? "bg-white dark:bg-[#30363D] text-black dark:text-white shadow-sm"
                : "text-gray-500 dark:text-white/50 hover:text-black dark:hover:text-white"
            }`}
        >
          {tab}
          {tab === activeTab && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-4/5 bg-indigo-500 rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default ListTabs;