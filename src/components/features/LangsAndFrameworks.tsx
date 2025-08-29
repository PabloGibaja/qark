import React, { useState, useEffect, useMemo } from 'react';

/**
 * Componente LangsAndFrameworks - Rediseñado
 * 
 * Nueva estructura con 3 filas:
 * 1. Barra de búsqueda
 * 2. Iconos de lenguajes (2 filas de 4)
 * 3. Carrusel de frameworks con animación
 * 
 * Props opcionales:
 * - onContactRequest?: (framework: string) => void - Callback para solicitar soporte
 */

// Interfaces
interface Framework {
  id: string;
  name: string;
  image: string; // Ruta de la imagen en /public/images/frameworks/
  supported: boolean;
}

interface Language {
  id: string;
  name: string;
  image: string; // CAMBIO: Ahora usa imagen en lugar de icon
}

// Datos de lenguajes (8 lenguajes en 2 filas de 4) - ACTUALIZADOS
const languages: Language[] = [
  { id: 'csharp', name: 'C#', image: '/images/languages/c.png' },
  { id: 'java', name: 'Java', image: '/images/languages/java.svg'},
  { id: 'python', name: 'Python', image: '/images/languages/python.png'},
  { id: 'javascript', name: 'JavaScript', image: '/images/languages/JavaScript.png' },
  { id: 'typescript', name: 'TypeScript', image: '/images/languages/Typescript.png' },
  { id: 'php', name: 'PHP', image: '/images/languages/php.png' },
  { id: 'ruby', name: 'Ruby', image: '/images/languages/Ruby.png' },
  { id: 'kotlin', name: 'Kotlin', image: '/images/languages/Kotlin.png' }
];

// Datos de frameworks (basados en las imágenes disponibles)
const frameworks: Framework[] = [
  { id: 'jest', name: 'Jest', image: '/images/frameworks/jest.png', supported: true },
  { id: 'pytest', name: 'PyTest', image: '/images/frameworks/pytest.svg', supported: true },
  { id: 'nunit', name: 'NUnit', image: '/images/frameworks/nunit.png', supported: true },
  { id: 'testng', name: 'TestNG', image: '/images/frameworks/testng.png', supported: true },
  { id: 'jasmine', name: 'Jasmine', image: '/images/frameworks/jasmine.svg', supported: true },
  { id: 'mocha', name: 'Mocha', image: '/images/frameworks/mocha.svg', supported: true },
  { id: 'playwright', name: 'Playwright', image: '/images/frameworks/playwright.svg', supported: true },
  { id: 'cucumber', name: 'Cucumber', image: '/images/frameworks/cucumber.png', supported: true },
  { id: 'specflow', name: 'SpecFlow', image: '/images/frameworks/specflow.png', supported: true },
  { id: 'xunit', name: 'xUnit', image: '/images/frameworks/xunit.png', supported: true },
  { id: 'phpunit', name: 'PHPUnit', image: '/images/frameworks/phpunit.svg', supported: true },
  { id: 'rspec', name: 'RSpec', image: '/images/frameworks/rspec.png', supported: true },
  { id: 'kotest', name: 'Kotest', image: '/images/frameworks/kotest.png', supported: true },
  { id: 'behave', name: 'Behave', image: '/images/frameworks/behave.png', supported: true },
  { id: 'robot_framework', name: 'Robot Framework', image: '/images/frameworks/robot_framework.png', supported: true },
  { id: 'codeceptjs', name: 'CodeceptJS', image: '/images/frameworks/codeceptjs.svg', supported: true },
  { id: 'karate', name: 'Karate', image: '/images/frameworks/karate.svg', supported: true },
  { id: 'wdio', name: 'WebDriverIO', image: '/images/frameworks/wdio.svg', supported: true },
  { id: 'android-test', name: 'Android Test', image: '/images/frameworks/android_test.png', supported: true },
  { id: 'behat', name: 'Behat', image: '/images/frameworks/behat.png', supported: true },
  { id: 'citrus', name: 'Citrus', image: '/images/frameworks/citrus.png', supported: true },
  { id: 'codeception', name: 'Codeception', image: '/images/frameworks/codeception.png', supported: true },
  { id: 'cute', name: 'Cute', image: '/images/frameworks/cute.png', supported: true },
  { id: 'jbehave', name: 'JBehave', image: '/images/frameworks/jbehave.png', supported: true },
  { id: 'marathon', name: 'Marathon', image: '/images/frameworks/marathon.svg', supported: true },
  { id: 'newman', name: 'Newman', image: '/images/frameworks/newman.png', supported: true },
  { id: 'reqnroll', name: 'Reqnroll', image: '/images/frameworks/reqnroll.png', supported: true },
  { id: 'scalatest', name: 'ScalaTest', image: '/images/frameworks/scalatest.gif', supported: true },
  { id: 'spock', name: 'Spock', image: '/images/frameworks/spock.png', supported: true },
  { id: 'vividus', name: 'Vividus', image: '/images/frameworks/vividus.png', supported: true }
];

// Hook para debounce
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

interface Props {
  onContactRequest?: (framework: string) => void;
}

