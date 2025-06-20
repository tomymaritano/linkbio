
import './App.css'
import ListComponent from './components/ListComponent';
import Profile from './components/Profile'
import SocialMedia from './components/SocialMedia';

function App() {
  return (
    <div
      className="bg-[#161B22] flex justify-center items-center p-4"
      style={{
        backgroundImage: "url('/background.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col gap-5 justify-center items-center w-full  max-w-md min-h-screen py-12">
        <Profile />
        <ListComponent />
        <SocialMedia />
      </div>
    </div>
  );
}

export default App
