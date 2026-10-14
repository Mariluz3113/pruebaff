import Cronometro from "../components/Cronometro.js";
import FechaHora from "../components/FechaHora.js";
import Recordatorios from "../components/Recordatorio.js";
import Materias from "../components/AgregarMateria.js";
import FraseMotivacional from "../components/FraseMotivacional.js";
import Historial from "@/components/Historial.js";
import Image from "next/image"

export default function Home() /*componente principal-server component*/ {
  return (
    <main className="contenedor">
      <header className="encabezado">
        <h1>Mi Espacio ✦</h1>
        <p>Organizá tus materias y estudiá mejor</p>
        <Image
          src="/estudio.png"
          alt="Escritorio de estudio"
          width={180}
          height={180}
          className="imagen-estudio"
        />
      </header>

      <section className="fila-informacion">
          <FraseMotivacional /> {/*consumir una API externa mediante una Server Action*/}
          <FechaHora /> {/*mostrar fecha y hora*/}
      </section>

      <section className="fila-superior">
        <Cronometro /> {/*contar y guardar tiempos de estudio con nombre e historial*/}
        <Historial/>
        <Recordatorios/> {/*lista general de tareas.*/}
      </section>

      <section className="seccion-materias">
        <Materias /> {/*agregar materias y mostrar tarjetas con notas propias.*/}
      </section>
      
    </main>
  );
}
