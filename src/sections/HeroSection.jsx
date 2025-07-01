// src/sections/HeroSection.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import useLanguageStore from "../stores/useLanguageStore.js";

export default function HeroSection() {
  const [selectedCard, setSelectedCard] = useState(0);
  const [heroContentLoaded, setHeroContentLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Estados para la funcionalidad de arrastre (drag)
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [draggedDistance, setDraggedDistance] = useState(0);
  const [dragStarted, setDragStarted] = useState(false);
  const [dragRotation, setDragRotation] = useState(0);

  // Nueva variable para rotación continua sin límites
  const [continuousRotation, setContinuousRotation] = useState(0);

  const carouselRef = useRef(null);

  const translations = useLanguageStore((state) =>
    state.getTranslations(state.language)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroContentLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // --- useEffect para manejar redimensionamiento de la ventana ---
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const anglePerCard = 360 / adventures.length;
  const radius = 38;

  const goToPrevCard = useCallback(() => {
    setSelectedCard(
      (prev) => (prev - 1 + adventures.length) % adventures.length
    );
    setContinuousRotation((prev) => prev + anglePerCard);
  }, [adventures.length, anglePerCard]);

  const goToNextCard = useCallback(() => {
    setSelectedCard((prev) => (prev + 1) % adventures.length);
    setContinuousRotation((prev) => prev - anglePerCard);
  }, [adventures.length, anglePerCard]);

  const carouselRotation = continuousRotation + dragRotation;

  const handleDragStart = useCallback((e) => {
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);

    if (!clientX || !clientY) return;

    setIsDragging(true);
    setDragStarted(true);
    setStartX(clientX);
    setStartY(clientY);
    setDraggedDistance(0);
    setDragRotation(0);

    e.preventDefault();
  }, []);

  const handleDragMove = useCallback(
    (e) => {
      if (!isDragging || !dragStarted) return;

      const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);

      if (!clientX || !clientY) return;

      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        setDraggedDistance(deltaX);

        const dragSensitivity = 0.3;
        const rotationIncrement = anglePerCard / 100;
        const newDragRotation = deltaX * rotationIncrement * dragSensitivity;
        setDragRotation(newDragRotation);

        e.preventDefault();
      }
    },
    [isDragging, dragStarted, startX, startY, anglePerCard]
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging || !dragStarted) return;

    setIsDragging(false);
    setDragStarted(false);

    const dragThreshold = 80;
    const snapThreshold = 40;

    if (Math.abs(draggedDistance) >= dragThreshold) {
      if (draggedDistance > 0) {
        goToPrevCard();
      } else {
        goToNextCard();
      }
    } else if (Math.abs(draggedDistance) >= snapThreshold) {
      const snapDirection = draggedDistance > 0 ? 1 : -1;
      const snapRotation = snapDirection * 8;

      setDragRotation(snapRotation);

      setTimeout(() => {
        setDragRotation(0);
      }, 250);
    }

    setTimeout(() => {
      setDraggedDistance(0);
      setDragRotation(0);
    }, 400);
  }, [isDragging, dragStarted, draggedDistance, goToPrevCard, goToNextCard]);

  // Event listeners globales para el arrastre
  useEffect(() => {
    const handleMouseMove = (e) => handleDragMove(e);
    const handleMouseUp = () => handleDragEnd();
    const handleTouchMove = (e) => handleDragMove(e);
    const handleTouchEnd = () => handleDragEnd();

    if (isDragging && dragStarted) {
      document.addEventListener("mousemove", handleMouseMove, {
        passive: false,
      });
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);

      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.body.style.userSelect = "";
    };
  }, [isDragging, dragStarted, handleDragMove, handleDragEnd]);

  // Manejar clic en tarjeta (solo si no hubo arrastre)
  const handleCardClick = useCallback(
    (index) => {
      if (Math.abs(draggedDistance) < 5) {
        const currentIndex = selectedCard;
        const numCards = adventures.length;

        let diff = index - currentIndex;

        if (diff > numCards / 2) {
          diff -= numCards;
        } else if (diff < -numCards / 2) {
          diff += numCards;
        }

        setContinuousRotation((prev) => prev - diff * anglePerCard);
        setSelectedCard(index);
      }
    },
    [draggedDistance, selectedCard, adventures.length, anglePerCard]
  );

  return (
    <>
      <section
        id="hero"
        className="relative px-4 laptop:px-8 overflow-hidden min-h-screen"
      >
        {/* Background and lights */}
        <div
          className="fixed inset-0 -z-10 bg-black"
          style={{
            background:
              "radial-gradient(circle at center, rgba(30, 30, 30, 0.9) 0%, rgba(0, 0, 0, 1) 70%)",
          }}
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div
            className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto mt-[200px]">
          <div className="relative flex items-center justify-center h-[calc(100vh-4rem)] lg:h-[calc(100vh-2rem)] pb-64 lg:pb-0">
            {/* Main Container for Carousel Cards */}
            <div
              ref={carouselRef}
              className={`absolute flex items-center justify-center z-30
              ${
                heroContentLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } 
              transition-all duration-1000 ease-out
              ${
                isDragging
                  ? ""
                  : "transition-transform duration-700 ease-in-out"
              }`}
              style={{
                top: "calc(50% + 4rem)",
                bottom: "initial",
                left: "0",
                right: "0",
                height: "calc(100% - 4rem)",
                transform: `rotate(${carouselRotation}deg)`,
                transformOrigin: "center center",
                perspective: "2000px",
              }}
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
            >
              {/* Carousel Cards Container */}
              {adventures.map((adventure, index) => {
                const isSelected = index === selectedCard;
                const cardAngle = index * anglePerCard;
                const x = radius * Math.cos((cardAngle - 90) * (Math.PI / 180));
                const y = radius * Math.sin((cardAngle - 90) * (Math.PI / 180));

                let individualRotateZ = 0;
                let individualRotateY = 0;
                let individualRotateX = 0;
                let scale = isSelected ? 1 : 0.6;

                // --- Ajuste clave: offset vertical de la tarjeta (NUEVOS VALORES PARA MÓVIL) ---
                let cardYOffset = isSelected ? 0 : -10; // 0 para seleccionada, -10 para no seleccionada en móvil
                if (windowWidth >= 1024) {
                  // Equivalente a 'lg:' breakpoint
                  cardYOffset = isSelected ? -165 : -10;
                }

                let anticipationFactor = 0;

                // Calcular anticipación durante el drag
                if (isDragging && Math.abs(draggedDistance) > 20) {
                  const dragThreshold = 80;
                  const dragProgress = Math.min(
                    Math.abs(draggedDistance) / dragThreshold,
                    1
                  );

                  const easedProgress =
                    dragProgress * dragProgress * (3 - 2 * dragProgress);

                  let nextCardIndex;
                  if (draggedDistance > 0) {
                    nextCardIndex =
                      (selectedCard - 1 + adventures.length) %
                      adventures.length;
                  } else {
                    nextCardIndex = (selectedCard + 1) % adventures.length;
                  }

                  if (index === nextCardIndex) {
                    anticipationFactor = easedProgress;
                  } else if (index === selectedCard) {
                    anticipationFactor = -easedProgress * 0.3;
                  }
                }

                // Calcular diferencia de posición para transformaciones
                const numCards = adventures.length;
                let diff = index - selectedCard;

                if (diff > numCards / 2) {
                  diff -= numCards;
                } else if (diff < -numCards / 2) {
                  diff += numCards;
                }

                // Aplicar transformaciones basadas en selección y anticipación
                if (!isSelected) {
                  const maxBackgroundTilt = 400;
                  individualRotateZ =
                    diff * (maxBackgroundTilt / (numCards / 2));

                  const maxPerspectiveTilt = 65;
                  individualRotateY =
                    diff * (maxPerspectiveTilt / (numCards / 2));

                  const maxBackwardTilt = 25;
                  individualRotateX =
                    Math.abs(diff) * (maxBackwardTilt / (numCards / 2));

                  const distanceFactor = Math.abs(diff) / (numCards / 2);
                  scale = 0.6 - distanceFactor * 0.2;
                }

                // Aplicar factor de anticipación
                if (anticipationFactor > 0) {
                  const targetScale = isSelected
                    ? 1
                    : 0.6 + 0.4 * anticipationFactor;
                  scale = Math.max(scale, targetScale);

                  individualRotateZ *= 1 - anticipationFactor * 0.7;
                  individualRotateY *= 1 - anticipationFactor * 0.7;
                  individualRotateX *= 1 - anticipationFactor * 0.7;

                  // --- AJUSTE CLAVE: USAR windowWidth del estado con NUEVOS VALORES ---
                  let targetYOffset;
                  if (windowWidth >= 1024) {
                    targetYOffset = -165 * anticipationFactor;
                  } else {
                    targetYOffset = -45 * anticipationFactor; // Ajuste para que la carta se eleve menos en móvil
                  }

                  cardYOffset = isSelected
                    ? windowWidth >= 1024
                      ? -165
                      : 0 // Mantener el nuevo 0 para móvil cuando está seleccionada
                    : -10 + (targetYOffset + 10) * anticipationFactor;
                  // --- FIN DE AJUSTE CLAVE ---
                } else if (anticipationFactor < 0) {
                  const reductionFactor = Math.abs(anticipationFactor);

                  const smoothReduction = reductionFactor * reductionFactor;

                  scale = 1 - 0.25 * smoothReduction;

                  // --- AJUSTE CLAVE: USAR windowWidth del estado con NUEVOS VALORES ---
                  cardYOffset =
                    (windowWidth >= 1024 ? -165 : 0) + // Nuevo 0 para móvil
                    (windowWidth >= 1024 ? 100 : 80) * smoothReduction; // El 80 se mantiene como un buen valor para móviles
                  // --- FIN DE AJUSTE CLAVE ---

                  individualRotateZ =
                    diff * (200 / (numCards / 2)) * smoothReduction;
                  individualRotateY =
                    diff * (35 / (numCards / 2)) * smoothReduction;
                  individualRotateX =
                    Math.abs(diff) * (15 / (numCards / 2)) * smoothReduction;
                }

                return (
                  <div
                    key={adventure.id}
                    className={`absolute cursor-pointer shadow-2xl rounded-xl overflow-hidden
                    ${
                      isSelected || anticipationFactor > 0
                        ? "border-4 border-white"
                        : "border-2 border-gray-300"
                    }
                    ${
                      isDragging
                        ? "transition-none"
                        : "transition-all duration-700 ease-in-out"
                    }`}
                    style={{
                      width:
                        isSelected || anticipationFactor > 0
                          ? `${
                              26 -
                              (anticipationFactor < 0
                                ? Math.abs(anticipationFactor) * 8
                                : 0)
                            }rem`
                          : "18rem",
                      height:
                        isSelected || anticipationFactor > 0
                          ? `${
                              24 -
                              (anticipationFactor < 0
                                ? Math.abs(anticipationFactor) * 6
                                : 0)
                            }rem`
                          : "18rem",
                      top: "50%",
                      left: "50%",
                      transform: `
                        translate(-50%, -50%) 
                        translate(${x}rem, ${y}rem) 
                        rotate(${-carouselRotation}deg) 
                        rotateX(${individualRotateX}deg) 
                        rotateY(${individualRotateY}deg) 
                        rotateZ(${individualRotateZ}deg) 
                        translateY(${cardYOffset}px) 
                        scale(${scale})
                      `,
                      transformOrigin: "center center",
                      transformStyle: "preserve-3d",
                      perspective: "1000px",
                      zIndex: isSelected
                        ? 50
                        : 10 -
                          Math.abs(index - selectedCard) +
                          (anticipationFactor > 0 ? 20 : 0),
                      backgroundColor: "white",
                      filter:
                        !isSelected && anticipationFactor <= 0
                          ? "brightness(0.7) contrast(0.9)"
                          : "none",
                      cursor: isDragging ? "grabbing" : "grab",
                      boxShadow: isSelected
                        ? "0px 0px 15px rgba(0,0,0,0.5)"
                        : "0px 10px 20px rgba(0,0,0,0.4)",
                    }}
                    onClick={() => handleCardClick(index)}
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={adventure.image}
                        alt={adventure.title}
                        className={`h-full w-full object-cover rounded-xl ${
                          !isSelected ? "rounded-b-xl" : ""
                        }`}
                      />

                      {/* Overlay para la CARTA SELECCIONADA o EN ANTICIPACIÓN */}
                      {(isSelected || anticipationFactor > 0) && (
                        <div
                          className="absolute inset-0 rounded-xl pointer-events-none"
                          style={{
                            backgroundColor: `rgba(0, 0, 0, ${
                              0.2 - anticipationFactor * 0.1
                            })`,
                          }}
                        ></div>
                      )}

                      {/* Overlay más fuerte para las CARTAS NO SELECCIONADAS */}
                      {!isSelected && anticipationFactor <= 0 && (
                        <div
                          className="absolute inset-0 rounded-xl pointer-events-none"
                          style={{
                            background: `linear-gradient(
                              135deg, 
                              rgba(0, 0, 0, ${
                                0.7 + Math.abs(anticipationFactor) * 0.2
                              }) 0%, 
                              rgba(0, 0, 0, ${
                                0.5 + Math.abs(anticipationFactor) * 0.2
                              }) 50%, 
                              rgba(0, 0, 0, ${
                                0.8 + Math.abs(anticipationFactor) * 0.1
                              }) 100%
                            )`,
                          }}
                        ></div>
                      )}
                    </div>

                    {/* Título y descripción */}
                    {(isSelected || anticipationFactor > 0) && (
                      <div
                        className="absolute bottom-0 left-0 right-0 p-4 text-center bg-white flex flex-col justify-center items-center rounded-b-xl"
                        style={{
                          opacity: isSelected ? 1 : anticipationFactor * 0.8,
                          backgroundColor: `rgba(255, 255, 255, ${
                            0.9 -
                            (anticipationFactor < 0
                              ? Math.abs(anticipationFactor) * 0.3
                              : 0)
                          })`,
                        }}
                      >
                        <h3
                          className="font-bold text-2xl text-gray-800"
                          style={{
                            fontFamily: "Bangers, cursive",
                            letterSpacing: "0.05em",
                            fontSize:
                              anticipationFactor < 0
                                ? `${2 - Math.abs(anticipationFactor) * 0.5}rem`
                                : "2rem",
                          }}
                        >
                          {adventure.title}
                        </h3>
                        <p
                          className="text-gray-600 text-sm mt-1 truncate"
                          style={{
                            opacity: isSelected
                              ? 1
                              : Math.max(0.3, anticipationFactor),
                          }}
                        >
                          {adventure.description}
                        </p>
                      </div>
                    )}

                    {/* Punto rojo debajo de las cartas no seleccionadas */}
                    {!isSelected && anticipationFactor <= 0 && (
                      <div
                        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full shadow-lg"
                        style={{
                          opacity: 0.8 - Math.abs(anticipationFactor) * 0.3,
                        }}
                      ></div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Central Interactive Circle with Tire */}
            <div
              className={`absolute bottom-0 lg:bottom-10 left-1/2 transform -translate-x-1/2 z-20
              ${
                heroContentLoaded
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90"
              } 
              transition-all duration-1000 ease-out delay-300`}
            >
              <div className="relative">
                <div
                  className={`w-[36rem] h-[36rem] lg:w-[48rem] lg:h-[48rem] rounded-full flex items-center justify-center relative border-4 border-red-500 border-dashed
                    ${
                      isDragging
                        ? "transition-none"
                        : "transition-transform duration-700 ease-in-out"
                    }`}
                  style={{
                    transform: `rotate(${carouselRotation}deg) ${
                      isDragging ? "scale(1.02)" : "scale(1)"
                    }`,
                    boxShadow: isDragging
                      ? "0px 0px 30px rgba(255, 0, 0, 0.7)"
                      : "none",
                  }}
                >
                  <img
                    src="/Llanta.png"
                    alt="Llanta ATV"
                    className="w-full h-full object-cover rounded-full"
                    style={{
                      filter: `brightness(0.8) contrast(1.2) ${
                        isDragging
                          ? "drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))"
                          : "none"
                      }`,
                      objectFit: "cover",
                      transition: isDragging
                        ? "filter 0.1s ease-out, transform 0.1s ease-out"
                        : "none",
                    }}
                    onError={(e) => {
                      console.log("Error loading tire image:", e);
                      e.target.style.display = "none";
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle at center,
                          transparent 20%,
                          rgba(0,0,0,0.3) 25%,
                          transparent 30%,
                          rgba(0,0,0,0.2) 35%,
                          transparent 40%,
                          rgba(0,0,0,0.3) 45%,
                          transparent 50%,
                          transparent 55%,
                          rgba(0,0,0,0.2) 60%,
                          transparent 65%,
                          rgba(0,0,0,0.3) 70%,
                          transparent 75%)`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Indicador de progreso de arrastre mejorado */}
            {isDragging && Math.abs(draggedDistance) > 10 && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
                <div className="bg-black bg-opacity-70 text-white px-6 py-3 rounded-full text-sm font-medium border border-gray-600">
                  {Math.abs(draggedDistance) >= 80 ? (
                    draggedDistance > 0 ? (
                      "🠐 Cambiando a anterior"
                    ) : (
                      "Cambiando a siguiente 🠒"
                    )
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500 transition-all duration-100"
                          style={{
                            width: `${Math.min(
                              (Math.abs(draggedDistance) / 80) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs">
                        {Math.round((Math.abs(draggedDistance) / 80) * 100)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Arrows */}
            <button
              className={`absolute left-4 lg:left-11 top-1/3 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer
              ${
                heroContentLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              } 
              transition-all duration-700 ease-out delay-500`}
              onClick={goToPrevCard}
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              className={`absolute right-4 lg:right-11 top-1/3 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer
              ${
                heroContentLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              } 
              transition-all duration-700 ease-out delay-500`}
              onClick={goToNextCard}
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
