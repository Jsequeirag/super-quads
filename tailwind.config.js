/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      phone: "400px",
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
      pc: "1024px",
      movil: "0px",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"], // Agrega tu fuente sans-serif preferida
      serif: ["Merriweather", "serif"],
      display: ["Bangers", "cursive"], // Usando la fuente que mencionaste
    },
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // 'pulse' ya está incluido por defecto en Tailwind CSS
        // No necesitamos definir 'pulse' aquí a menos que quieras modificar su comportamiento predeterminado.
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "fade-in": "fade-in 0.5s ease-out forwards", // 0.5s de duración, suave al final, mantiene el estado final
        "fade-in-slide-up": "fade-in-slide-up 0.7s ease-out forwards", // 0.7s de duración, suave al final, mantiene el estado final
      },
      cursor: {
        grab: "grab",
        grabbing: "grabbing",
        move: "move",
        // ... otras opciones personalizadas
      },
    },
  },
  plugins: [],
};
