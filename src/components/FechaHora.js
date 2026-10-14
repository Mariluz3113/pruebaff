"use client";

import { useState, useEffect } from "react";

export default function FechaHora() {
  const [fecha, setFecha] = useState(null);

  useEffect(() => {
    setFecha(new Date());

    const intervalo = setInterval(() => {
      setFecha(new Date());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className= "tarjeta">
      <h2>📅 Fecha y hora</h2>

      <p>{fecha?.toLocaleDateString("es-AR")}</p>
      <p>{fecha?.toLocaleTimeString("es-AR")}</p>
    </div>
  );
}
