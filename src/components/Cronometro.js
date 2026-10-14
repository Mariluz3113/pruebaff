"use client";

import { useState, useEffect } from "react";

export default function Cronometro() {
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);
  const [nombre, setNombre] = useState("");

 // Recuperar las sesiones guardadas
  const [historial, setHistorial] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const guardado = localStorage.getItem("historialEstudio");
        if (guardado) {
          const datos = JSON.parse(guardado);
          if (Array.isArray(datos)) return datos;
        }
      } catch (error) {
        console.error("Error al recuperar historial:", error);
      }
    }
    return [];
  });

  // Actualizar el cronómetro cada segundo
  useEffect(() => {
    if (!activo) return;

    const intervalo = setInterval(() => {
      setSegundos((anterior) => anterior + 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [activo]);

  // Convertir segundos en horas, minutos y segundos
  function formatearTiempo(total) {
    const horas = Math.floor(total / 3600);
    const minutos = Math.floor((total % 3600) / 60);
    const seg = total % 60;

    return [horas, minutos, seg]
      .map((numero) => String(numero).padStart(2, "0"))
      .join(":");
  }

  // Guardar una sesión de estudio
  function guardarSesion() {
    if (!nombre.trim()) {
      alert("Escribí un nombre para la sesión.");
      return;
    }

    if (segundos === 0) {
      alert("Primero tenés que estudiar unos segundos.");
      return;
    }

    const nuevaSesion = {
      id: Date.now(),
      nombre: nombre.trim(),
      duracion: segundos,
      fecha: new Date().toLocaleDateString("es-AR"),
    };

    const nuevoHistorial = [nuevaSesion, ...historial];

    try {
      localStorage.setItem(
        "historialEstudio",
        JSON.stringify(nuevoHistorial)
      );

      setHistorial(nuevoHistorial);
      setSegundos(0);
      setActivo(false);
      setNombre("");
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("No se pudo guardar la sesión.");
    }
  }
  
  function eliminarSesion(id) {
    const nuevoHistorial = historial.filter( //crea una lista sin la sesión que querés eliminar.
      sesion => sesion.id !== id
    );

    localStorage.setItem( //actualiza los datos guardados.
      "historialEstudio",
      JSON.stringify(nuevoHistorial)
    );

    setHistorial(nuevoHistorial); //actualiza lo que aparece en pantalla.
  }
  
  return (
    <div className="contenedor-estudio">

      <div className="tarjeta">
        <h2>⏱ Cronómetro de estudio</h2>

        <h3>
          {Math.floor(segundos / 60)} min {segundos % 60} seg
        </h3>
        
        <div className="botones-crono">
          <button onClick={() => setActivo(true)}>Iniciar</button>
          <button onClick={() => setActivo(false)}>Pausar</button>
          <button onClick={() => {setActivo(false); setSegundos(0); }}> Reiniciar </button>
        </div>

        <div>
          <input
            placeholder="Nombre de la sesión"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
          <button onClick={guardarSesion}>Guardar</button>
        </div>
      </div>
    </div>
  );
}
