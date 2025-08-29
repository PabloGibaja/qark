import React, { useState, useEffect, useMemo } from 'react';

/**
 * Componente LangsAndFrameworks
 * 
 * Muestra soporte para múltiples lenguajes y frameworks con funcionalidad interactiva:
 * - Selección de lenguajes en columna izquierda
 * - Búsqueda y filtrado de frameworks en columna derecha
 * - Badges de soporte y CTAs para frameworks no soportados
 * 
 * Props opcionales para datos reales:
 * - languages?: Language[] - Array de lenguajes con sus frameworks
 * - onContactRequest?: (framework: string) => void - Callback para solicitar soporte
 */

// Interfaces
interface Framework {
  id: string;
  name: string;
  icon: string; // Clase de devicon o ruta de imagen
  supported: boolean;
  description?: string;
}

interface Language {
  id: string;
  name: string;
  icon: string;
  color: string;
  frameworks: Framework[];
}

// Datos de ejemplo
const mockLanguages: Language[] = [
  {
    id: 'java',
    name: 'Java',
    icon: 'devicon-java-plain',
    color: 'text-orange-500',
    frameworks: [
      { id: 'junit4', name: 'JUnit4', icon: 'fas fa-vial', supported: true },
      { id: 'junit5', name: 'JUnit5', icon: 'fas fa-vial', supported: true },
      { id: 'testng', name: 'TestNG', icon: 'fas fa-flask', supported: true },
      { id: 'mockito', name: 'Mockito', icon: 'fas fa-mask', supported: true },
      { id: 'selenium-java', name: 'Selenium', icon: 'fas fa-robot', supported: true },
      { id: 'rest-assured', name: 'Rest Assured', icon: 'fas fa-plug', supported: true }
    ]
  },
  {
    id: 'python',
    name: 'Python',
    icon: 'devicon-python-plain',
    color: 'text-blue-500',
    frameworks: [
      { id: 'pytest', name: 'PyTest', icon: 'fas fa-vial', supported: true },
      { id: 'unittest', name: 'unittest', icon: 'fas fa-flask', supported: true },
      { id: 'behave', name: 'Behave', icon: 'fas fa-play-circle', supported: true },
      { id: 'selenium-python', name: 'Selenium', icon: 'fas fa-robot', supported: true },
      { id: 'requests', name: 'Requests', icon: 'fas fa-exchange-alt', supported: true },
      { id: 'nose2', name: 'Nose2', icon: 'fas fa-search', supported: false },
      { id: 'hypothesis', name: 'Hypothesis', icon: 'fas fa-question-circle', supported: false },
      { id: 'locust', name: 'Locust', icon: 'fas fa-bug', supported: false }
    ]
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: 'devicon-javascript-plain',
    color: 'text-yellow-500',
    frameworks: [
      { id: 'jest', name: 'Jest', icon: 'fas fa-vial', supported: true },
      { id: 'mocha', name: 'Mocha', icon: 'fas fa-coffee', supported: true },
      { id: 'cypress', name: 'Cypress', icon: 'fas fa-play-circle', supported: true },
      { id: 'playwright', name: 'Playwright', icon: 'fas fa-theater-masks', supported: true },
      { id: 'jasmine', name: 'Jasmine', icon: 'fas fa-flower', supported: true },
      { id: 'webdriverio', name: 'WebDriverIO', icon: 'fas fa-robot', supported: false },
      { id: 'puppeteer', name: 'Puppeteer', icon: 'fas fa-hand-paper', supported: false },
      { id: 'karma', name: 'Karma', icon: 'fas fa-circle', supported: false }
    ]
  },
  {
    id: 'csharp',
    name: 'C#',
    icon: 'devicon-csharp-plain',
    color: 'text-purple-500',
    frameworks: [
      { id: 'nunit', name: 'NUnit', icon: 'fas fa-vial', supported: true },
      { id: 'xunit', name: 'xUnit', icon: 'fas fa-times', supported: true },
      { id: 'mstest', name: 'MSTest', icon: 'fas fa-microscope', supported: true },
      { id: 'selenium-csharp', name: 'Selenium', icon: 'fas fa-robot', supported: true },
      { id: 'specflow', name: 'SpecFlow', icon: 'fas fa-sitemap', supported: true },
      { id: 'nsubstitute', name: 'NSubstitute', icon: 'fas fa-exchange-alt', supported: false },
      { id: 'moq', name: 'Moq', icon: 'fas fa-mask', supported: false },
      { id: 'fluentassertions', name: 'FluentAssertions', icon: 'fas fa-check-double', supported: false }
    ]
  }
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
  languages?: Language[];
  onContactRequest?: (framework: string) => void;
}

