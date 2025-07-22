import './App.css'
import './index.css'
import './styles/accessibility.css'
import './styles/layout.css'
import { useRef } from 'react';
import ListComponent from './components/ListComponent';
import type { ListComponentRef } from './components/ListComponent';
import Profile from './components/Profile';
import SocialMedia from './components/SocialMedia';
import { ThemeTransitionWrapper } from './components/ThemeTransitionWrapper';
import Meta from './components/Meta';
import VantaBackground from './components/VantaBackground';
import ErrorBoundary from './components/ErrorBoundary';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import { KeyboardHints } from './components/KeyboardHints';
import { ToastProvider } from './hooks/useToast';

function App() {
  const listComponentRef = useRef<ListComponentRef>(null);
  
  // Enable keyboard navigation
  useKeyboardNavigation({
    onSearch: () => listComponentRef.current?.openSearch()
  });
  
  return (
    <ThemeTransitionWrapper>
      <ToastProvider>
        <Meta />
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      
      {/* Main Layout Container */}
      <div className="relative bg-white/90 dark:bg-[#161B22] transition-colors duration-500">
        {/* Background Effect */}
        <VantaBackground className="fixed inset-0 z-0" aria-hidden="true" />
        
        {/* Content Layer */}
        <div className="relative z-10 layout-grid">
          <main 
            id="main-content"
            className="container flex flex-col h-full max-h-[85vh]"
            role="main"
          >
            {/* Header Section */}
            <header role="banner" className="py-4 sm:py-6 flex-shrink-0">
              <Profile />
            </header>
            
            {/* Main Content Area */}
            <div className="content-area flex-1 min-h-0 flex flex-col">
              <nav role="navigation" aria-label="Links and resources" className="flex-1 min-h-0 flex flex-col">
                <ErrorBoundary>
                  <ListComponent ref={listComponentRef} />
                </ErrorBoundary>
              </nav>
            </div>
            
            {/* Footer Section */}
            <footer role="contentinfo" className="py-3 sm:py-4 flex-shrink-0">
              <SocialMedia />
            </footer>
          </main>
        </div>
      </div>
      
      {/* Keyboard shortcuts hint */}
      <KeyboardHints />
      </ToastProvider>
    </ThemeTransitionWrapper>
  );
}

export default App;