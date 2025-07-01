// src/stores/useLanguageStore.js
import { create } from "zustand";

// Define tus traducciones. ¡Asegúrate de que coincidan con tus textos!
const translations = {
  es: {
    // Navegación de escritorio y móvil
    tour: "TOUR",
    gallery: "GALERÍA DE AVENTURAS",
    aboutUs: "ACERCA DE",
    reserve: "RESERVAR", // Botón de reserva
    // Otros textos si los necesitas en el Main (ejemplos)
    galleryTitlePart1: "GALERÍA DE",
    galleryTitlePart2: "AVENTURAS",
    viewGallery: "Ver galería",
    explorerButton: "Explorar →",
    adventureTitles: {
      thermalPool: "Thermal Pool",
      privateForest: "Private Forest",
      ecoFarm: "Ecological Farm",
      atvRoutes: "ATV Routes",
      extremeZipline: "Extreme Zipline",
      birdWatching: "Bird Watching",
      outdoorCamping: "Outdoor Camping",
      typicalCooking: "Traditional Cooking Classes",
      coffeeTour: "Coffee Plantation Tour",
      // Nuevos títulos en español
      arenalVolcano: "Tour Volcán Arenal",
      riverCrossing: "Cruce de Ríos",
      mudTrails: "Senderos de Barro",
      privateFarms: "Fincas Privadas",
      rainforestSecrets: "Senderos Secretos",
      waterfallAdventure: "Cascadas Ocultas",
      sunsetTour: "Tour Atardecer",
      familyFriendly: "Tour Familiar",
      extremeChallenge: "Reto Extremo",
    },
    adventureDescriptions: {
      thermalPool: "Relax in our thermal waters",
      privateForest: "Adventure through natural trails",
      ecoFarm: "Discover hidden waterfalls",
      atvRoutes: "Explore the jungle by ATV",
      extremeZipline: "Fly over the trees",
      birdWatching: "Discover local wildlife",
      outdoorCamping: "Nights under the stars",
      typicalCooking: "Learn Costa Rican dishes",
      coffeeTour: "Learn about the coffee process",
      // Nuevas descripciones en español (usando las que proporcionaste)
      arenalVolcano: "Recorre senderos con vista espectacular al Volcán Arenal",
      riverCrossing: "Aventura extrema cruzando ríos y quebradas naturales",
      mudTrails: "Diversión garantizada en caminos llenos de barro tropical",
      privateFarms:
        "Explora fincas locales y conoce la vida rural costarricense",
      rainforestSecrets:
        "Descubre caminos ocultos en el bosque tropical lluvioso",
      waterfallAdventure: "Llega en ATV hasta cascadas vírgenes y refrescantes",
      sunsetTour: "Vive la magia del atardecer desde miradores únicos",
      familyFriendly: "Aventura segura para toda la familia en senderos suaves",
      extremeChallenge:
        "Para los más aventureros: caminos difíciles y emocionales",
    },

    categories: {
      all: "Todos los Tours",
      volcano: "Volcán Arenal",
      adventure: "Aventura Extrema",
      nature: "Naturaleza",
      rural: "Vida Rural",
      scenic: "Paisajes",
      family: "Familiar",
    },
    statistics: {
      atvTours: "Tours en ATV",
      yearsExperience: "Años de Experiencia",
      satisfactionGuaranteed: "Satisfacción Garantizada",
    }, // Nuevas traducciones para TourSection
    tourSectionTitlePart1: "NUESTROS",
    tourSectionTitlePart2: "TOURS DE AVENTURA",
    tourSectionDescription:
      "Prepárate para una experiencia inolvidable. Ofrecemos emocionantes rutas en quad que te llevarán a través de paisajes espectaculares, ríos y senderos de la selva en La Fortuna, garantizando aventura y diversión.",
    tour1Title: "Aventura Clásica",
    tour1Description:
      "Explora los principales atractivos de La Fortuna en una ruta de 2 horas. Ideal para principiantes y familias que buscan una introducción emocionante a la selva.",
    tour2Title: "Expedición Extrema",
    tour2Description:
      "Una ruta desafiante de 4 horas para los amantes de la adrenalina. Cruza ríos caudalosos, sube empinadas colinas y experimenta la verdadera aventura tropical.",
    tour3Title: "Atardecer Volcánico",
    tour3Description:
      "Un tour al atardecer con vistas impresionantes del Volcán Arenal. Disfruta de los colores del cielo mientras conduces por senderos con paisajes inolvidables.",
    learnMore: "Saber más",
    viewAllTours: "Ver Todos los Tours", // Nuevas traducciones para AboutUsSection
    aboutUsSectionTitlePart1: "ACERCA DE",
    aboutUsSectionTitlePart2: "SUPER QUADS",
    aboutUsParagraph1:
      "En Super Quads, somos tu socio de aventura en La Fortuna, Costa Rica. Nos apasiona ofrecer experiencias inolvidables en cuatrimoto, permitiéndote explorar la exuberante belleza natural de la región de una manera emocionante y segura.",
    aboutUsParagraph2:
      "Con años de experiencia en el turismo local, nuestro equipo está dedicado a brindarte un servicio excepcional. Desde senderos de selva profunda hasta vistas panorámicas de volcanes, cada tour está diseñado para sumergirte en la auténtica esencia de Costa Rica.",
    aboutUsParagraph3:
      "¡Únete a nosotros y crea recuerdos que durarán toda la vida!",
    aboutUsFeature1Title: "Equipo Apasionado",
    aboutUsFeature1Desc:
      "Expertos locales dedicados a tu aventura y seguridad.",
    aboutUsFeature2Title: "Naturaleza Pura",
    aboutUsFeature2Desc:
      "Explora paisajes vírgenes y la rica biodiversidad de Costa Rica.",
    aboutUsFeature3Title: "Experiencia Única",
    aboutUsFeature3Desc:
      "Rutas exclusivas y vehículos de última generación para la mejor aventura.",
    learnMoreAboutUs: "Conoce más de nuestra historia", // Nuevas traducciones para Footer
    footerDescription:
      "Tu puerta de entrada a la aventura y la belleza natural de La Fortuna, San Carlos. Descubre Costa Rica en quad.",
    footerLinks: "Enlaces Rápidos",
    contact: "Contacto", // Ya existía, pero lo confirmo aquí para coherencia
    faq: "Preguntas Frecuentes",
    footerContact: "Contáctanos",
    footerAddress:
      "Calle Principal, La Fortuna, San Carlos, Alajuela, Costa Rica",
    footerFollowUs: "Síguenos",
    allRightsReserved: "Todos los derechos reservados.",
    poweredBy: "Diseñado y desarrollado por [Tu Nombre/Agencia]",
  },
  en: {
    // Navegación de escritorio y móvil
    tour: "TOUR",
    gallery: "ADVENTURE GALLERY",
    aboutUs: "ABOUT US",
    reserve: "BOOK NOW", // Botón de reserva
    // Otros textos
    galleryTitlePart1: "ADVENTURE",
    galleryTitlePart2: "GALLERY",
    viewGallery: "View gallery →",
    explorerButton: "Explore →",
    adventureTitles: {
      thermalPool: "Thermal Pool",
      privateForest: "Private Forest",
      ecoFarm: "Ecological Farm",
      atvRoutes: "ATV Routes",
      extremeZipline: "Extreme Zipline",
      birdWatching: "Bird Watching",
      outdoorCamping: "Outdoor Camping",
      typicalCooking: "Traditional Cooking Classes",
      coffeeTour: "Coffee Plantation Tour",
      // Nuevos títulos en inglés
      arenalVolcano: "Arenal Volcano Tour",
      riverCrossing: "River Crossing",
      mudTrails: "Mud Trails",
      privateFarms: "Private Farms",
      rainforestSecrets: "Rainforest Secrets",
      waterfallAdventure: "Hidden Waterfalls",
      sunsetTour: "Sunset Tour",
      familyFriendly: "Family Friendly Tour",
      extremeChallenge: "Extreme Challenge",
    },
    adventureDescriptions: {
      thermalPool: "Relax in our thermal waters",
      privateForest: "Adventure through natural trails",
      ecoFarm: "Discover hidden waterfalls",
      atvRoutes: "Explore the jungle by ATV",
      extremeZipline: "Fly over the trees",
      birdWatching: "Discover local wildlife",
      outdoorCamping: "Nights under the stars",
      typicalCooking: "Learn Costa Rican dishes",
      coffeeTour: "Learn about the coffee process",
      // Nuevas descripciones en inglés (basadas en tu solicitud)
      arenalVolcano: "Explore trails with spectacular views of Arenal Volcano",
      riverCrossing: "Extreme adventure crossing rivers and natural streams",
      mudTrails: "Guaranteed fun on muddy tropical paths",
      privateFarms: "Explore local farms and experience Costa Rican rural life",
      rainforestSecrets: "Discover hidden paths in the tropical rainforest",
      waterfallAdventure: "Reach pristine and refreshing waterfalls by ATV",
      sunsetTour: "Experience the magic of sunset from unique viewpoints",
      familyFriendly: "Safe adventure for the whole family on gentle trails",
      extremeChallenge:
        "For the most adventurous: difficult and exciting paths",
    },
    categories: {
      all: "All Tours",
      volcano: "Arenal Volcano",
      adventure: "Extreme Adventure",
      nature: "Nature",
      rural: "Rural Life",
      scenic: "Scenic Views",
      family: "Family Friendly",
    },
    statistics: {
      atvTours: "ATV Tours",
      yearsExperience: "Years of Experience",
      satisfactionGuaranteed: "Satisfaction Guaranteed",
    }, // Nuevas traducciones para TourSection
    tourSectionTitlePart1: "OUR",
    tourSectionTitlePart2: "ADVENTURE TOURS",
    tourSectionDescription:
      "Prepare for an unforgettable experience. We offer exciting quad routes that will take you through spectacular landscapes, rivers, and jungle trails in La Fortuna, guaranteeing adventure and fun.",
    tour1Title: "Classic Adventure",
    tour1Description:
      "Explore the main attractions of La Fortuna on a 2-hour route. Ideal for beginners and families looking for an exciting introduction to the jungle.",
    tour2Title: "Extreme Expedition",
    tour2Description:
      "A challenging 4-hour route for adrenaline lovers. Cross mighty rivers, climb steep hills, and experience the true tropical adventure.",
    tour3Title: "Volcanic Sunset",
    tour3Description:
      "A sunset tour with breathtaking views of Arenal Volcano. Enjoy the colors of the sky as you drive along trails with unforgettable landscapes.",
    learnMore: "Learn More",
    viewAllTours: "View All Tours", // Nuevas traducciones para AboutUsSection
    aboutUsSectionTitlePart1: "ABOUT",
    aboutUsSectionTitlePart2: "SUPER QUADS",
    aboutUsParagraph1:
      "At Super Quads, we are your adventure partner in La Fortuna, Costa Rica. We are passionate about offering unforgettable ATV experiences, allowing you to explore the lush natural beauty of the region in an exciting and safe way.",
    aboutUsParagraph2:
      "With years of experience in local tourism, our team is dedicated to providing you with exceptional service. From deep jungle trails to panoramic volcano views, each tour is designed to immerse you in the authentic essence of Costa Rica.",
    aboutUsParagraph3: "Join us and create memories that will last a lifetime!",
    aboutUsFeature1Title: "Passionate Team",
    aboutUsFeature1Desc:
      "Local experts dedicated to your adventure and safety.",
    aboutUsFeature2Title: "Pure Nature",
    aboutUsFeature2Desc:
      "Explore pristine landscapes and the rich biodiversity of Costa Rica.",
    aboutUsFeature3Title: "Unique Experience",
    aboutUsFeature3Desc:
      "Exclusive routes and state-of-the-art vehicles for the best adventure.",
    learnMoreAboutUs: "Learn more about our story", // Nuevas traducciones para Footer
    footerDescription:
      "Your gateway to adventure and the natural beauty of La Fortuna, San Carlos. Discover Costa Rica by quad.",
    footerLinks: "Quick Links",
    contact: "Contact", // Already existed, but confirm here for consistency
    faq: "Frequently Asked Questions",
    footerContact: "Contact Us",
    footerAddress: "Main Street, La Fortuna, San Carlos, Alajuela, Costa Rica",
    footerFollowUs: "Follow Us",
    allRightsReserved: "All rights reserved.",
    poweredBy: "Designed and developed by [Your Name/Agency]",
  },
};

// Crea tu store de Zustand
const useLanguageStore = create((set) => ({
  // Estado inicial: Cargar de localStorage o 'es' por defecto
  language: localStorage.getItem("appLanguage") || "es",

  // Función para cambiar el idioma
  setLanguage: (newLanguage) => {
    set({ language: newLanguage }); // Actualiza el estado 'language'
    localStorage.setItem("appLanguage", newLanguage); // Guarda en localStorage
  },

  // Función para obtener las traducciones del idioma actual
  getTranslations: (lang) => translations[lang],
}));

export default useLanguageStore;
