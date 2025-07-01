import React, { lazy, Suspense } from "react";
// Rutas de importación corregidas con extensión explícita
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Main from "./pages/main.jsx";

function App() {
  // --- WhatsApp Button Configuration ---
  // IMPORTANTE: Reemplaza '50685022903' con tu número de WhatsApp real, incluyendo el código de país.
  // IMPORTANTE: Personaliza el 'WHATSAPP_MESSAGE' con el mensaje predefinido que desees.
  const WHATSAPP_NUMBER = "50685022903"; // Ejemplo: +506 8502-2903 para Costa Rica
  const WHATSAPP_MESSAGE =
    "Hola, me gustaría más información sobre los tours de Super Quads.";

  return (
    <div className="relative min-h-screen">
      <Header />
      {/* Ajusta el padding-top de tu contenido principal para que no quede oculto
        debajo del header fijo. El valor debe ser aproximadamente la altura de tu header.
        Podrías necesitar ajustar esto según la altura real de tu header en diferentes tamaños de pantalla.
      */}
      {/*<main className="pt-[90px] md:pt-[100px] lg:pt-[120px]"> */}
      <Main /> {/* Tu componente de contenido principal */}
      {/*</main>*/}
      <Footer />
      {/* Botón Flotante de WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          WHATSAPP_MESSAGE
        )}`}
        target="_blank"
        rel="noopener noreferrer" // Recomendado por seguridad al usar target="_blank"
        className="fixed bottom-6 right-6 z-50 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-75 flex items-center justify-center"
        aria-label="Contactar por WhatsApp" // Etiqueta de accesibilidad
      >
        {/* Ícono de WhatsApp de Font Awesome */}
        <i className="fab fa-whatsapp text-3xl"></i> {/* Tamaño del ícono */}
      </a>
    </div>
  );
}

export default App;
