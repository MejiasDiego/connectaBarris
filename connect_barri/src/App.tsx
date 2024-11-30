import "./App.css";
import MapComponent from "./components/MapComponent";
import NavBarComponent from "./components/NavBarComponent";

function App() {
	let modoMapa: Boolean = true;
	// const content = ;
  return (
    <div className="appContainer">
      <NavBarComponent />
	  {
		modoMapa ? <MapComponent /> : "ALLALALALALALA"
	  }
    </div>
  );
}

export default App;
