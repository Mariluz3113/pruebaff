"use client";

import { useEffect, useState } from "react";

export default function Historial() {
  const [historial, setHistorial] = useState([]);

  function cargarHistorial() {
    const datos = localStorage.getItem("historialEstudio");
    if (datos) {
      try {
        setHistorial(JSON.parse(datos));
      } catch (error) {
        console.error("Error al cargar historial:", error);
      }
    } else {
      setHistorial([]);
    }
  }

  useEffect(() => {
    cargarHistorial();

    window.addEventListener("actualizarHistorial", cargarHistorial);

    return () => {
      window.removeEventListener("actualizarHistorial", cargarHistorial);
    };
  }, []);

  function eliminarSesion(id) {
    const nuevoHistorial = historial.filter((sesion) => sesion.id !== id);
    localStorage.setItem("historialEstudio", JSON.stringify(nuevoHistorial));
    setHistorial(nuevoHistorial);
  }

  return (
    <div className="tarjeta">
      <h2>📚 Historial de estudio</h2>

      {historial.length === 0 ? (
        <p>No hay sesiones guardadas.</p>
      ) : (
        historial.map((sesion) => (
          <div className="sesion" key={sesion.id}>
            <p>
              {sesion.nombre}: {Math.floor(sesion.duracion / 60)} min{" "}
              {sesion.duracion % 60} seg - {sesion.fecha}
            </p>
            <button className="boton-eliminar" onClick={() => eliminarSesion(sesion.id)}>Eliminar</button>
          </div>
        ))
      )}
    </div>
  );
}