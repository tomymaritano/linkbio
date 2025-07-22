// Servicio de link preview que funciona sin API keys
// Nota: Debido a restricciones CORS, esto funcionará mejor con un proxy o función serverless

interface LinkPreviewData {
  title?: string;
  description?: string;
  image?: string;
  url: string;
}

// Cache en memoria para evitar múltiples requests
const previewCache = new Map<string, LinkPreviewData>();

// Fallback data para sitios populares que bloquean CORS
const fallbackData: Record<string, Partial<LinkPreviewData>> = {
  'github.com': {
    title: 'GitHub',
    description: 'Where the world builds software',
    image: 'https://github.githubassets.com/images/modules/site/social-cards/github-social.png'
  },
  'linkedin.com': {
    title: 'LinkedIn',
    description: 'Connect with professionals',
    image: 'https://static.licdn.com/aero-v1/sc/h/al2o9zrvru7aqj8e1x2rzsrca'
  },
  'twitter.com': {
    title: 'Twitter',
    description: 'What\'s happening?',
    image: 'https://abs.twimg.com/icons/apple-touch-icon-192x192.png'
  },
  'x.com': {
    title: 'X',
    description: 'What\'s happening?',
    image: 'https://abs.twimg.com/icons/apple-touch-icon-192x192.png'
  }
};

export async function getLinkPreview(url: string): Promise<LinkPreviewData | null> {
  try {
    // Check cache first
    if (previewCache.has(url)) {
      return previewCache.get(url)!;
    }

    // Try to fetch from Vercel Function
    try {
      const response = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`);
      if (response.ok) {
        const data = await response.json();
        previewCache.set(url, data);
        return data;
      }
    } catch (fetchError) {
      // Vercel function not available in development, using fallback
    }

    // Extract domain for fallback
    const domain = new URL(url).hostname.replace('www.', '');
    
    // Try to use fallback data for known sites
    const fallback = Object.entries(fallbackData).find(([key]) => 
      domain.includes(key)
    );

    if (fallback) {
      const data = {
        url,
        ...fallback[1]
      } as LinkPreviewData;
      
      previewCache.set(url, data);
      return data;
    }

    // For other sites, return basic data
    const basicData: LinkPreviewData = {
      url,
      title: new URL(url).hostname,
      description: 'Visit website for more information'
    };

    previewCache.set(url, basicData);
    return basicData;

  } catch (error) {
    console.error('Error fetching link preview:', error);
    return null;
  }
}

// Clear cache periodically (every 30 minutes)
setInterval(() => {
  previewCache.clear();
}, 30 * 60 * 1000);