// src/Main.jsx
import React, { lazy, Suspense } from "react";
// Importa tus nuevas secciones
import HeroSection from "../sections/HeroSection";
import GallerySection from "../sections/GallerySection";
// Puedes importar lazy si planeas dividir más, pero por ahora los importamos directamente
// const HeroSection = lazy(() => import("./sections/HeroSection"));
// const GallerySection = lazy(() => import("./sections/GallerySection"));
// const TourSection = lazy(() => import("./sections/TourSection"));
// const AboutUsSection = lazy(() => import("./sections/AboutUsSection"));

// Componentes placeholder para las otras secciones
import TourSection from "../sections/TourSection";
import AboutUsSection from "../sections/AboutUsSection";

export default function Main() {
  return (
    // Aquí podrías envolverlo en <Suspense> si usas lazy imports para las secciones
    // <Suspense fallback={<div>Cargando secciones...</div>}>
    <>
      {/* El fondo global y los efectos de luz que antes estaban en Main ahora están dentro de HeroSection */}
      <main>
        <HeroSection />
        <GallerySection />
        <TourSection />
        <AboutUsSection />
      </main>
    </>
    // </Suspense>
  );
}
