// src/sections/GallerySection.jsx
import React, { useState, useEffect, useRef } from "react";
import useLanguageStore from "../stores/useLanguageStore.js"; // Asegúrate de que la ruta sea correcta
import { Image as ImageIcon } from "lucide-react";
import { useInView } from "react-intersection-observer"; // Corrección: "from" en lugar de "="

export default function GallerySection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const translations = useLanguageStore((state) =>
    state.getTranslations(state.language)
  );

  // Estado para controlar la animación de carga del título de la galería
  const [galleryTitleLoaded, setGalleryTitleLoaded] = useState(false);

  // useEffect para activar la animación del título cuando el componente se monta
  useEffect(() => {
    const timer = setTimeout(() => {
      setGalleryTitleLoaded(true);
    }, 100); // 100ms delay
    return () => clearTimeout(timer);
  }, []); // El array vacío asegura que se ejecuta solo una vez al montar

  // useInView para el resto de la sección (descripción, filtros, tarjetas)
  const [ref, inView] = useInView({
    threshold: 0.1, // Trigger when 10% of the section is visible
    triggerOnce: true, // Animará una vez que entra en vista
  });

  const adventures = [
    {
      id: 1,
      title:
        translations.adventureTitles?.arenalVolcano || "Tour Volcán Arenal",
      image: "/cuadra-turista1.jpg",
      description:
        translations.adventureDescriptions?.arenalVolcano ||
        "Recorre senderos con vista espectacular al Volcán Arenal",
      category: "volcano",
    },
    {
      id: 2,
      title: translations.adventureTitles?.riverCrossing || "Cruce de Ríos",
      image: "/cuadra-turista2.jpg",
      description:
        translations.adventureDescriptions?.riverCrossing ||
        "Aventura extrema cruzando ríos y quebradas naturales",
      category: "adventure",
    },
    {
      id: 3,
      title: translations.adventureTitles?.mudTrails || "Senderos de Barro",
      image: "/cuadra-turista3.jpg",
      description:
        translations.adventureDescriptions?.mudTrails ||
        "Diversión garantizada en caminos llenos de barro tropical",
      category: "adventure",
    },
    {
      id: 4,
      title: translations.adventureTitles?.privateFarms || "Fincas Privadas",
      image: "/cuadra-turista4.jpg",
      description:
        translations.adventureDescriptions?.privateFarms ||
        "Explora fincas locales y conoce la vida rural costarricense",
      category: "rural",
    },
    {
      id: 5,
      title:
        translations.adventureTitles?.rainforestSecrets || "Senderos Secretos",
      image: "/cuadra-turista5.jpg",
      description:
        translations.adventureDescriptions?.rainforestSecrets ||
        "Descubre caminos ocultos en el bosque tropical lluvioso",
      category: "nature",
    },
    {
      id: 6,
      title:
        translations.adventureTitles?.waterfallAdventure || "Cascadas Ocultas",
      image: "/cuadra-turista6.jpg",
      description:
        translations.adventureDescriptions?.waterfallAdventure ||
        "Llega en ATV hasta cascadas vírgenes y refrescantes",
      category: "nature",
    },
    {
      id: 7,
      title: translations.adventureTitles?.sunsetTour || "Tour Atardecer",
      image: "/cuadra-turista7.jpg",
      description:
        translations.adventureDescriptions?.sunsetTour ||
        "Vive la magia del atardecer desde miradores únicos",
      category: "scenic",
    },
    {
      id: 8,
      title: translations.adventureTitles?.familyFriendly || "Tour Familiar",
      image: "/cuadra-turista8.jpg",
      description:
        translations.adventureDescriptions?.familyFriendly ||
        "Aventura segura para toda la familia en senderos suaves",
      category: "family",
    },
    {
      id: 9,
      title: translations.adventureTitles?.extremeChallenge || "Reto Extremo",
      image: "/cuadra-turista9.jpg",
      description:
        translations.adventureDescriptions?.extremeChallenge ||
        "Para los más aventureros: caminos difíciles y emocionales",
      category: "adventure",
    },
  ];

  const categories = [
    {
      id: "all",
      name: translations.categories?.all || "Todos los Tours",
      icon: "🏍️",
    },
    {
      id: "volcano",
      name: translations.categories?.volcano || "Volcán Arenal",
      icon: "🌋",
    },
    {
      id: "adventure",
      name: translations.categories?.adventure || "Aventura Extrema",
      icon: "🏔️",
    },
    {
      id: "nature",
      name: translations.categories?.nature || "Naturaleza",
      icon: "🌿",
    },
    {
      id: "rural",
      name: translations.categories?.rural || "Vida Rural",
      icon: "🚜",
    },
    {
      id: "scenic",
      name: translations.categories?.scenic || "Paisajes",
      icon: "🌅",
    },
    {
      id: "family",
      name: translations.categories?.family || "Familiar",
      icon: "👨‍👩‍👧‍👦",
    },
  ];

  const filteredAdventures =
    selectedCategory === "all"
      ? adventures
      : adventures.filter(
          (adventure) => adventure.category === selectedCategory
        );

  return (
    <section
      id="galeria"
      className={`relative z-30 text-center bg-gradient-to-b from-black/90 via-black/80 to-black/70 backdrop-blur-lg rounded-t-3xl py-16 -mt-48 lg:-mt-100 overflow-hidden`}
    >
      {/* Efectos de fondo animados (kept subtle red/rose) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Título con animación (ahora al cargar la página) */}
        <div
          className={`mb-12 transform hover:scale-105 transition-transform duration-300 ${
            galleryTitleLoaded ? "animate-fadeInUp" : "opacity-0 translate-y-8" // Usa galleryTitleLoaded aquí
          }`}
          style={{ animationDelay: "0s" }}
        >
          <h2
            className="text-4xl lg:text-6xl font-bold mb-4 leading-tight"
            style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.14em" }}
          >
            <span className="text-white drop-shadow-2xl">
              {translations.galleryTitlePart1 || "GALERÍA DE"}
            </span>{" "}
            <span className="text-transparent bg-gradient-to-r from-red-600 via-rose-600 to-red-700 bg-clip-text ">
              {translations.galleryTitlePart2 || "AVENTURAS"}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-rose-600 mx-auto rounded-full"></div>
        </div>

        {/* Filtros de categorías (using bg-red-600 directly) */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-12 ${
            galleryTitleLoaded ? "animate-fadeInUp" : "opacity-0 translate-y-8"
          }`}
          style={{ animationDelay: galleryTitleLoaded ? "200ms" : "0s" }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer ${
                selectedCategory === category.id
                  ? "bg-red-600 text-white shadow-lg shadow-red-500/20"
                  : "bg-white/10 backdrop-blur-md text-white/80 hover:bg-white/20 border border-white/20"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Botón principal mejorado (with Lucide Icon) */}
        <button
          className={` ${
            galleryTitleLoaded ? "animate-fadeInUp" : "opacity-0 translate-y-8"
          } group relative overflow-hidden bg-red-600 hover:bg-red-700 px-10 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 mb-16 text-white shadow-2xl shadow-red-500/20 cursor-pointer `}
          style={{ animationDelay: galleryTitleLoaded ? "200ms" : "0s" }}
        >
          <span className="relative z-10 flex items-center justify-center">
            <ImageIcon className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            {translations.viewGallery || "Ver galería"}
          </span>
          <div className="absolute inset-0 bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* Grid de aventuras mejorado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAdventures.map((adventure, index) => (
            <AdventureCard
              key={adventure.id}
              adventure={adventure}
              categories={categories}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
              index={index} // Pass index for staggered animation
            />
          ))}
        </div>

        {/* Estadísticas al final */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text group-hover:scale-110 transition-transform duration-300">
              {filteredAdventures.length}+
            </div>
            {/* Traducción para "Tours en ATV" */}
            <div className="text-white/80 mt-2">
              {translations.statistics.atvTours}
            </div>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-600 to-slate-600 bg-clip-text group-hover:scale-110 transition-transform duration-300">
              100%
            </div>
            {/* Traducción para "Años de Experiencia" */}
            <div className="text-white/80 mt-2">
              {translations.statistics.yearsExperience}
            </div>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text group-hover:scale-110 transition-transform duration-300">
              ∞
            </div>
            {/* Traducción para "Satisfacción Garantizada" */}
            <div className="text-white/80 mt-2">
              {translations.statistics.satisfactionGuaranteed}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// New Component for individual Adventure Card
const AdventureCard = ({
  adventure,
  categories,
  hoveredCard,
  setHoveredCard,
  index,
}) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  // Calculate animation delay based on index for staggered effect
  const animationDelay = `${index * 100}ms`;
  const translations = useLanguageStore((state) =>
    state.getTranslations(state.language)
  );
  return (
    <div
      ref={ref} // Attach the ref to the element to observe
      key={adventure.id}
      className={`group relative overflow-hidden rounded-2xl h-80 transform transition-all duration-500 hover:scale-105 hover:-translate-y-4 ${
        hoveredCard === adventure.id ? "z-20" : "z-10"
      }
        ${inView ? "animate-fadeInUp" : "opacity-0 translate-y-8"} `} // Simplified conditional class
      onMouseEnter={() => setHoveredCard(adventure.id)}
      onMouseLeave={() => setHoveredCard(null)}
      style={{ animationDelay: inView ? animationDelay : "0s" }} // Apply delay only when in view
    >
      {/* Imagen con efectos */}
      <div className="absolute inset-0">
        <img
          src={adventure.image}
          alt={adventure.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
          loading="lazy"
        />
        {/* Neutral Overlay for natural image look */}
        <div
          className={`absolute inset-0 bg-black/20 group-hover:bg-black/20 transition-all duration-500`}
        ></div>
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-500"></div>
      </div>

      {/* Efectos de brillo (white shine remains) */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

      {/* Contenido de la tarjeta */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
            {adventure.title}
          </h3>
          <p className="text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 leading-relaxed">
            {adventure.description}
          </p>

          {/* Botón de acción que aparece al hover (using bg-red-600) */}
          <button className="mt-4 px-4 py-2 bg-red-600  backdrop-blur-md rounded-full text-white font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200 hover:bg-red-700/90 cursor-pointer">
            {translations.explorerButton || "Explorar"}
          </button>
        </div>
      </div>

      {/* Indicador de categoría (remains white/translucent) */}
      <div className="absolute top-4 right-4">
        <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-xs font-semibold text-white">
          {categories.find((cat) => cat.id === adventure.category)?.icon}
        </div>
      </div>
    </div>
  );
};

// Global CSS (recommend placing this in your main CSS file like globals.css or index.css)
// If you are using Tailwind JIT/AOT, make sure this animation is included in your Tailwind config's safelist
/*
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
}
*/
