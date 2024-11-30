import React from "react";

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
        <button
          style={{
            padding: "10px 15px",
            backgroundColor: "#FFD700",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ESTE MES
        </button>
        <button
          style={{
            padding: "10px 15px",
            backgroundColor: "#FFD700",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          3 MESES
        </button>
        <button
          style={{
            padding: "10px 15px",
            backgroundColor: "#FFD700",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          LIMPIAR
        </button>
        <button
          style={{
            padding: "10px 15px",
            backgroundColor: "#FFD700",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          VER FAVORITOS
        </button>
        <button
          style={{
            padding: "10px 15px",
            backgroundColor: "#FFD700",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          MODO CINE 🎥
        </button>
        <button
          style={{
            padding: "10px 15px",
            backgroundColor: "#FFD700",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ACTIVAR SONIDO 🔊
        </button>
      </div>
    </div>
  );
};

export default NavBar;
