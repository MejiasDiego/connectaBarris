import React, { useState, useEffect } from "react";
import {
  MapContainer,
  Polygon,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { neighborhoods, events } from "../data/data";

// Configurar icono del marcador personalizado
const customMarkerIcon = new L.Icon({
  iconUrl: "/mapMarker.png", // Cambiado a "mapMarker.png" en la carpeta public
  iconSize: [40, 40], // Tamaño del icono
  iconAnchor: [20, 40], // Punto de anclaje (base del icono)
});

const MapComponent: React.FC = () => {
  // Estado para almacenar los eventos y los marcadores
  const [events, setEvents] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    postalCode: "",
    latitude: "",
    longitude: "",
    file: null as string | null, // Permitir tanto `string` como `null`
    eventId: null as number | null,
  });

  // Cargar eventos desde localStorage al montar el componente
  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents)); // Cargar eventos si están almacenados
    }
  }, []);

  // Guardar eventos en localStorage cada vez que se actualicen
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("events", JSON.stringify(events)); // Guardar eventos en localStorage
    }
  }, [events]);

  // Manejo de clics en el mapa
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        // Verificar si ya hay un marcador en esas coordenadas
        const existingEvent = events.find(
          (event) =>
            event.coordinates[0] === e.latlng.lat &&
            event.coordinates[1] === e.latlng.lng
        );

        if (existingEvent) {
          // Si ya existe un marcador, actualizar el formulario con los datos de ese marcador
          const eventId = events.findIndex(
            (event) =>
              event.coordinates[0] === e.latlng.lat &&
              event.coordinates[1] === e.latlng.lng
          );
          handleMarkerClick(eventId); // Llamamos a la función para editar el evento
        } else {
          // Si no existe un marcador en esas coordenadas, creamos un nuevo evento
          const newEvent = {
            name: "", // Nombre vacío para que el usuario lo complete
            description: "", // Descripción vacía
            date: "", // Fecha vacía
            postalCode: "", // Código postal vacío
            coordinates: [e.latlng.lat, e.latlng.lng] as [number, number],
            imageUrl: "/path/to/default/image.jpg", // Imagen por defecto
          };

          // Agregar el nuevo evento (marcador) al estado "events"
          //setEvents((prevEvents) => [...prevEvents, newEvent]);

          // Actualizar el formulario con las coordenadas del clic
          setFormData({
            ...formData,
            latitude: e.latlng.lat.toString(),
            longitude: e.latlng.lng.toString(),
            eventId: null, // Se asigna null para nuevos eventos
          });

          // Abrir el formulario para ingresar el nuevo marcador
          openFormForNewEvent();
        }
      },
    });

    return null;
  };

  // Función para abrir el formulario al crear un nuevo evento
  const openFormForNewEvent = () => {
    setShowForm(true); // Muestra el formulario
  };

  // Mostrar los datos del evento al hacer clic en un marcador
  const handleMarkerClick = (eventId: number) => {
    const event = events[eventId];
    setFormData({
      name: event.name,
      description: event.description,
      date: event.date,
      postalCode: event.postalCode,
      latitude: event.coordinates[0].toString(),
      longitude: event.coordinates[1].toString(),
      file: event.imageUrl, // Mostrar la URL de la imagen en el formulario al hacer clic en un marcador
      eventId, // Al hacer clic en el marcador, podemos editar este evento
    });
    setShowForm(true); // Mostrar el formulario para editar
  };

  // Manejar cambios en los campos del formulario
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejar la carga de imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Crear un URL temporal para la imagen
      setFormData((prevData) => ({
        ...prevData,
        file: imageUrl, // Aquí estamos asignando un string (URL de la imagen)
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        file: null, // Si no hay archivo, asignamos null
      }));
    }
  };

  // Manejar el envío del formulario (añadir o editar un evento)
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificar que todos los campos obligatorios están completos antes de guardar
    if (
      !formData.name ||
      !formData.description ||
      !formData.date ||
      !formData.postalCode
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const newEvent = {
      name: formData.name,
      description: formData.description,
      date: formData.date,
      postalCode: formData.postalCode,
      coordinates: [
        parseFloat(formData.latitude),
        parseFloat(formData.longitude),
      ] as [number, number],
      imageUrl: formData.file || "/path/to/default/image.jpg", // Usar la imagen seleccionada o la predeterminada
    };

    if (formData.eventId === null) {
      // Si estamos creando un nuevo evento
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    } else {
      // Si estamos editando un evento existente
      const updatedEvents = events.map((event, index) =>
        index === formData.eventId ? newEvent : event
      );
      setEvents(updatedEvents);
    }

    setShowForm(false); // Ocultar el formulario después de guardar
    setFormData({
      name: "",
      description: "",
      date: "",
      postalCode: "",
      latitude: "",
      longitude: "",
      file: null,
      eventId: null,
    });
  };

  // Eliminar un evento
  const handleDeleteEvent = (eventId: number) => {
    // Eliminar el evento del estado "events"
    const updatedEvents = events.filter((_, index) => index !== eventId);
	localStorage.setItem("events", JSON.stringify(updatedEvents));
    setEvents(updatedEvents);

    // Cerrar el formulario y limpiar la posición del marcador
    setShowForm(false);
    setFormData({
      name: "",
      description: "",
      date: "",
      postalCode: "",
      latitude: "",
      longitude: "",
      file: null,
      eventId: null,
    });
  };

  // Cerrar el formulario
  const closeForm = () => {
    setShowForm(false);
    setFormData({
      name: "",
      description: "",
      date: "",
      postalCode: "",
      latitude: "",
      longitude: "",
      file: null,
      eventId: null,
    });

    // Si el evento no ha sido guardado (formulario incompleto), eliminar el marcador
    if (formData.eventId === null) {
      setEvents((prevEvents) =>
        prevEvents.filter(
          (event) =>
            event.coordinates[0] !== parseFloat(formData.latitude) ||
            event.coordinates[1] !== parseFloat(formData.longitude)
        )
      );
    }
  };

  return (
    <div style={{ height: "80vh" }}>
      <MapContainer
        center={[41.1189, 1.2445]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <MapClickHandler />

          {/* Dibujar polígonos para los barrios */}
          {neighborhoods.map((neighborhood, index) => (
          <Polygon
            key={index}
            positions={neighborhood.positions}
            color={neighborhood.color}
            weight={2}
          >
          </Polygon>
        ))}

        {events.map((event, index) => (
          <Marker
            key={index}
            position={event.coordinates}
            icon={customMarkerIcon}
          >
            <Popup>
              <img
                src={event.imageUrl}
                alt={event.name}
                className="popupImage" // Aplica la clase aquí para hacer la imagen más grande
              />
              <strong>{event.name}</strong>
              <br />
              {event.description}
              <br />
              Fecha: {new Date(event.date).toLocaleDateString()}
              <br />
              <button onClick={() => handleMarkerClick(index)}>Editar</button>
              <button onClick={() => handleDeleteEvent(index)}>Eliminar</button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background: "white",
            padding: "20px",
            zIndex: 9999,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          <h2>
            {formData.eventId === null ? "Nuevo Evento" : "Editar Evento"}
          </h2>
          <div style={{ marginBottom: "10px" }}>
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Descripción:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Fecha:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Código Postal:</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              required
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Imagen del Evento:</label>
            <input
              type="file"
              name="file"
              onChange={handleImageChange}
              accept="image/*" // Esto asegura que solo se puedan seleccionar imágenes
            />
            {formData.file && (
              <div>
                <img
                  src={formData.file}
                  alt="Preview"
                  style={{ maxWidth: "200px", marginTop: "10px" }}
                />
              </div>
            )}
          </div>
          <div>
            <button type="submit">Guardar</button>
            <button type="button" onClick={closeForm}>
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MapComponent;
