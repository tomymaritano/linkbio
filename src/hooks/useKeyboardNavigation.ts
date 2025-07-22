import { useEffect } from 'react';
import type { TabKey } from '../types';
import { tabsConfig } from '../config';

interface UseKeyboardNavigationProps {
  onTabChange?: (tab: TabKey) => void;
  onSearch?: () => void;
  onThemeToggle?: () => void;
}

export const useKeyboardNavigation = ({
  onTabChange,
  onSearch,
  onThemeToggle
}: UseKeyboardNavigationProps) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Tab navigation with numbers (1-3)
      if (e.key >= '1' && e.key <= '3' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const tabIndex = parseInt(e.key) - 1;
        const tab = tabsConfig.tabs[tabIndex];
        if (tab && onTabChange) {
          onTabChange(tab);
        }
      }
      
      // Search with Cmd/Ctrl + K or /
      if (((e.metaKey || e.ctrlKey) && e.key === 'k') || e.key === '/') {
        e.preventDefault();
        if (onSearch) {
          onSearch();
        }
      }
      
      // Theme toggle with Cmd/Ctrl + D
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault();
        if (onThemeToggle) {
          onThemeToggle();
        } else {
          // Fallback: click the theme toggle button
          const themeToggle = document.querySelector('[aria-label*="mode"]') as HTMLButtonElement;
          themeToggle?.click();
        }
      }
      
      // Escape to clear search
      if (e.key === 'Escape') {
        const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
        if (searchInput && searchInput.value) {
          searchInput.value = '';
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
          searchInput.blur();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onTabChange, onSearch, onThemeToggle]);
};