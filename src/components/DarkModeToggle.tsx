import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa6";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

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

  // Trigger cinematographic transition
  const event = new Event("theme-changed");
  window.dispatchEvent(event);
}, [isDark]);

  return (
    <motion.button
      onClick={() => setIsDark(!isDark)}
      whileTap={{ scale: 0.9, rotate: 15 }}
      className="px-3 w-12 h-12 py-1.5 flex items-center justify-center rounded-full 
      bg-white/10 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 
      transition-all duration-300"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      role="switch"
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
            <FaSun className="w-5 h-5 text-yellow-400" />
          ) : (
            <FaMoon className="w-5 h-5 text-indigo-500" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

export default DarkModeToggle;