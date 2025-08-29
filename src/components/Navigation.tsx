import { useState, useEffect } from 'react';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Detectar scroll para efecto glassmorphism
  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detectar tema inicial
  useEffect(() => {
    const checkInitialTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    // Verificar tema inicial
    checkInitialTheme();

    // Observer para detectar cambios en el tema
    const observer = new MutationObserver(() => {
      checkInitialTheme();
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Función para scroll suave
  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Toggle tema oscuro
  const toggleTheme = (): void => {
    const html = document.documentElement;
    const currentlyDark = html.classList.contains('dark');
    
    if (currentlyDark) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg border-b border-gray-200 dark:border-gray-700' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo con icono */}
          <div className="flex items-center">
            <button 
              onClick={() => scrollToSection('hero')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity group"
            >
              {/* Icono de la app */}
              <div className="relative">
                <img 
                  src="/icon.png" 
                  alt="QArk Logo" 
                  className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                />
                {/* Efecto de brillo opcional */}
                <div className="absolute inset-0 bg-gradient-qark opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></div>
              </div>
              
              {/* Texto del logo */}
              <span className="text-2xl font-bold gradient-text">
                QArk
              </span>
            </button>
          </div>

          {/* Desktop Menu - CENTRADO */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-600 dark:text-gray-300 hover:text-qark-blue dark:hover:text-qark-teal transition-colors font-medium"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-gray-600 dark:text-gray-300 hover:text-qark-blue dark:hover:text-qark-teal transition-colors font-medium"
              >
                How it Works
              </button>
              <button 
                onClick={() => scrollToSection('benefits')}
                className="text-gray-600 dark:text-gray-300 hover:text-qark-blue dark:hover:text-qark-teal transition-colors font-medium"
              >
                Benefits
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-gray-600 dark:text-gray-300 hover:text-qark-blue dark:hover:text-qark-teal transition-colors font-medium"
              >
                Pricing
              </button>
            </div>
          </div>

          {/* Controles de la derecha */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle - REDISEÑADO */}
            <button 
              onClick={toggleTheme}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-qark-blue focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-qark-blue to-qark-teal shadow-lg' 
                  : 'bg-gray-200 hover:bg-gray-300 border border-gray-300 shadow-sm'
              }`}
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              {/* Círculo deslizante */}
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 flex items-center justify-center ${
                isDarkMode ? 'translate-x-7' : 'translate-x-1'
              }`}>
                {isDarkMode ? (
                  <i className="fas fa-moon text-xs text-qark-blue"></i>
                ) : (
                  <i className="fas fa-sun text-xs text-yellow-500"></i>
                )}
              </div>
              
              {/* Indicadores de fondo opcionales */}
              <div className="absolute inset-0 flex items-center justify-between px-2">
                <div className={`transition-opacity duration-300 ${
                  isDarkMode ? 'opacity-0' : 'opacity-30'
                }`}>
                  <i className="fas fa-sun text-xs text-gray-500"></i>
                </div>
                <div className={`transition-opacity duration-300 ${
                  isDarkMode ? 'opacity-30' : 'opacity-0'
                }`}>
                  <i className="fas fa-moon text-xs text-white"></i>
                </div>
              </div>
            </button>
            
            {/* CTA Button */}
            <button 
              onClick={() => scrollToSection('cta')}
              className="bg-gradient-qark text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium shadow-md hover:shadow-lg"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Theme Toggle - REDISEÑADO */}
            <button 
              onClick={toggleTheme}
              className={`relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-qark-blue focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-qark-blue to-qark-teal shadow-md' 
                  : 'bg-gray-200 hover:bg-gray-300 border border-gray-300 shadow-sm'
              }`}
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              {/* Círculo deslizante móvil */}
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transform transition-all duration-300 flex items-center justify-center ${
                isDarkMode ? 'translate-x-6' : 'translate-x-0.5'
              }`}>
                {isDarkMode ? (
                  <i className="fas fa-moon text-xs text-qark-blue"></i>
                ) : (
                  <i className="fas fa-sun text-xs text-yellow-500"></i>
                )}
              </div>
            </button>
            
            {/* Hamburger Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-qark-blue focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-1' : ''
                }`}></span>
                <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 mt-1 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 mt-1 ${
                  isMenuOpen ? '-rotate-45 -translate-y-1' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      } bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700`}>
        <div className="px-4 py-4 space-y-1">
          <button 
            onClick={() => scrollToSection('features')}
            className="block w-full text-left py-3 px-4 text-gray-600 dark:text-gray-300 hover:text-qark-blue dark:hover:text-qark-teal hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className="block w-full text-left py-3 px-4 text-gray-600 dark:text-gray-300 hover:text-qark-blue dark:hover:text-qark-teal hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
          >
            How it Works
          </button>
          <button 
            onClick={() => scrollToSection('benefits')}
            className="block w-full text-left py-3 px-4 text-gray-600 dark:text-gray-300 hover:text-qark-blue dark:hover:text-qark-teal hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
          >
            Benefits
          </button>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="block w-full text-left py-3 px-4 text-gray-600 dark:text-gray-300 hover:text-qark-blue dark:hover:text-qark-teal hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
          >
            Pricing
          </button>
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <button 
              onClick={() => scrollToSection('cta')}
              className="block w-full bg-gradient-qark text-white px-4 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium shadow-md"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;