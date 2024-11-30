import React from "react";


import ButtonComponent from "./ButtonComponent";


const NavBar: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "#F0D8A8",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        borderBottom: "1px solid #ccc",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src="/logo.png" // Cambia esto por la ruta de tu logo
          alt="Tarragona Connect Barri"
          style={{ height: "50px" }}
        />
      </div>

      {/* Input de Fecha y Búsqueda */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <label>
          Fecha Inicio:{" "}
          <input
            type="date"
            style={{
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </label>
        <label>
          Fecha Fin:{" "}
          <input
            type="date"
            style={{
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </label>
        <input
          type="text"
          placeholder="Search for event..."
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "200px",
          }}
        />
      </div>

      {/* Botones */}
      <div style={{ display: "flex", gap: "10px" }}>

		<ButtonComponent texto="ESTE MES" />
		<ButtonComponent texto="3 MESES" />
		<ButtonComponent texto="LIMPIAR" />
		<ButtonComponent texto="FAVORITOS" />
		<ButtonComponent texto="MODO CINE 🎥" />
		<ButtonComponent texto="ACTIVAR SONIDO 🔊" />
      </div>
    </div>
  );
};

export default NavBar;
