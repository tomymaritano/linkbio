// components/ListComponent.tsx
import { useState } from "react";
import ListTabs from "./ListTabs";
import ListItemWithPreview from "./ListItemWithPreview";
import type { MenuItem, TabKey } from "../types";

const data: Record<TabKey, MenuItem[]> = {
  "My projects": [
    { label: "Portfolio - My lab", url: "https://hacklab.dog" },
    { label: "Blog - read my thoughts", url: "https://blog.hacklab.dog" },
    { label: "SalaryBoard", url: "https://salaries.hacklab.dog" },
    { label: "Dripnex - minimal wallet", url: "https://dripnex.app" },
  ],
  "Dev Resources": [
    { label: "Refactoring UI – design for developers", url: "https://refactoringui.com/" },
    { label: "useHooks – collection of useful React hooks", url: "https://usehooks.com/" },
    { label: "Frontend Mentor – front-end challenges", url: "https://www.frontendmentor.io/" },
    { label: "Buildspace – Web3 and AI projects for makers", url: "https://buildspace.so/" },
  ],
  "UI Lover": [
    { label: "Fonts Arena – clean and free fonts", url: "https://fontsarena.com/" },
    { label: "Coolors – color palette generator", url: "https://coolors.co/" },
    { label: "Laws of UX – illustrated UX principles", url: "https://lawsofux.com/" },
    { label: "Glassmorphism Generator – modern visual styles", url: "https://hype4.academy/tools/glassmorphism-generator" },
  ],
};

const ListComponent = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("My projects");
  const items = data[activeTab] || [];

  return (
    <div className="w-full max-w-lg space-y-2 px-4">
      <ListTabs onTabChange={setActiveTab} />
      {items.map((item, index) => (
        <ListItemWithPreview key={index} item={item} />
      ))}
    </div>
  );
};

export default ListComponent;