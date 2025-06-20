import { useState } from "react";
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
                <button
                    key={tab}
                    onClick={() => handleClick(tab)}
                    className={`flex-1 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${tab === activeTab
                            ? "bg-[#30363D] text-white shadow-inner"
                            : "text-white/60 hover:text-white"
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default ListTabs;