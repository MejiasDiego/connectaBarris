import React from "react";
import ButtonComponent from "./ButtonComponent";

type NavProps = {
  f_modoCine: () => void;
  f_filterFavoritos: () => void;
  isFilterFavoritos: boolean;
};

const NavBar: React.FC<NavProps> = (p) => {
  return (
    <div className="navbar-container">
      {/* Logo */}
      <div className="navbar-logo">
        <img
          src="/img/logoAvatar.jpg" // Cambia esto por la ruta de tu logo
          alt="Tarragona Connect Barri"
          style={{ height: "50px" }}
        />
      </div>

      {/* Input de Fecha y Búsqueda */}
      <div className="navbar-search">
        <label>
          Fecha Inicio:{" "}
          <input
            type="date"
            className="navbar-input"
          />
        </label>
        <label>
          Fecha Fin:{" "}
          <input
            type="date"
            className="navbar-input"
          />
        </label>
        <input
          type="text"
          placeholder="Search for event..."
          className="navbar-input"
        />
      </div>

      {/* Botones */}
      <div className="navbar-buttons">
        <ButtonComponent texto="ESTE MES" className="navbar-button" />
        <ButtonComponent texto="3 MESES" className="navbar-button" />
        <ButtonComponent texto="LIMPIAR" className="navbar-button" />
        <ButtonComponent
          texto={
            p.isFilterFavoritos ? "FAVORITOS (enabled)" : "FAVORITOS (disabled)"
          }
          click_event={p.f_filterFavoritos}
          className="navbar-button"
        />
        <ButtonComponent
          texto="MODO CINE 🎥"
          click_event={p.f_modoCine}
          className="navbar-button"
        />
        <ButtonComponent texto="ACTIVAR SONIDO 🔊" className="navbar-button" />
      </div>
    </div>
  );
};

export default NavBar;