const LangsAndFrameworks: React.FC<Props> = ({ 
  languages = mockLanguages,
  onContactRequest 
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [requestedFramework, setRequestedFramework] = useState<string>('');
  
  const debouncedSearch = useDebounce(searchTerm, 250);

  // Filtrar frameworks basado en la búsqueda
  const filteredFrameworks = useMemo(() => {
    if (!debouncedSearch.trim()) {
      return selectedLanguage.frameworks;
    }
    return selectedLanguage.frameworks.filter(framework =>
      framework.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [selectedLanguage.frameworks, debouncedSearch]);

  // Verificar si el término de búsqueda coincide exactamente con un framework no soportado
  const exactUnsupportedMatch = useMemo(() => {
    if (!debouncedSearch.trim()) return null;
    
    const exactMatch = selectedLanguage.frameworks.find(framework =>
      framework.name.toLowerCase() === debouncedSearch.toLowerCase() && !framework.supported
    );
    
    return exactMatch;
  }, [selectedLanguage.frameworks, debouncedSearch]);

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
    <div className="w-full h-full">
      <div className="grid md:grid-cols-2 gap-8 h-full">
        {/* Columna izquierda - Lenguajes */}
        <div className="space-y-4">
          
          <div className="space-y-3">
            {languages.map((language) => (
              <button
                key={language.id}
                onClick={() => {
                  setSelectedLanguage(language);
                  setSearchTerm(''); // Reset search when changing language
                }}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left group hover:shadow-lg ${
                  selectedLanguage.id === language.id
                    ? 'border-qark-blue bg-blue-50 dark:bg-blue-900/20 shadow-md'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                aria-label={`Seleccionar ${language.name}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`text-2xl ${language.color} group-hover:scale-110 transition-transform duration-300`}>
                    <i className={language.icon}></i>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {language.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {language.frameworks.filter(f => f.supported).length} frameworks soportados
                    </div>
                  </div>
                  {selectedLanguage.id === language.id && (
                    <div className="ml-auto">
                      <i className="fas fa-check text-qark-blue"></i>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Columna derecha - Frameworks */}
        <div className="space-y-4">
          {/* Buscador */}
          <div className="space-y-2">
            <label htmlFor="framework-search" className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Frameworks para {selectedLanguage.name}
            </label>
            <div className="relative">
              <input
                id="framework-search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar framework..."
                className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-qark-blue focus:border-transparent transition-colors"
                aria-label="Buscar frameworks"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <i className="fas fa-search text-gray-400"></i>
              </div>
            </div>
          </div>

          {/* Mensaje para framework exacto no soportado */}
          {exactUnsupportedMatch && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-yellow-800 dark:text-yellow-200">
                <i className="fas fa-lightbulb"></i>
                <span className="font-medium">
                  ¿Usas {exactUnsupportedMatch.name}? Pídelo y lo añadimos
                </span>
              </div>
              <button
                onClick={() => handleContactRequest(exactUnsupportedMatch.name)}
                className="mt-2 text-sm bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded transition-colors"
              >
                Solicitar soporte
              </button>
            </div>
          )}

          {/* CTA para frameworks no encontrados */}
          {debouncedSearch.trim() && filteredFrameworks.length === 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 text-center">
              <div className="text-blue-600 dark:text-blue-400 mb-2">
                <i className="fas fa-search text-2xl"></i>
              </div>
              <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                No encontramos tu framework
              </h5>
              <p className="text-blue-600 dark:text-blue-300 mb-4 text-sm">
                ¿Usas "{debouncedSearch}"? Contáctanos y evaluaremos añadirlo.
              </p>
              <button
                onClick={() => handleContactRequest(debouncedSearch)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Contactanos
              </button>
            </div>
          )}

          {/* Grid de frameworks */}
          {filteredFrameworks.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filteredFrameworks.map((framework) => (
                <div
                  key={framework.id}
                  className="relative group"
                >
                  <button
                    className="w-full p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-qark-blue focus:outline-none"
                    tabIndex={0}
                    aria-label={`${framework.name} - ${framework.supported ? 'Soportado' : 'No soportado'}`}
                  >
                    <div className="text-center">
                      <div className="text-2xl text-gray-600 dark:text-gray-300 mb-2">
                        <i className={framework.icon}></i>
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                        {framework.name}
                      </div>
                    </div>
                    
                    {/* Badge de soporte */}
                    {framework.supported && (
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                        <i className="fas fa-check"></i>
                      </div>
                    )}
                  </button>
                  
                  {/* Tooltip */}
                  {framework.supported && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                      Soportado ✓
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Microcopy */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
            <small className="text-gray-500 dark:text-gray-400 text-sm">
              ¿No ves tu framework? 
              <button 
                onClick={() => handleContactRequest('framework personalizado')}
                className="text-qark-blue hover:text-qark-teal underline ml-1"
              >
                Contáctanos para solicitar soporte
              </button>
            </small>
          </div>
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