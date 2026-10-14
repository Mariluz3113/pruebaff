"use server"; //indica a q la funcion se ejecua en el servidor

export async function obtenerFrase() { //realza operaciones asincronicas
  try {
    const respuesta = await fetch( //hace la peticion a la API externa - espera la respuesta antes de continuar
      "https://dummyjson.com/quotes/random", // api externo para obtener frases aleatorios
      { cache: "no-store" }
    );

    if (!respuesta.ok) { // comprueba si la respuesta HTTP fue exitosa
      throw new Error("Error al consultar la API de frases 😣");
    }

    const datos = await respuesta.json();
    const fraseOriginal = datos.quote;
    const autor = datos.author;

    try {
      const traduccion = await fetch(
        `https://api.mymemory.translated.net/get?${encodeURIComponent(
          fraseOriginal
        )}&langpair=en|es`
      );

      if (!traduccion.ok) {
        throw new Error("Error en el servicio de traducción 😣");
      }

      const datosTraduccion = await traduccion.json(); // Asegúrate de que la variable coincida (datosTraduccion)
      if (datosTraduccion.responseStatus !== 200) {
        throw new Error(`MyMemory Error: ${datosTraduccion.responseDetails}`);
      }

      return {
        frase: datosTraduccion.responseData.translatedText || fraseOriginal,
        autor ,
      };
    } catch (errorTraduccion) {
      // Si falla la traducción, devolvemos la frase en su idioma original (inglés)
      console.error("Aviso controlado: Error al traducir -->", errorTraduccion);
     
      return {
        frase: "⚠️ Ocurrió un error al intentar traducir la frase.",
        autor:  "Sistema de traducción",
      };
    }

  } catch (error) { //capturar error si algo falla
    console.error(error);
    return { error: "No se pudo obtener la frase. Intentá nuevamente 😣" };
  } //devuelve los datos para mostrarlos en la pag.
}
