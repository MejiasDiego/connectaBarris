import "./App.css";
import React from "react";
import MapComponent from "./components/MapComponent";
import NavBarComponent from "./components/NavBarComponent";
import CineComponent from "./components/CineComponent";


function App() {
	// const [esteMes, setEsteMes] = React.useState(false); //TODO usar esto para los filtros
	// const [tresMeses, setTresMeses] = React.useState(false);
	// const [limpiar, setLimpiar] = React.useState(true);
	const [filterFavoritos, setFilterFavoritos] = React.useState(false);
	const [modoCine, setModoCine] = React.useState(false);
	//const [mapa, setMapa] = React.useState(true);
	//const [mapa, setMapa] = React.useState(true);
	const handleSetFilterFavoritos = () => {
		setFilterFavoritos(!filterFavoritos);
	};
	const handleSetModoCine = () => {
		setModoCine(!modoCine);
	};
  return (
    <div className="appContainer">
      <NavBarComponent
	  	f_modoCine={handleSetModoCine}
	  	f_filterFavoritos={handleSetFilterFavoritos}
		isFilterFavoritos={filterFavoritos}
	/>
	  {
		modoCine ? <CineComponent /> : <MapComponent isFilterFavoritos={filterFavoritos}/>
	  }
    </div>
  );
}

export default App;
