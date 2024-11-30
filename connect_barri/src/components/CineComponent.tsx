import React from "react";
import EventCardComponent from "./EventCardComponent"; // Importa el nuevo componente



const CineComponent: React.FC = () => {
  const events = JSON.parse(localStorage.getItem("events") || "[]"); // Manejo de null o undefined en localStorage

  if (!Array.isArray(events)) {
    return <p>No hay eventos disponibles</p>;
  }
  console.log(events);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {events.map((ev, idx) => (
        <EventCardComponent key={idx} event={ev} />
      ))}
    </div>
  );
};

export default CineComponent;
