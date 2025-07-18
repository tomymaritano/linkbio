import './App.css'
import './index.css'
import ListComponent from './components/ListComponent';
import Profile from './components/Profile';
import SocialMedia from './components/SocialMedia';
import { ThemeTransitionWrapper } from './components/ThemeTransitionWrapper';
import Meta from './components/Meta';

function App() {
  return (
    <ThemeTransitionWrapper>
<Meta />
      <div className="relative bg-white/90 dark:bg-[#161B22] min-h-screen flex justify-center items-center p-4 overflow-hidden transition-colors duration-500">
        {/* Fondo animado */}
        <div
          className="absolute inset-0 animate-[pulse_10s_ease-in-out_infinite] opacity-10 blur-xl pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at center, #6366f1 0%, transparent 70%)',
          }}
        />

        {/* Contenido */}
        <div className="flex flex-col gap-7 justify-center items-center w-full max-w-xl py-12 z-10">
          <Profile />
          <ListComponent />
          <SocialMedia />
        </div>
      </div>
    </ThemeTransitionWrapper>
  );
}

export default App;