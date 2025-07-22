import { useCallback, useEffect, useState } from 'react';
import type { MenuItem } from '../types';

interface AnalyticsData {
  [url: string]: {
    clicks: number;
    lastClicked: string;
  };
}

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({});

  // Load analytics from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('linkAnalytics');
    if (stored) {
      setAnalytics(JSON.parse(stored));
    }
  }, []);

  // Track a link click
  const trackClick = useCallback((item: MenuItem) => {
    const newAnalytics = { ...analytics };
    const url = item.url;
    
    if (!newAnalytics[url]) {
      newAnalytics[url] = {
        clicks: 0,
        lastClicked: new Date().toISOString()
      };
    }
    
    newAnalytics[url].clicks += 1;
    newAnalytics[url].lastClicked = new Date().toISOString();
    
    // Save to localStorage
    localStorage.setItem('linkAnalytics', JSON.stringify(newAnalytics));
    setAnalytics(newAnalytics);
    
    // Optional: Send to analytics service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'link_click', {
        link_label: item.label,
        link_url: item.url,
        link_description: item.description
      });
    }
  }, [analytics]);

  // Get click count for a specific URL
  const getClickCount = useCallback((url: string): number => {
    return analytics[url]?.clicks || 0;
  }, [analytics]);

  // Get top clicked links
  const getTopLinks = useCallback((limit: number = 5): Array<{ url: string; clicks: number }> => {
    return Object.entries(analytics)
      .map(([url, data]) => ({ url, clicks: data.clicks }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, limit);
  }, [analytics]);

  // Clear all analytics
  const clearAnalytics = useCallback(() => {
    localStorage.removeItem('linkAnalytics');
    setAnalytics({});
  }, []);

  return {
    trackClick,
    getClickCount,
    getTopLinks,
    clearAnalytics,
    analytics
  };
};