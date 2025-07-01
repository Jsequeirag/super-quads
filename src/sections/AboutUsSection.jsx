// src/sections/AboutUsSection.jsx
import React from "react";
import useLanguageStore from "../stores/useLanguageStore"; // Para las traducciones
import { useInView } from "react-intersection-observer"; // Import useInView hook
import { Users, Leaf, Bike } from "lucide-react"; // Import some relevant icons

export default function AboutUsSection() {
  const translations = useLanguageStore((state) =>
    state.getTranslations(state.language)
  );

  // Use useInView for the main section content
  const [ref, inView] = useInView({
    threshold: 0.2, // Trigger when 20% of the section is visible
    // triggerOnce: true, // You might want this for a full section, but keeping it off for consistent re-animation
  });

  // Array of key points for visual representation (optional, but good for engagement)
  const keyPoints = [
    {
      id: 1,
      icon: <Users className="h-8 w-8 text-red-500" />,
      title: translations.aboutUsFeature1Title || "Equipo Apasionado",
      description:
        translations.aboutUsFeature1Desc ||
        "Expertos locales dedicados a tu aventura y seguridad.",
    },
    {
      id: 2,
      icon: <Leaf className="h-8 w-8 text-green-500" />,
      title: translations.aboutUsFeature2Title || "Naturaleza Pura",
      description:
        translations.aboutUsFeature2Desc ||
        "Explora paisajes vírgenes y la rica biodiversidad de Costa Rica.",
    },
    {
      id: 3,
      icon: <Bike className="h-8 w-8 text-blue-500" />,
      title: translations.aboutUsFeature3Title || "Experiencia Única",
      description:
        translations.aboutUsFeature3Desc ||
        "Rutas exclusivas y vehículos de última generación para la mejor aventura.",
    },
  ];

  return (
    <section
      id="acerca"
      className="relative py-20 bg-gray-800 text-gray-200 text-center overflow-hidden"
    >
      {/* Animated background elements (consistent red/rose theme) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-700/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-700/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div ref={ref} className="max-w-4xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Title with gradient and animation */}
        <div
          className={`mb-12 transform transition-transform duration-300 ${
            inView ? "animate-fadeInUp" : "opacity-0 translate-y-8"
          }`}
          style={{ animationDelay: "0s" }} // Title usually animates first
        >
          <h2
            className="text-4xl lg:text-6xl font-bold mb-4 leading-tight"
            style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.14em" }}
          >
            <span className="text-white drop-shadow-2xl">
              {translations.aboutUsSectionTitlePart1 || "ACERCA DE"}
            </span>
            <span className="text-transparent bg-gradient-to-r from-red-600 via-rose-600 to-red-700 bg-clip-text ml-2">
              {translations.aboutUsSectionTitlePart2 || "SUPER QUADS"}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-rose-600 mx-auto rounded-full"></div>
        </div>

        {/* Paragraphs with staggered animation */}
        <p
          className={`text-lg leading-relaxed mb-6 transition-all duration-700 ${
            inView ? "animate-fadeInUp" : "opacity-0 translate-y-8"
          }`}
          style={{ animationDelay: "200ms" }}
        >
          {translations.aboutUsParagraph1 ||
            "En Super Quads, somos tu socio de aventura en La Fortuna, Costa Rica. Nos apasiona ofrecer experiencias inolvidables en cuatrimoto, permitiéndote explorar la exuberante belleza natural de la región de una manera emocionante y segura."}
        </p>
        <p
          className={`text-lg leading-relaxed mb-6 transition-all duration-700 ${
            inView ? "animate-fadeInUp" : "opacity-0 translate-y-8"
          }`}
          style={{ animationDelay: "400ms" }}
        >
          {translations.aboutUsParagraph2 ||
            "Con años de experiencia en el turismo local, nuestro equipo está dedicado a brindarte un servicio excepcional. Desde senderos de selva profunda hasta vistas panorámicas de volcanes, cada tour está diseñado para sumergirte en la auténtica esencia de Costa Rica."}
        </p>
        <p
          className={`text-lg leading-relaxed transition-all duration-700 ${
            inView ? "animate-fadeInUp" : "opacity-0 translate-y-8"
          }`}
          style={{ animationDelay: "600ms" }}
        >
          {translations.aboutUsParagraph3 ||
            "¡Únete a nosotros y crea recuerdos que durarán toda la vida!"}
        </p>

        {/* Key Points / Features Grid (new addition) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-12">
          {keyPoints.map((point, index) => (
            <div
              key={point.id}
              className={`flex flex-col items-center p-6 bg-gray-700/50 rounded-lg shadow-md transition-all duration-700 transform hover:scale-105 hover:bg-gray-700 ${
                inView ? "animate-fadeInUp" : "opacity-0 translate-y-8"
              }`}
              style={{ animationDelay: `${700 + index * 150}ms` }}
            >
              <div className="mb-4">{point.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {point.title}
              </h3>
              <p className="text-sm text-gray-300">{point.description}</p>
            </div>
          ))}
        </div>

        {/* Button with animation and hover effects */}
        <button
          className={`group relative overflow-hidden bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 text-white shadow-lg shadow-red-500/20 cursor-pointer
            ${inView ? "animate-fadeInUp" : "opacity-0 translate-y-8"}`}
          style={{ animationDelay: "1000ms" }} // Last element to animate
        >
          <span className="relative z-10">
            {translations.learnMoreAboutUs || "Conoce más de nuestra historia"}
          </span>
          {/* Shine effect on button */}
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </button>
      </div>
    </section>
  );
}
