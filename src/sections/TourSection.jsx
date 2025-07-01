// src/sections/TourSection.jsx
import React, { useState, useEffect } from "react"; // Import useState and useEffect
import useLanguageStore from "../stores/useLanguageStore.js"; // Ruta de importación corregida con extensión .js
import { useInView } from "react-intersection-observer";
import { Car, Mountain, Sun } from "lucide-react";

// Componente para una tarjeta de Tour individual
const TourCard = ({ tour, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  const animationDelay = `${index * 100}ms`;

  let iconColorClass = "text-white";
  // La lógica de iconColorClass se basa en el título, que ahora viene de las traducciones.
  // Asegúrate de que los títulos traducidos contengan estas palabras clave si quieres que la lógica funcione.
  if (tour.title.includes("Clásica") || tour.title.includes("Classic")) {
    iconColorClass = "text-white";
  } else if (tour.title.includes("Extrema") || tour.title.includes("Extreme")) {
    iconColorClass = "text-white";
  } else if (
    tour.title.includes("Volcánico") ||
    tour.title.includes("Volcanic")
  ) {
    iconColorClass = "text-white";
  }

  return (
    <div
      ref={ref}
      className={`relative bg-gray-800 rounded-2xl p-6 shadow-xl transition-all duration-500 transform
                  hover:scale-105 hover:-translate-y-2
                  ${inView ? "animate-fadeInUp" : "opacity-0 translate-y-8"}`}
      style={{ animationDelay: inView ? animationDelay : "0s" }}
    >
      {/* Icono dinámico en color */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 p-3 bg-red-600 rounded-full shadow-lg">
        <span className={iconColorClass}>{tour.icon}</span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 mt-4">{tour.title}</h3>
      <p className="text-gray-400 text-base mb-4 leading-relaxed">
        {tour.description}
      </p>
      <button
        className="relative overflow-hidden bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full text-sm font-semibold transition-all text-white
                            transform hover:scale-105 group cursor-pointer"
      >
        <span className="relative z-10">{tour.buttonText} →</span>
        {/* Efecto de brillo en el botón */}
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </button>
    </div>
  );
};

export default function TourSection() {
  const translations = useLanguageStore((state) =>
    state.getTranslations(state.language)
  );

  const [descriptionRef, descriptionInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [buttonRef, buttonInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [ref, inView] = useInView({
    threshold: 0.2, // Trigger when 20% of the section is visible
    // triggerOnce: true, // You might want this for a full section, but keeping it off for consistent re-animation
  });
  // State to track scroll position for parallax effect
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate parallax transform values
  const parallaxValue1 = scrollY * 0.1; // Slower movement
  const parallaxValue2 = scrollY * 0.05; // Even slower

  const tours = [
    {
      id: 1,
      // Usando las traducciones para el título y la descripción del tour
      title: translations.tour1Title,
      description: translations.tour1Description,
      buttonText: translations.learnMore,
      icon: <Car size={24} />, // Lucide icon
    },
    {
      id: 2,
      // Usando las traducciones para el título y la descripción del tour
      title: translations.tour2Title,
      description: translations.tour2Description,
      buttonText: translations.learnMore,
      icon: <Mountain size={24} />, // Lucide icon
    },
    {
      id: 3,
      // Usando las traducciones para el título y la descripción del tour
      title: translations.tour3Title,
      description: translations.tour3Description,
      buttonText: translations.learnMore,
      icon: <Sun size={24} />, // Lucide icon
    },
  ];

  return (
    <section
      id="tour"
      className="relative py-20 bg-gray-900 text-white text-center overflow-hidden"
    >
      {/* Efectos de fondo animados con Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-80 h-80 bg-red-700/5 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${parallaxValue1}px)` }}
        ></div>
        <div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-rose-700/5 rounded-full blur-3xl animate-pulse delay-1000"
          style={{ transform: `translateY(${-parallaxValue2}px)` }}
        ></div>
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Título mejorado con gradiente y efecto 3D */}
        <div
          className={`mb-12 transform transition-transform duration-300 ${
            inView ? "animate-fadeInUp" : "opacity-0 translate-y-8"
          }`}
          style={{ animationDelay: "0s" }}
        >
          <h2
            className="text-4xl lg:text-6xl font-bold mb-4 leading-tight"
            style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.14em" }}
          >
            <span className="text-white drop-shadow-2xl">
              {translations.tourSectionTitlePart1}
            </span>
            <span className="text-transparent bg-gradient-to-r from-red-600 via-rose-600 to-red-700 bg-clip-text ml-2">
              {translations.tourSectionTitlePart2}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-rose-600 mx-auto rounded-full"></div>
        </div>

        {/* Description with Fade-in Effect */}
        <p
          ref={descriptionRef}
          className={`text-lg mb-8 max-w-2xl mx-auto leading-relaxed text-gray-300 transition-all duration-700
            ${
              descriptionInView ? "animate-fadeInUp" : "opacity-0 translate-y-8"
            }`}
          style={{ animationDelay: descriptionInView ? "200ms" : "0s" }}
        >
          {translations.tourSectionDescription}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {tours.map((tour, index) => (
            <TourCard key={tour.id} tour={tour} index={index} />
          ))}
        </div>

        {/* Botón CTA con efecto de entrada y hover mejorado */}
        <button
          ref={buttonRef}
          className={`group relative overflow-hidden bg-red-600 hover:bg-red-700 px-10 py-4 rounded-full font-bold transition-all duration-300 transform
            hover:scale-110 hover:-translate-y-2 mt-16 text-white shadow-2xl shadow-red-500/20 cursor-pointer
            ${buttonInView ? "animate-fadeInUp" : "opacity-0 translate-y-8"}
            hover:animate-pulse-sm`}
          style={{ animationDelay: buttonInView ? "400ms" : "0s" }}
        >
          <span className="relative z-10 flex items-center justify-center">
            {translations.viewAllTours}
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </span>
          <div className="absolute inset-0 bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </section>
  );
}
