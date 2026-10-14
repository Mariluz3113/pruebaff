"use client";

import { useState, useEffect } from "react";

export default function Recordatorios() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const datos = localStorage.getItem("tareas");
    if (datos) {
      try {
        setTareas(JSON.parse(datos));
      } catch (error) {
        console.error("Error al recuperar tareas:", error);
      }
    }
  }, []);

  function guardar(lista) {
    setTareas(lista);
    localStorage.setItem("tareas", JSON.stringify(lista));
  }

  function agregar() {
    if (!tarea.trim()) return;

    guardar([
      ...tareas,
      { id: Date.now(), texto: tarea.trim(), hecha: false }
    ]);
    setTarea("");
  }

  function completar(id) {
    guardar(tareas.map(t =>
      t.id === id ? { ...t, hecha: !t.hecha } : t
    ));
  }

  function eliminar(id) {
    guardar(tareas.filter(t => t.id !== id));
  }

  return (
    <div className="tarjeta recordatorios">
      <h2>📝 Recordatorios y tareas</h2>

      <div className="agregar-tarea">
        <input
          placeholder="Escribí una tarea..."
          value={tarea}
          onChange={e => setTarea(e.target.value)}
        />
        <button onClick={agregar}>Agregar</button>
      </div>

      {tareas.map(t => (
        <div className="tarea" key={t.id}>
          <input
            type="checkbox"
            checked={t.hecha}
            onChange={() => completar(t.id)}
          />

          <span style={{
            textDecoration: t.hecha ? "line-through" : "none"
          }}>
            {t.texto}
          </span>

          <button onClick={() => eliminar(t.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}
