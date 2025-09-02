import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-950 text-gray-700 dark:text-gray-300 transition-colors duration-300">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Columna izquierda - Logo, Nombre, Tagline y Redes Sociales */}
          <div className="text-center md:text-left">
            {/* Logo y Nombre */}
            <a 
              href="/"
              className="flex items-center justify-center md:justify-start mb-2 hover:opacity-80 transition-opacity group"
            >
              <img 
                src="/icon.png" 
                alt="QArk Logo" 
                className="w-8 h-8 mr-3 transition-transform duration-300 group-hover:scale-110"
              />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                QArk
              </h3>
            </a>
            
            {/* Tagline */}
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
              Centraliza tus pruebas de software en un único lugar
            </p>

            {/* Síguenos */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Síguenos
              </h4>
              <a 
                href="https://www.linkedin.com/company/qark-app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 focus:text-gray-900 dark:focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-950 rounded px-2 py-1"
                title="Seguir a QArk en LinkedIn"
                aria-label="Seguir a QArk en LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Columna central - Navegación */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Navegación
            </h4>
            <nav aria-label="Enlaces de navegación del sitio">
              <ul className="space-y-2">
                <li>
                  <a 
                    href="/#hero" 
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 focus:text-gray-900 dark:focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-950 rounded px-1"
                    title="Ir a la sección de inicio"
                  >
                    Inicio
                  </a>
                </li>
                <li>
                  <a 
                    href="/#features" 
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 focus:text-gray-900 dark:focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-950 rounded px-1"
                    title="Ver las funcionalidades de QArk"
                  >
                    Funcionalidades
                  </a>
                </li>
                <li>
                  <a 
                    href="/#how-it-works" 
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 focus:text-gray-900 dark:focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-950 rounded px-1"
                    title="Descubre cómo funciona QArk"
                  >
                    Cómo funciona
                  </a>
                </li>
                <li>
                  <a 
                    href="/#pricing" 
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 focus:text-gray-900 dark:focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-950 rounded px-1"
                    title="Ver planes y precios"
                  >
                    Precios
                  </a>
                </li>
                <li>
                  <a 
                    href="/contact" 
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 focus:text-gray-900 dark:focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-950 rounded px-1"
                    title="Contactar con el equipo de QArk"
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Columna derecha - Enlaces Legales */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/privacy" 
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 focus:text-gray-900 dark:focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-950 rounded px-1"
                  title="Leer política de privacidad"
                >
                  Privacidad
                </a>
              </li>
              <li>
                <a 
                  href="/terms" 
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 focus:text-gray-900 dark:focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-950 rounded px-1"
                  title="Leer términos de uso"
                >
                  Términos de uso
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-8">
          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 QArk. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;