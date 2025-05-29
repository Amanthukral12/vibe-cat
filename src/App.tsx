import ChatComponent from "./components/ChatComponent";
import Leaderboard from "./components/Leaderboard";
import MusicPlayer from "./components/MusicPlayer";
import Navbar from "./components/Navbar";
import VibeCat from "./components/VibeCat";

function App() {
  return (
    <div className="min-h-full w-full">
      <Navbar />
      <VibeCat />
      <MusicPlayer />
      <div className="flex w-3/5 mx-auto">
        <Leaderboard />
        <ChatComponent />
      </div>
    </div>
  );
}

export default App;
