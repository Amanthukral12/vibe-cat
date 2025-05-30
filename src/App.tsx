import ChatComponent from "./components/ChatComponent";
import Footer from "./components/Footer";
import Leaderboard from "./components/Leaderboard";
import MusicPlayer from "./components/MusicPlayer";
import Navbar from "./components/Navbar";
import RotatingGlobe from "./components/RotatingGlobe";

import VibeCat from "./components/VibeCat";
import VibeTrail from "./components/VibeTrail";

function App() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <VibeTrail />
      <Navbar />
      <VibeCat />
      <MusicPlayer />
      <div className="flex flex-col md:flex-row w-4/5 md:w-3/5 mx-auto flex-grow">
        <Leaderboard />
        <ChatComponent />
      </div>
      <RotatingGlobe />
      <Footer />
    </div>
  );
}

export default App;
