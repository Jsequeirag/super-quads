// src/Header.jsx
import { Menu, X, Instagram, MapPin, Phone, CalendarCheck } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import useLanguageStore from "../stores/useLanguageStore";
import ReactCountryFlag from "react-country-flag";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const translations = useLanguageStore((state) =>
    state.getTranslations(state.language)
  );

  const languageDropdownRef = useRef(null);

  // CORREGIDO: Estado para la animación de carga del header
  const [headerLoaded, setHeaderLoaded] = useState(false);

  // CORREGIDO: useEffect para activar la animación con delay
  useEffect(() => {
    // Pequeño delay para que la animación sea visible
    const timer = setTimeout(() => {
      setHeaderLoaded(true);
    }, 100); // 100ms delay

    return () => clearTimeout(timer);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target)
      ) {
        setIsLanguageDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

  const getCountryCode = (lang) => {
    if (lang === "es") return "CR";
    if (lang === "en") return "US";
    return "US";
  };

  // URLs constants
  const INSTAGRAM_URL = "https://www.instagram.com/your_instagram_profile";
  const Maps_URL = "https://maps.app.goo.gl/your_Maps_link";
  const PHONE_NUMBER_CALL = "tel:+50688887777";
  const PHONE_NUMBER_DISPLAY = "+506 8888-7777";

  return (
    <header
      className={`fixed top-0 w-full z-50 bg-gradient-to-r from-gray-900 via-black to-gray-900
         transform transition-all duration-1000 ease-out
         ${
           headerLoaded
             ? "translate-y-0 opacity-100"
             : "-translate-y-full opacity-0"
         }`}
    >
      <div
        className="absolute inset-y-0 left-0 w-1/4 bg-red-600 opacity-20"
        aria-hidden="true"
      ></div>

      <div className="relative px-4 py-4 lg:px-8">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <a
            href="/"
            className="text-2xl lg:text-4xl transform -skew-x-12 font-bold relative z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            style={{ fontFamily: "Bangers, cursive", letterSpacing: "0.05em" }}
            aria-label="Super Quads Logo - Go to homepage"
          >
            <span className="text-red-500 drop-shadow-lg">SUPER</span>
            <span className="text-white ml-2 drop-shadow-lg">QUADS</span>
          </a>

          <nav
            className="hidden md:flex space-x-8 text-sm lg:text-base font-medium"
            aria-label="Main navigation"
          >
            <a
              href="#galeria"
              className="text-white hover:text-red-500 transition-colors uppercase tracking-wide px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {translations.gallery}
            </a>
            <a
              href="#tour"
              className="text-white hover:text-red-500 transition-colors uppercase tracking-wide px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {translations.tour}
            </a>
            <a
              href="#acerca"
              className="text-white hover:text-red-500 transition-colors uppercase tracking-wide px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {translations.aboutUs}
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative z-20" ref={languageDropdownRef}>
              <button
                onClick={() =>
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                }
                className="cursor-pointer bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center justify-center min-w-[150px]"
                aria-haspopup="true"
                aria-expanded={isLanguageDropdownOpen}
              >
                <ReactCountryFlag
                  countryCode={getCountryCode(language)}
                  svg
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                    marginRight: "0.5em",
                    borderRadius: "2px",
                  }}
                  title={language === "es" ? "Costa Rica" : "United States"}
                />
                <span className="text-sm font-semibold uppercase">
                  {language === "es" ? "Español" : "English"}
                </span>
                <svg
                  className={`ml-2 h-4 w-4 fill-current transform transition-transform duration-200 ${
                    isLanguageDropdownOpen ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </button>

              <div
                className={`cursor-pointer absolute right-0 mt-2 w-36 bg-gray-800 rounded-md shadow-lg py-1.5 z-30 overflow-visible transition-opacity duration-200 ease-out ${
                  isLanguageDropdownOpen
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <button
                  onClick={() => handleLanguageChange("es")}
                  className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-red-600 transition-colors duration-200 focus:outline-none cursor-pointer"
                >
                  <ReactCountryFlag
                    countryCode="CR"
                    svg
                    style={{
                      width: "1.5em",
                      height: "1.5em",
                      marginRight: "0.5em",
                      borderRadius: "2px",
                    }}
                    title="Costa Rica"
                  />
                  Español
                </button>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-red-600 transition-colors duration-200 focus:outline-none cursor-pointer"
                >
                  <ReactCountryFlag
                    countryCode="US"
                    svg
                    style={{
                      width: "1.5em",
                      height: "1.5em",
                      marginRight: "0.5em",
                      borderRadius: "2px",
                    }}
                    title="United States"
                  />
                  English
                </button>
              </div>
            </div>

            <div className="flex space-x-2">
              <a
                href={INSTAGRAM_URL}
                aria-label="Follow us on Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-white text-white hover:bg-white hover:text-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Instagram size={20} />
              </a>
              <a
                href={Maps_URL}
                aria-label="Find us on Google Maps"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-white text-white hover:bg-white hover:text-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <MapPin size={20} />
              </a>
              <a
                href={PHONE_NUMBER_CALL}
                aria-label="Call us"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-white text-white hover:bg-white hover:text-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Phone size={20} />
              </a>
            </div>

            <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center cursor-pointer">
              <CalendarCheck size={18} className="mr-2" />
              {translations.reserve}
            </button>
          </div>

          <button
            className="md:hidden p-2 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden absolute top-full left-0 right-0 bg-black bg-opacity-95 backdrop-blur-md p-4 origin-top overflow-hidden"
          >
            <nav className="flex flex-col space-y-4">
              <a
                href="#tour"
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-red-500 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {translations.tour}
              </a>
              <a
                href="#galeria"
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-red-500 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {translations.gallery}
              </a>
              <a
                href="#acerca"
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-red-500 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {translations.aboutUs}
              </a>

              <div className="flex justify-center space-x-4 pt-4 border-t border-gray-700 mt-4">
                <a
                  href={INSTAGRAM_URL}
                  aria-label="Follow us on Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-white text-white hover:bg-white hover:text-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href={Maps_URL}
                  aria-label="Find us on Google Maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-white text-white hover:bg-white hover:text-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <MapPin size={20} />
                </a>
                <a
                  href={PHONE_NUMBER_CALL}
                  aria-label="Call us"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-white text-white hover:bg-white hover:text-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Phone size={20} />
                </a>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  onClick={() =>
                    handleLanguageChange(language === "es" ? "en" : "es")
                  }
                  className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center justify-center min-w-[150px]"
                >
                  <ReactCountryFlag
                    countryCode={getCountryCode(
                      language === "es" ? "en" : "es"
                    )}
                    svg
                    style={{
                      width: "1.5em",
                      height: "1.5em",
                      marginRight: "0.5em",
                      borderRadius: "2px",
                    }}
                    title={language === "es" ? "United States" : "Costa Rica"}
                  />
                  <span className="text-sm font-semibold uppercase">
                    {language === "es" ? "English" : "Español"}
                  </span>
                </button>
              </div>

              <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full text-sm font-semibold transition-all w-fit text-white mx-auto mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center">
                <CalendarCheck size={18} className="mr-2" />
                {translations.reserve}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
