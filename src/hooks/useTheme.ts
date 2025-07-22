import { useEffect, useState } from 'react';

export const useTheme = () => {
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

  const toggleTheme = () => setIsDark(!isDark);

  return { isDark, toggleTheme };
};