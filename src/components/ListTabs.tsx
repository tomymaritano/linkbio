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
        <div className="flex bg-[#21262C] p-1 rounded-xl space-x-2 w-full mb-4">
            {tabs.map((tab) => (
                <motion.button
                    key={tab}
                    onClick={() => handleClick(tab)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex-1 text-sm font-medium px-4 py-2 rounded-lg overflow-hidden ${tab === activeTab
                        ? "text-white"
                        : "text-white/60 hover:text-white transition-colors duration-200"
                        }`}
                >
                    {tab}

                    {/* Indicador animado */}
                    {tab === activeTab && (
                        <motion.div
                            layoutId="tab-indicator"
                            className="absolute bottom-0 left-0 h-1 w-full bg-indigo-500 rounded-t"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                    )}
                </motion.button>
            ))}
        </div>
    );
};

export default ListTabs;