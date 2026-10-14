"use client";

import { useState } from "react";
import { obtenerFrase } from "@/app/frase.actions";

export default function FraseMotivacional() {
  const [frase, setFrase] = useState(null);
  const [cargando, setCargando] = useState(false);

  async function buscarFrase() {
    setCargando(true);

    try {
      const resultado = await obtenerFrase();

      if (resultado.error) {
        setFrase(resultado);
      } else {
        // Guardamos directamente el resultado sin importar fechas ni localStorage
        setFrase(resultado);
      }
    } catch {
      setFrase({ error: "No se pudo obtener la frase." });
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="tarjeta motivacion">
      <h2>✨ Motivación</h2>

      {frase?.frase ? (
        <div>
          <p>{frase.frase}</p>
          <small>— {frase.autor}</small>
          
          {/* Botón para pedir otra frase inmediatamente */}
          <button 
            onClick={buscarFrase} 
            disabled={cargando}
            style={{ marginTop: "1rem", display: "block" }}
          >
            {cargando ? "Cargando..." : "Obtener otra frase"}
          </button>
        </div>
      ) : (
        <>
          {frase?.error && <p className="error">{frase.error}</p>}

          <button
            onClick={buscarFrase}
            disabled={cargando}
          >
            {cargando ? "Cargando..." : "Obtener frase"}
          </button>
        </>
      )}
    </div>
  );
}
