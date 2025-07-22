// Central configuration export
export * from './profile';
export * from './links';
export * from './social';

// Site-wide configuration
export const siteConfig = {
  // Site metadata
  name: "LinkBio",
  description: "My personal link bio page",
  url: "https://linkbio.hacklab.dog",
  
  // Theme configuration
  theme: {
    defaultTheme: "light" as "light" | "dark",
    storageKey: "theme",
  },
  
  // Animation configuration
  animations: {
    staggerDelay: 0.03,
    transitionDuration: 0.2,
    hoverScale: 1.1,
    tapScale: 0.95,
  },
  
  // Layout configuration
  layout: {
    maxWidth: "max-w-xl",
    maxItemsHeight: "max-h-[60vh]",
  },
  
  // API configuration (if needed in the future)
  api: {
    linkPreviewEndpoint: "/api/link-preview",
  }
};