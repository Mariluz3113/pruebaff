"use client";

import { useState, useEffect } from "react";

export default function AgregarMateria() {
  const [nombre, setNombre] = useState("");
  const [temas, setTemas] = useState("");
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    const datos = localStorage.getItem("materias");
    if (datos) {
      try {
        const lista = JSON.parse(datos);
        if (Array.isArray(lista)) setMaterias(lista);
      } catch (error) {
        console.error("Error al cargar materias:", error);
      }
    }
  }, []);

  function guardar(lista) {
    localStorage.setItem("materias", JSON.stringify(lista));
    setMaterias(lista);
  }

  function agregar() { // crea una materia
    if (!nombre.trim()) return;

    guardar([
      ...materias,
      {
        id: Date.now(),
        nombre: nombre.trim(),
        temas: temas.trim(),
        notas: ""
      }
    ]);

    setNombre("");
    setTemas("");
  }

  function cambiarNota(id, texto) { //actualiza las notas de una materia especifica
    guardar(materias.map(m =>
      m.id === id ? { ...m, notas: texto } : m
    ));
  }

  function eliminar(id) { // borra la materia seleccionada
    guardar(materias.filter(m => m.id !== id));
  }

  return (
    <div className="materias">
      <h2>📚 Mis materias</h2>

      <div className="formulario-materia">
        <input
          placeholder="Nombre de la materia"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />

        <input
          placeholder="Temas separados por comas"
          value={temas}
          onChange={e => setTemas(e.target.value)}
        />

        <button onClick={agregar}>Agregar materia</button>
      </div>

      <div className="lista-materias">
        {materias.map(m => ( // recorre las materias y crea automaticamente una tarjeta por cada una.
          <div className="tarjeta-materia" key={m.id}>
            <h3>{m.nombre}</h3>
            <p>{m.temas}</p>

            <h4>📝 Mis notas</h4>

            <textarea
              placeholder="Escribí tus notas..."
              value={m.notas}
              onChange={e => cambiarNota(m.id, e.target.value)}
            />

            <button onClick={() => eliminar(m.id)}>
              Eliminar materia
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
