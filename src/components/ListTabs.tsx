import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { TabKey } from "../types";

const tabs: TabKey[] = ["My projects", "Dev Resources", "UI Lover"];

type HackleTabsProps = {
  onTabChange: (tab: TabKey) => void;
};

const HackleTabs = ({ onTabChange }: HackleTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>(tabs[0]);
  const tabRefs = useRef<Record<TabKey, HTMLButtonElement | null>>({
    "My projects": null,
    "Dev Resources": null,
    "UI Lover": null,
  });

  const handleClick = (tab: TabKey) => {
    setActiveTab(tab);
    onTabChange(tab);

    const tabEl = tabRefs.current[tab];
    if (tabEl) {
      tabEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  return (
    <div
      className="flex w-full overflow-x-auto snap-x snap-mandatory p-1 gap-2 sm:justify-center no-scrollbar
      bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-xl shadow-inner border border-white/10 transition-colors"
    >
      {tabs.map((tab) => (
        <motion.button
          key={tab}
          ref={(el) => {
            tabRefs.current[tab] = el;
          }}
          onClick={() => handleClick(tab)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className={`relative snap-center whitespace-nowrap text-sm font-body font-semibold px-4 py-2 rounded-lg transition-all duration-300 flex-1 min-w-[110px] text-center
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
  );
};

export default HackleTabs;