const LangsAndFrameworks: React.FC<Props> = ({ onContactRequest }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [requestedFramework, setRequestedFramework] = useState<string>('');
  const [carouselOffset, setCarouselOffset] = useState<number>(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState<boolean>(false);
  
  const debouncedSearch = useDebounce(searchTerm, 250);

  // Filtrar frameworks basado en la búsqueda
  const filteredFrameworks = useMemo(() => {
    if (!debouncedSearch.trim()) {
      return frameworks;
    }
    return frameworks.filter(framework =>
      framework.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch]);

  // Controlar el carrusel
  useEffect(() => {
    if (debouncedSearch.trim() || isCarouselPaused) {
      return; // Pausar carrusel si hay búsqueda
    }

    const interval = setInterval(() => {
      setCarouselOffset(prev => {
        const maxOffset = frameworks.length * 120; // 120px por framework
        return prev >= maxOffset ? 0 : prev + 1;
      });
    }, 20); // Velocidad del carrusel

    return () => clearInterval(interval);
  }, [debouncedSearch, isCarouselPaused]);

  // Manejar solicitud de contacto
  const handleContactRequest = (frameworkName: string) => {
    setRequestedFramework(frameworkName);
    if (onContactRequest) {
      onContactRequest(frameworkName);
    } else {
      setShowContactModal(true);
    }
  };

  return (
    <div className="w-full h-full space-y-8">
      {/* FILA 1: Barra de búsqueda */}
      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Buscar framework
        </h4>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Escribe el nombre del framework..."
            className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-qark-blue focus:border-transparent transition-colors"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <i className="fas fa-search text-gray-400"></i>
          </div>
        </div>
      </div>

      {/* FILA 2: Iconos de lenguajes (2 filas de 4) */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h5 className="text-md font-medium text-gray-700 dark:text-gray-300">
            Lenguajes soportados
          </h5>
          
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {/* Primera fila */}
          {languages.slice(0, 4).map((language) => (
            <div
              key={language.id}
              className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300 group"
            >
              {/* CAMBIO: Usar imagen en lugar de icono de Devicon */}
              <div className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform duration-300">
                <img 
                  src={language.image} 
                  alt={language.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/default.svg';
                  }}
                />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                {language.name}
              </span>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {/* Segunda fila */}
          {languages.slice(4, 8).map((language) => (
            <div
              key={language.id}
              className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300 group"
            >
              {/* CAMBIO: Usar imagen en lugar de icono de Devicon */}
              <div className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform duration-300">
                <img 
                  src={language.image} 
                  alt={language.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/default.svg';
                  }}
                />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                {language.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FILA 3: Carrusel de frameworks */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h5 className="text-md font-medium text-gray-700 dark:text-gray-300">
            Frameworks soportados
          </h5>
        </div>
        
        {/* Contenedor del carrusel */}
        <div 
          className="relative overflow-hidden bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
          onMouseEnter={() => setIsCarouselPaused(true)}
          onMouseLeave={() => setIsCarouselPaused(false)}
        >
          {debouncedSearch.trim() ? (
            // Mostrar resultado de búsqueda - TODOS los frameworks que coincidan
            <div className="flex justify-center">
              {filteredFrameworks.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredFrameworks.map((framework) => (
                    <div key={framework.id} className="relative group flex flex-col items-center">
                      <div className="w-20 h-20 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center p-2 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <img 
                          src={framework.image} 
                          alt={framework.name}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/default.svg';
                          }}
                        />
                      </div>
                      {framework.supported && (
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                          <i className="fas fa-check"></i>
                        </div>
                      )}
                      <div className="text-center mt-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {framework.name}
                        </span>
                        {framework.supported && (
                          <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                            ✓ Soportado
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-500 dark:text-gray-400 mb-4">
                    <i className="fas fa-search text-3xl"></i>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    No encontramos "{debouncedSearch}"
                  </p>
                  <button
                    onClick={() => handleContactRequest(debouncedSearch)}
                    className="bg-qark-blue hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    Solicitar soporte
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Carrusel animado
            <div className="relative h-24">
              <div 
                className="flex space-x-6 transition-transform duration-75 ease-linear"
                style={{ transform: `translateX(-${carouselOffset}px)` }}
              >
                {/* Duplicar frameworks para efecto infinito */}
                {[...frameworks, ...frameworks].map((framework, index) => (
                  <div 
                    key={`${framework.id}-${index}`} 
                    className="flex-shrink-0 w-20 h-20 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center p-2 shadow-sm hover:shadow-md transition-shadow duration-300 relative group"
                  >
                    <img 
                      src={framework.image} 
                      alt={framework.name}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/default.svg';
                      }}
                    />
                    
                    {/* Nombre del framework debajo del icono en hover */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                      {framework.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Texto "... y más" */}
        {/* Texto de contacto - alineado a la derecha */}
        <div className="flex justify-end text-sm text-gray-500 dark:text-gray-400">
          ¿No encuentras tu framework? 
          <button 
            onClick={() => handleContactRequest('framework personalizado')}
            className="text-qark-blue hover:text-qark-teal underline ml-1 transition-colors duration-300"
          >
            Contáctanos
          </button>
        </div>
      </div>

      {/* Modal ficticio de contacto */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <div className="text-center">
              <div className="text-qark-blue mb-4">
                <i className="fas fa-envelope text-3xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Solicitud enviada
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Hemos recibido tu solicitud para añadir soporte a "{requestedFramework}". 
                Te contactaremos pronto.
              </p>
              <button
                onClick={() => setShowContactModal(false)}
                className="bg-qark-blue hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LangsAndFrameworks;