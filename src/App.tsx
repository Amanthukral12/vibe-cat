import MusicPlayer from "./components/MusicPlayer";
import Navbar from "./components/Navbar";
import VibeCat from "./components/VibeCat";

function App() {
  return (
    <div className="min-h-full w-full">
      <Navbar />
      <VibeCat />
      <MusicPlayer />
    </div>
  );
}

export default App;
