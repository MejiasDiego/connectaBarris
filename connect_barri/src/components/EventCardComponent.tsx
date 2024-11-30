import React from "react";
import { Event } from "../data/data"; // Asegúrate de que la interfaz Event esté correctamente importada

type Props = {
  event: Event;
};

const EventCardComponent: React.FC<Props> = ({ event }) => {
  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        overflow: "hidden",
        maxWidth: "400px",
        margin: "0 auto",
        backgroundColor: "#fff",
      }}
    >
      {/* Imagen del evento */}
      <img
        src={event.imageUrl}
        alt={event.name}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />

      {/* Contenido */}
      <div style={{ padding: "16px" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            margin: "0 0 8px",
            color: "#333",
          }}
        >
          {event.name}
        </h2>
        <p style={{ margin: "0 0 16px", color: "#555" }}>{event.description}</p>

        <p style={{ margin: "0 0 8px", fontSize: "0.9rem", color: "#777" }}>
          <strong>Fecha:</strong> {new Date(event.date).toLocaleDateString()}
        </p>
        <p style={{ margin: "0 0 8px", fontSize: "0.9rem", color: "#777" }}>
          <strong>Código Postal:</strong> {event.postalCode}
        </p>
        <p style={{ margin: "0 0 8px", fontSize: "0.9rem", color: "#777" }}>
          <strong>Coordenadas:</strong> {event.coordinates[0]}, {event.coordinates[1]}
        </p>

        {/* Indicador de favorito */}
        {event.isFavorite && (
          <span
            style={{
              display: "inline-block",
              padding: "4px 8px",
              backgroundColor: "#ffd700",
              color: "#333",
              fontSize: "0.8rem",
              fontWeight: "bold",
              borderRadius: "8px",
            }}
          >
            Favorito
          </span>
        )}
      </div>
    </div>
  );
};

export default EventCardComponent;