// Configuration for links and tabs
import type { MenuItem, TabKey } from "../types";

export const linksConfig: Record<TabKey, MenuItem[]> = {
  "My projects": [
    { 
      label: "Portfolio – My Lab", 
      url: "https://hacklab.dog",
      description: "My personal portfolio and experiments"
    },
    { 
      label: "Blog – Read my thoughts", 
      url: "https://blog.hacklab.dog",
      description: "Technical articles and insights"
    },
    { 
      label: "SalaryBoard - explore IT salaries around LATAM", 
      url: "https://salaries.hacklab.dog",
      description: "Open salary data for tech professionals"
    },
    { 
      label: "Dripnex – Minimal wallet", 
      url: "https://dripnex.app",
      description: "Simple and secure crypto wallet"
    },
  ],
  "Dev Resources": [
    // AI Coding Tools
    { 
      label: "Cursor – AI-first code editor", 
      url: "https://cursor.sh/",
      description: "The AI code editor leading the market"
    },
    { 
      label: "v0 by Vercel – AI UI generation", 
      url: "https://v0.dev/",
      description: "Generate UI components with AI"
    },
    { 
      label: "GitHub Copilot", 
      url: "https://github.com/features/copilot",
      description: "Your AI pair programmer"
    },
    
    // Learning & Documentation
    { 
      label: "MDN Web Docs", 
      url: "https://developer.mozilla.org/",
      description: "The bible of web development"
    },
    { 
      label: "freeCodeCamp", 
      url: "https://www.freecodecamp.org/",
      description: "Learn to code for free"
    },
    { 
      label: "Refactoring UI", 
      url: "https://refactoringui.com/",
      description: "Learn UI design from developers"
    },
    
    // Practice & Challenges
    { 
      label: "LeetCode", 
      url: "https://leetcode.com/",
      description: "Coding interview preparation"
    },
    { 
      label: "Frontend Mentor", 
      url: "https://www.frontendmentor.io/",
      description: "Real-world frontend challenges"
    },
    { 
      label: "Exercism", 
      url: "https://exercism.org/",
      description: "Code practice and mentorship"
    },
    
    // Design Tools
    { 
      label: "Figma", 
      url: "https://www.figma.com/",
      description: "Collaborative design tool"
    },
    { 
      label: "Webflow", 
      url: "https://webflow.com/",
      description: "Visual web development platform"
    },
    { 
      label: "Coolors", 
      url: "https://coolors.co/",
      description: "Color scheme generator"
    },
    
    // Development Tools
    { 
      label: "Ray.so", 
      url: "https://ray.so/",
      description: "Create beautiful code snippets"
    },
    { 
      label: "Bundlephobia", 
      url: "https://bundlephobia.com/",
      description: "Find the cost of npm packages"
    },
    { 
      label: "Can I Use", 
      url: "https://caniuse.com/",
      description: "Browser compatibility tables"
    },
    
    // Community & Inspiration
    { 
      label: "Dev.to", 
      url: "https://dev.to/",
      description: "Community of developers"
    },
    { 
      label: "Stack Overflow", 
      url: "https://stackoverflow.com/",
      description: "Q&A for programmers"
    },
    { 
      label: "Awwwards", 
      url: "https://www.awwwards.com/",
      description: "Web design inspiration"
    },
  ],
  "UI Lover": [
    { 
      label: "Fonts Arena – Free fonts", 
      url: "https://fontsarena.com/",
      description: "Curated collection of free fonts"
    },
    { 
      label: "Coolors – Palette generator", 
      url: "https://coolors.co/",
      description: "Super fast color scheme generator"
    },
    { 
      label: "Laws of UX – UX principles", 
      url: "https://lawsofux.com/",
      description: "Collection of UX design principles"
    },
    { 
      label: "Glassmorphism Generator", 
      url: "https://hype4.academy/tools/glassmorphism-generator",
      description: "Create glassmorphism CSS effects"
    },
  ],
};

// Tab configuration
export const tabsConfig = {
  defaultTab: "My projects" as TabKey,
  tabs: ["My projects", "Dev Resources", "UI Lover"] as TabKey[],
};