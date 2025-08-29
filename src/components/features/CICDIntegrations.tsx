import React, { useState } from 'react';

/**
 * Componente CICDIntegrations
 * 
 * Muestra soporte para herramientas de CI/CD con funcionalidad interactiva:
 * - Grid de logos de CI/CD con tooltips
 * - Tarjeta explicativa con dos columnas (enviar resultados vs relanzar pipeline)
 * - Botón simulado para relanzar pipeline con animación
 * - Links a documentación
 * 
 * Props opcionales:
 * - onPipelineRelaunch?: () => void - Callback para relanzar pipeline
 * - onDocsClick?: () => void - Callback para abrir documentación
 */

// Interfaces
interface CICDTool {
  id: string;
  name: string;
  icon: string; // Clase de devicon o ruta de imagen
  color: string;
  supported: boolean;
}

// Datos de herramientas CI/CD
const cicdTools: CICDTool[] = [
  { id: 'github-actions', name: 'GitHub Actions', icon: 'devicon-github-original', color: 'text-gray-800', supported: true },
  { id: 'jenkins', name: 'Jenkins', icon: 'devicon-jenkins-line', color: 'text-blue-600', supported: true },
  { id: 'gitlab-ci', name: 'GitLab CI', icon: 'devicon-gitlab-plain', color: 'text-orange-600', supported: true },
  { id: 'circleci', name: 'CircleCI', icon: 'devicon-circleci-plain', color: 'text-green-600', supported: true },
  { id: 'travis-ci', name: 'Travis CI', icon: 'fas fa-cube', color: 'text-yellow-600', supported: true },
  { id: 'azure-pipelines', name: 'Azure Pipelines', icon: 'devicon-azure-plain', color: 'text-blue-700', supported: true },
  { id: 'bitbucket', name: 'Bitbucket Pipelines', icon: 'devicon-bitbucket-original', color: 'text-blue-800', supported: true },
  { id: 'drone', name: 'Drone', icon: 'fas fa-paper-plane', color: 'text-gray-600', supported: true }
];

interface Props {
  onPipelineRelaunch?: () => void;
  onDocsClick?: () => void;
}

const CICDIntegrations: React.FC<Props> = ({ 
  onPipelineRelaunch,
  onDocsClick 
}) => {
  const [isRelaunching, setIsRelaunching] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  // Simular relanzamiento de pipeline
  const handlePipelineRelaunch = async () => {
    setIsRelaunching(true);
    
    // Simular delay de API
    setTimeout(() => {
      setIsRelaunching(false);
      setShowSuccessToast(true);
      
      if (onPipelineRelaunch) {
        onPipelineRelaunch();
      }
      
      // Ocultar toast después de 3 segundos
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);
    }, 2000);
  };

  // Manejar click en documentación
  const handleDocsClick = () => {
    if (onDocsClick) {
      onDocsClick();
    } else {
      // Simular navegación a docs
      console.log('Navegando a /docs/integrations/ci');
    }
  };

  return (
    <div className="w-full h-full space-y-8">
      {/* Encabezado con claim */}
      <div className="text-center">
        <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Utiliza nuestra API o integra nuestra action en tu workflow
        </h4>
      </div>

      {/* Grid de logos CI/CD */}
      <div className="space-y-4">
       
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {cicdTools.map((tool) => (
            <div
              key={tool.id}
              className="relative group flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className={`text-3xl ${tool.color} group-hover:scale-110 transition-transform duration-300 mb-2`}>
                <i className={tool.icon}></i>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                {tool.name}
              </span>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                Conectar {tool.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tarjeta explicativa con dos columnas */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Columna izquierda - Enviar resultados */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <i className="fas fa-upload text-blue-600 dark:text-blue-400"></i>
              </div>
              <h6 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Enviar resultados
              </h6>
            </div>
            
            <div className="space-y-3">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Opción 1:</strong> HTTP POST a nuestra API REST
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded p-3 font-mono text-xs">
                <code className="text-gray-800 dark:text-gray-200">
                  POST /api/v1/results/upload<br/>
                  Content-Type: application/json
                </code>
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Opción 2:</strong> GitHub Action
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded p-3 font-mono text-xs">
                <code className="text-gray-800 dark:text-gray-200">
                  - uses: qark/upload-results@v1<br/>
                  &nbsp;&nbsp;with:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;results-path: ./test-results
                </code>
              </div>
            </div>
          </div>

          {/* Columna derecha - Relanzar pipeline */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <i className="fas fa-redo text-green-600 dark:text-green-400"></i>
              </div>
              <h6 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Relanzar pipeline
              </h6>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Relanza tu último build directamente desde QArk sin salir de la plataforma.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={handlePipelineRelaunch}
                disabled={isRelaunching}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isRelaunching
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5'
                } text-white`}
              >
                {isRelaunching ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Relanzando...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-play"></i>
                    <span>Relanzar último build</span>
                  </>
                )}
              </button>
              
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mt-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <div className="flex items-center space-x-1">
                      <i className="fab fa-git-alt text-orange-500"></i>
                      <span className="font-medium">main</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <div className="flex items-center space-x-1">
                      <i className="fas fa-clock text-blue-500"></i>
                      <span>hace 2 horas</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-600 dark:text-green-400 font-medium text-xs">Exitoso</span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-commit text-gray-400"></i>
                    <span className="font-mono">a1b2c3d</span>
                    <span>•</span>
                    <span>"Fix: Update test configuration"</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Microcopy y documentación */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="text-sm text-blue-800 dark:text-blue-200">
            Consulta nuestra documentación y elige la forma de integrarte que más te convenga.
          </div>
          <button
            onClick={handleDocsClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center space-x-2 whitespace-nowrap"
          >
            <i className="fas fa-book"></i>
            <span>Ver docs</span>
          </button>
        </div>
      </div>

      {/* Toast de éxito */}
      {showSuccessToast && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 animate-fade-in">
          <i className="fas fa-check-circle"></i>
          <span>Pipeline relanzado exitosamente</span>
        </div>
      )}
    </div>
  );
};

export default CICDIntegrations;