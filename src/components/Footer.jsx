// src/Footer.jsx
import React from "react";
import {
  Instagram,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Youtube,
} from "lucide-react";
import useLanguageStore from "../stores/useLanguageStore";
import { useInView } from "react-intersection-observer"; // Import useInView

export default function Footer() {
  const translations = useLanguageStore((state) =>
    state.getTranslations(state.language)
  );

  // Use useInView for the entire footer section
  const [ref, inView] = useInView({
    triggerOnce: true, // Footer usually animates in once
    threshold: 0.1, // Trigger when 10% of the footer is visible
  });

  return (
    <footer
      ref={ref} // Attach ref to the main footer element
      className={`relative bg-gradient-to-r from-gray-950 via-black to-gray-950 text-gray-300 py-16 border-t border-red-700/30 overflow-hidden
                  ${inView ? "animate-fadeInUp" : "opacity-0 translate-y-8"}`} // Apply animation here
    >
      {/* Animated background elements (subtle, less prominent than sections) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-red-800/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-rose-800/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 relative z-10">
        {/* Columna 1: Logo y Slogan/Descripción Corta */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <a
            href="/"
            className="text-4xl font-bold transform -skew-x-12 relative z-10 mb-4 transition-transform duration-300 hover:scale-105"
            style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.05em" }}
            aria-label="Super Quads Logo - Go to homepage"
          >
            <span className="text-red-500 drop-shadow-lg ">SUPER</span>
            <span className="text-white ml-2 drop-shadow-lg ">QUADS</span>
          </a>
          <p className="text-sm leading-relaxed max-w-xs text-gray-400">
            {translations.footerDescription ||
              "Tu puerta de entrada a la aventura y la belleza natural de La Fortuna, San Carlos. Descubre Costa Rica en quad."}
          </p>
        </div>

        {/* Columna 2: Navegación */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text mb-5 uppercase tracking-wider">
            {translations.footerLinks || "Enlaces Rápidos"}
          </h3>
          <ul className="space-y-3">
            <li>
              <a
                href="#tour"
                className="hover:text-red-400 transition-colors text-base font-medium"
              >
                {translations.tour}
              </a>
            </li>
            <li>
              <a
                href="#galeria"
                className="hover:text-red-400 transition-colors text-base font-medium"
              >
                {translations.gallery}
              </a>
            </li>
            <li>
              <a
                href="#acerca"
                className="hover:text-red-400 transition-colors text-base font-medium"
              >
                {translations.aboutUs}
              </a>
            </li>
            <li>
              <a
                href="#contacto"
                className="hover:text-red-400 transition-colors text-base font-medium"
              >
                {translations.contact || "Contacto"}
              </a>
            </li>
            <li>
              <a
                href="#preguntas-frecuentes"
                className="hover:text-red-400 transition-colors text-base font-medium"
              >
                {translations.faq || "Preguntas Frecuentes"}
              </a>
            </li>
          </ul>
        </div>

        {/* Columna 3: Contacto */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text mb-5 uppercase tracking-wider">
            {translations.footerContact || "Contáctanos"}
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center justify-center md:justify-start text-base">
              <MapPin size={20} className="mr-3 text-red-500 flex-shrink-0" />
              <span>
                {translations.footerAddress ||
                  "Calle Principal, La Fortuna, San Carlos, Alajuela, Costa Rica"}
              </span>
            </li>
            <li className="flex items-center justify-center md:justify-start text-base">
              <Phone size={20} className="mr-3 text-red-500 flex-shrink-0" />
              <a
                href="tel:+50688887777"
                className="hover:text-red-400 transition-colors"
              >
                +506 8888-7777 {/* Número de ejemplo */}
              </a>
            </li>
            <li className="flex items-center justify-center md:justify-start text-base">
              <Mail size={20} className="mr-3 text-red-500 flex-shrink-0" />
              <a
                href="mailto:info@superquadslafortuna.com"
                className="hover:text-red-400 transition-colors"
              >
                info@superquadslafortuna.com {/* Email de ejemplo */}
              </a>
            </li>
          </ul>
        </div>

        {/* Columna 4: Redes Sociales y Mapa */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text mb-5 uppercase tracking-wider">
            {translations.footerFollowUs || "Síguenos"}
          </h3>
          <div className="flex space-x-4 mb-6">
            <a
              href="https://www.instagram.com/your_instagram/"
              aria-label="Follow us on Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-red-700 text-gray-300 bg-red-600/10 hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-md"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.facebook.com/your_facebook_page/"
              aria-label="Follow us on Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-red-700 text-gray-300 bg-red-600/10 hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-md"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.youtube.com/your_youtube_channel/" // Updated example URL
              aria-label="Watch us on YouTube"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-red-700 text-gray-300 bg-red-600/10 hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-md"
            >
              <Youtube size={20} />
            </a>
          </div>

          {/* Mapa incrustado mejorado */}
          <div className="w-full max-w-xs h-40 bg-gray-700 rounded-lg overflow-hidden shadow-xl border border-red-700">
            <iframe
              // IMPORTANT: Replace this with your ACTUAL Google Maps embed URL
              // Go to Google Maps, find your location, click "Share", then "Embed a map", copy the src URL
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.670691522956!2d-84.65689712418524!3d10.47271458971842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa10332857469a7%3A0xc4f9b8a8b122f671!2sLa%20Fortuna%20Waterfall!5e0!3m2!1sen!2scr!4v1719660000000!5m2!1sen!2scr" // Example: La Fortuna Waterfall
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Super Quads en La Fortuna"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Sección de Copyright */}
      <div className="border-t border-gray-700/50 mt-12 pt-8 text-center text-sm text-gray-500 relative z-10">
        <p>
          © {new Date().getFullYear()} Super Quads La Fortuna.{" "}
          {translations.allRightsReserved || "Todos los derechos reservados."}
          <br />
          {translations.poweredBy ||
            "Diseñado y desarrollado por [Tu Nombre/Agencia]"}
        </p>
      </div>
    </footer>
  );
}
