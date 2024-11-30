import "./App.css";
import MapComponent from "./components/MapComponent";
import NavBarComponent from "./components/NavBarComponent";
function App() {
  return (
    <div className="appContainer">
      <NavBarComponent />
      <MapComponent />
    </div>
  );
}

export default App;
