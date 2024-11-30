import "./App.css";
import React from "react";
import MapComponent from "./components/MapComponent";
import NavBarComponent from "./components/NavBarComponent";
import CineComponent from "./components/CineComponent";

import { Event, events } from "./data/data"; // Asegúrate de que la interfaz Event esté correctamente importada


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


  const storedEvents = JSON.parse(localStorage.getItem("events") || "[]"); // Manejo de null o undefined en localStorage

  if (!Array.isArray(storedEvents)) {
    console.log("algo va mal");
  }
  if (storedEvents.length < 1) {
    console.log("vamo a carga eventoooooooooooooooooosouuu");
	console.log(events);
	localStorage.setItem("events", JSON.stringify(events))
  }


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
