import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // --- Configuración del Service Worker ---
      registerType: "autoUpdate", // Registra y actualiza el SW automáticamente
      injectRegister: "auto", // Inyecta el script de registro del SW automáticamente
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg}"], // Patrones de archivos a cachear
        // Puedes añadir más configuraciones específicas de Workbox aquí
        // Por ejemplo, para incluir más activos específicos si no están cubiertos por globPatterns
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        additionalManifestEntries: [
          // Asegúrate de que las rutas sean relativas a la raíz de tu proyecto
          // o a la base URL si la tienes configurada en Vite
          "/Llanta.png",
          "/cuadra-turista1.jpg",
          "/cuadra-turista2.jpg",
          "/cuadra-turista3.jpg",
          "/cuadra-turista4.jpg",
          "/cuadra-turista5.jpg",
          "/cuadra-turista6.jpg",
          "/cuadra-turista7.jpg",
          "/cuadra-turista8.jpg",
          "/cuadra-turista9.jpg",
          // Añade cualquier otro activo estático que quieras cachear explícitamente
        ],
        navigateFallback: "/index.html", // Ruta a servir si no se encuentra una ruta en caché (para SPAs)
      },
      devOptions: {
        enabled: true, // Habilita la PWA en desarrollo para facilitar las pruebas
        type: "module", // Usa módulos ES para el Service Worker en desarrollo
      },

      // --- Configuración del Manifiesto de la Aplicación ---
      manifest: {
        name: "Super-quads", // Nombre completo de tu PWA
        short_name: "SQ", // Nombre corto para la pantalla de inicio
        description: "Una breve descripción de tu increíble PWA.", // Descripción de tu aplicación
        theme_color: "#000000", // Color para la barra de estado del navegador/tema del sistema
        background_color: "#ffffff", // Color de fondo de la pantalla de bienvenida
        display: "standalone", // Cómo se muestra la PWA (standalone, fullscreen, minimal-ui, browser)
        start_url: "/", // La URL de inicio cuando se abre la PWA desde el icono
        icons: [
          {
            src: "android-chrome-192x192.png", // Ruta a tu icono de 192x192
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png", // Ruta a tu icono de 512x512
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "maskable_icon.png", // Ícono "maskable" (recomendado para adaptabilidad)
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
          // Asegúrate de tener estos archivos de icono en tu carpeta `public/`
        ],
      },
    }),
  ],
});
