import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    // DarkModeToggle.tsx
    useEffect(() => {
        const saved = localStorage.getItem("theme");
        const root = document.documentElement;

        if (saved === "dark") {
            setIsDark(true);
            root.setAttribute("data-theme", "dark");
        }
    }, []);

    useEffect(() => {
        const root = document.documentElement;

        if (isDark) {
            root.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    return (
        <motion.button
            onClick={() => setIsDark(!isDark)}
            whileTap={{ scale: 0.9, rotate: 15 }}
            className={`w-10 h-10 flex items-center justify-center rounded-full 
        transition-colors duration-300 
        ${isDark ? "bg-[#FBDC54] hover:bg-[#FFD207]" : "bg-indigo-500 hover:bg-indigo-400"}
      `}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={isDark ? "sun" : "moon"}
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {isDark ? (
                        <Sun className="w-4 h-4 text-gray-900" />
                    ) : (
                        <Moon className="w-4 h-4 text-indigo-200" />
                    )}
                </motion.div>
            </AnimatePresence>
        </motion.button>
    );
};

export default DarkModeToggle;