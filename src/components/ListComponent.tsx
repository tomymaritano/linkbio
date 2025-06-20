// components/ListComponent.tsx
import { useState } from "react";
import ListTabs from "./ListTabs";
import ListItemWithPreview from "./ListItemWithPreview";
import type { MenuItem, TabKey } from "../types";
import { AnimatePresence, motion } from "framer-motion";

const data: Record<TabKey, MenuItem[]> = {
  "My projects": [
    { label: "Portfolio – My Lab", url: "https://hacklab.dog" },
    { label: "Blog – Read my thoughts", url: "https://blog.hacklab.dog" },
    { label: "SalaryBoard - explore IT salaries around LATAM", url: "https://salaries.hacklab.dog" },
    { label: "Dripnex – Minimal wallet", url: "https://dripnex.app" },
  ],
  "Dev Resources": [
    { label: "Refactoring UI – Design for devs", url: "https://refactoringui.com/" },
    { label: "useHooks – Useful React hooks", url: "https://usehooks.com/" },
    { label: "Frontend Mentor – Challenges", url: "https://www.frontendmentor.io/" },
    { label: "Buildspace – Web3/AI projects", url: "https://buildspace.so/" },
  ],
  "UI Lover": [
    { label: "Fonts Arena – Free fonts", url: "https://fontsarena.com/" },
    { label: "Coolors – Palette generator", url: "https://coolors.co/" },
    { label: "Laws of UX – UX principles", url: "https://lawsofux.com/" },
    { label: "Glassmorphism Generator", url: "https://hype4.academy/tools/glassmorphism-generator" },
  ],
};

const ListComponent = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("My projects");
  const items = data[activeTab] || [];

  return (
    <div className="w-full max-w-lg space-y-2 px-4 sm:px-6 ">
      
      <ListTabs onTabChange={setActiveTab} />
      <div className="space-y-2 max-h-[60vh] overflow-y-auto scrollbar-hide">
        <AnimatePresence mode="wait">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
            >
              <ListItemWithPreview item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ListComponent;