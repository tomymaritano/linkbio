// src/components/Meta.tsx
import { useEffect } from "react";
import { profileConfig, siteConfig } from "../config";

type MetaProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

const defaultMeta = {
  title: profileConfig.meta.title,
  description: profileConfig.meta.description,
  image: profileConfig.image.src,
  url: siteConfig.url,
};

export default function Meta({
  title = defaultMeta.title,
  description = defaultMeta.description,
  image = defaultMeta.image,
  url = defaultMeta.url,
}: MetaProps) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (selector: string, content: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        const attributes = selector.match(/\[([^=]+)="([^"]+)"\]/);
        if (attributes) {
          element.setAttribute(attributes[1], attributes[2]);
        }
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Update meta tags
    updateMetaTag('meta[name="description"]', description);
    
    // Open Graph
    updateMetaTag('meta[property="og:type"]', 'website');
    updateMetaTag('meta[property="og:site_name"]', siteConfig.name);
    updateMetaTag('meta[property="og:title"]', title);
    updateMetaTag('meta[property="og:description"]', description);
    updateMetaTag('meta[property="og:image"]', image);
    updateMetaTag('meta[property="og:url"]', url);
    
    // Twitter
    updateMetaTag('meta[name="twitter:card"]', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', title);
    updateMetaTag('meta[name="twitter:description"]', description);
    updateMetaTag('meta[name="twitter:image"]', image);
    updateMetaTag('meta[name="twitter:url"]', url);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

  }, [title, description, image, url]);

  return null;
}