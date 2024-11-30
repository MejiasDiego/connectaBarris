// src/components/MapComponent.tsx
import React from "react";
import { MapContainer, TileLayer, Polygon, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Asegúrate de importar los estilos de Leaflet

import { neighborhoods, events } from "../data/data"; // Importamos los datos

// Corregir iconos para Leaflet (ya que React-Leaflet no lo configura automáticamente)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapComponent: React.FC = () => {
  return (
    <div style={{ height: "80vh" }}>
      <MapContainer
        center={[41.1189, 1.2445]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Capa base de OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Dibujar polígonos para los barrios */}
        {neighborhoods.map((neighborhood, index) => (
          <Polygon
            key={index}
            positions={neighborhood.positions}
            color={neighborhood.color}
            weight={2}
          >
            <Popup>
              <strong>{neighborhood.name}</strong>
              <br />
              Favorito: {neighborhood.isFavorite ? "Sí" : "No"}
            </Popup>
          </Polygon>
        ))}

        {/* Agregar marcadores para los eventos */}
        {events.map((event, index) => (
          <Marker key={index} position={event.coordinates}>
            <Popup>
              <img
                src={event.imageUrl}
                alt={event.name}
                style={{ width: "100px", height: "auto", marginBottom: "8px" }}
              />
              <strong>{event.name}</strong>
              <br />
              {event.description}
              <br />
              Fecha: {new Date(event.date).toLocaleDateString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
