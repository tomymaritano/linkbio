import { useState } from "react";
import { FaArrowUpRightDots } from "react-icons/fa6";

import ListTabs from "./ListTabs";
import type { MenuItem, TabKey } from "../types";

const data: Record<TabKey, MenuItem[]> = {
    "My projects": [
        { label: "Portfolio - My lab", url: "https://hacklab.dog" },
        { label: "Blog - read my thoghts", url: "https://blog.hacklab.dog" },
        { label: "SalaryBoard", url: "https://salaries.hacklab.dog" },
        { label: "Dripnex - minimal wallet", url: "https://dripnex.app" },
        { label: "Inkrun - lofi markdown", url: "https://inkrun.app" }
    ],
    "Dev Resources": [
        {
            label: "Refactoring UI – diseño para developers",
            url: "https://refactoringui.com/",
        },
        {
            label: "useHooks – colección de hooks útiles de React",
            url: "https://usehooks.com/",
        },
        {
            label: "Frontend Mentor – desafíos de front-end",
            url: "https://www.frontendmentor.io/",
        },
        {
            label: "Buildspace – proyectos Web3 y AI para makers",
            url: "https://buildspace.so/",
        },
    ],

    "UI Lover": [
        {
            label: "Fonts Arena – fuentes limpias y gratis",
            url: "https://fontsarena.com/",
        },
        {
            label: "Coolors – generador de paletas de colores",
            url: "https://coolors.co/",
        },
        {
            label: "Laws of UX – principios de UX ilustrados",
            url: "https://lawsofux.com/",
        },
        {
            label: "Glassmorphism Generator – estilos visuales modernos",
            url: "https://hype4.academy/tools/glassmorphism-generator",
        },
    ],
};

const ListComponent = () => {
    const [activeTab, setActiveTab] = useState<TabKey>("My projects");

    return (
        <div className="w-full max-w-md space-y-2 px-4">
            <ListTabs onTabChange={setActiveTab} />

            {(data[activeTab] || []).map((item: MenuItem, index: number) => (
                <a
                    key={index}
                    href={item.url}
                    className="flex items-center justify-between w-full rounded-lg bg-[#30363D] px-4 py-3 text-left text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-500 hover:bg-[#3b4048] transition"
                >
                    <span>{item.label}</span>
                    <FaArrowUpRightDots className="w-4 h-4" />
                </a>
            ))}
        </div>
    );
};

export default ListComponent;