import Header from "./components/Header";
import CurrentTiles from "./components/CurrentTiles";
import TileGrid from "./components/TileGrid.js"

function App() {
  return (
    <div>
      <Header></Header>
      <TileGrid></TileGrid>
      <CurrentTiles></CurrentTiles>
    </div>
  );
}

export default App;
