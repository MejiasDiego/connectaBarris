// src/components/MapComponent.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Asegúrate de importar los estilos de Leaflet

// Componente de Mapa
const MapComponent = () => {
  return (
    <div style={{ height: '80vh' }}>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
        {/* Capa de tiles con OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Marcador con un Popup */}
        <Marker position={[51.505, -0.09]}>
          <Popup>
            ¡Un marcador en el mapa! Aquí puedes agregar más contenido.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
