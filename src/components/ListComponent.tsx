// components/ListComponent.tsx
import { useState } from "react";
import * as HoverCard from '@radix-ui/react-hover-card';
import { useLinkPreview } from '../hooks/useLinkPreview';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import ListTabs from "./ListTabs";
import type { MenuItem, TabKey } from "../types";

const isExternal = (url: string) => /^https?:\/\//.test(url);

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

      {items.map((item: MenuItem, index: number) => {
        const external = isExternal(item.url);

        // ✅ move hook outside callback violation
        const LinkPreviewWrapper = () => {
          const { data: preview } = useLinkPreview(item.url);

          return (
            <HoverCard.Root key={index} openDelay={200}>
              <HoverCard.Trigger asChild>
                <a
                  href={item.url}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  title={external ? "Abrir en nueva pestaña" : undefined}
                  aria-label={external ? `${item.label} (se abre en una nueva pestaña)` : item.label}
                  role="link"
                  className="group flex items-center justify-between w-full rounded-lg bg-[#30363D] px-4 py-3 text-left text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-500 hover:bg-[#3b4048] transition-all duration-200 ease-in-out"
                >
                  <span className="transition-transform group-hover:translate-x-1">{item.label}</span>
                  {external ? (
                    <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-white group-hover:scale-110 transition-transform duration-200" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-white/70 group-hover:text-white group-hover:scale-110 transition-transform duration-200" />
                  )}
                </a>
              </HoverCard.Trigger>

              {preview && (
                <HoverCard.Content
                  side="right"
                  align="start"
  className="bg-[#1F242C] text-white rounded-lg p-3 text-xs shadow-xl w-72 z-50 border border-white/10"

                >
                  <div className="space-y-2">
                    <img
                      src={preview.image}
                      alt={preview.title}
                      className="w-full h-32 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold text-sm">{preview.title}</p>
                      <p className="text-gray-600 text-xs">{preview.description}</p>
                    </div>
                  </div>
                </HoverCard.Content>
              )}
            </HoverCard.Root>
          );
        };

        return <LinkPreviewWrapper key={index} />;
      })}
    </div>
  );
};

export default ListComponent;
