import React, { useState } from 'react';

/**
 * Componente JiraIntegration
 * 
 * Muestra la integración con Jira con funcionalidad interactiva:
 * - Panel dividido con texto/CTA y visual mock
 * - Lista de testcases fallidos con links a Jira
 * - Pie chart de bugs por severidad
 * - Modal con detalles de testcase
 * - Simulación de conexión OAuth
 * 
 * Props opcionales:
 * - onConnect?: () => void - Callback para activar integración
 * - onTestcaseClick?: (testcase: any) => void - Callback para click en testcase
 */

// Interfaces
interface JiraIssue {
  id: string;
  key: string;
  status: 'Open' | 'In Progress' | 'Done';
  severity: 'Critical' | 'Major' | 'Minor';
}

interface FailingTestcase {
  id: string;
  name: string;
  lastExecution: string;
  buildLink: string;
  jiraIssue: JiraIssue;
  stackTrace: string;
}

interface BugSeverityData {
  name: string;
  value: number;
  color: string;
}

// Datos de ejemplo
const mockFailingTestcases: FailingTestcase[] = [
  {
    id: '1',
    name: 'LoginTest.shouldAuthenticateUser',
    lastExecution: 'hace 15 min',
    buildLink: '#build-1234',
    jiraIssue: { id: '1', key: 'PROJ-123', status: 'Open', severity: 'Critical' },
    stackTrace: 'AssertionError: Expected status 200 but got 401\n  at LoginTest.java:45\n  at AuthService.authenticate()'
  },
  {
    id: '2',
    name: 'PaymentTest.shouldProcessPayment',
    lastExecution: 'hace 32 min',
    buildLink: '#build-1233',
    jiraIssue: { id: '2', key: 'PROJ-124', status: 'In Progress', severity: 'Major' },
    stackTrace: 'NullPointerException: Payment gateway returned null\n  at PaymentService.java:78\n  at PaymentController.process()'
  },
  {
    id: '3',
    name: 'UITest.shouldRenderDashboard',
    lastExecution: 'hace 1 hora',
    buildLink: '#build-1232',
    jiraIssue: { id: '3', key: 'PROJ-125', status: 'Open', severity: 'Minor' },
    stackTrace: 'ElementNotFound: Dashboard element not visible\n  at UITest.java:23\n  at WebDriver.findElement()'
  },
  {
    id: '4',
    name: 'APITest.shouldReturnUserData',
    lastExecution: 'hace 2 horas',
    buildLink: '#build-1231',
    jiraIssue: { id: '4', key: 'PROJ-126', status: 'In Progress', severity: 'Major' },
    stackTrace: 'TimeoutException: API request timed out after 30s\n  at APIClient.java:156\n  at UserService.getData()'
  }
];

const bugSeverityData: BugSeverityData[] = [
  { name: 'Critical', value: 25, color: '#ef4444' },
  { name: 'Major', value: 50, color: '#f97316' },
  { name: 'Minor', value: 25, color: '#eab308' }
];

interface Props {
  onConnect?: () => void;
  onTestcaseClick?: (testcase: FailingTestcase) => void;
}

const JiraIntegration: React.FC<Props> = ({ 
  onConnect,
  onTestcaseClick 
}) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [selectedTestcase, setSelectedTestcase] = useState<FailingTestcase | null>(null);
  const [highlightedSeverity, setHighlightedSeverity] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Simular conexión OAuth
  const handleConnect = async () => {
    setIsConnecting(true);
    
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      
      if (onConnect) {
        onConnect();
      }
    }, 2000);
  };

  // Manejar click en testcase
  const handleTestcaseClick = (testcase: FailingTestcase) => {
    setSelectedTestcase(testcase);
    setHighlightedSeverity(testcase.jiraIssue.severity);
    setShowModal(true);
    
    if (onTestcaseClick) {
      onTestcaseClick(testcase);
    }
  };

  // Renderizar pie chart simple con SVG
  const renderPieChart = () => {
    let cumulativePercentage = 0;
    
    return (
      <div className="relative w-32 h-32 mx-auto">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 42 42">
          <circle
            cx="21"
            cy="21"
            r="15.915"
            fill="transparent"
            stroke="#e5e7eb"
            strokeWidth="3"
          />
          {bugSeverityData.map((item, index) => {
            const strokeDasharray = `${item.value} ${100 - item.value}`;
            const strokeDashoffset = -cumulativePercentage;
            cumulativePercentage += item.value;
            
            return (
              <circle
                key={item.name}
                cx="21"
                cy="21"
                r="15.915"
                fill="transparent"
                stroke={highlightedSeverity === item.name ? item.color : `${item.color}80`}
                strokeWidth={highlightedSeverity === item.name ? "4" : "3"}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
              {mockFailingTestcases.length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Tests
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Obtener color del estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Done': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // Obtener color de severidad
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500';
      case 'Major': return 'bg-orange-500';
      case 'Minor': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full h-full space-y-6">
      {/* Encabezado con claim */}
      <div className="text-center">
        <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Enriquece tus dashboards activando la integración con Jira
        </h4>
        <p className="text-gray-600 dark:text-gray-400">
          Link automático entre issues y testcases
        </p>
      </div>

      {/* Panel dividido */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Izquierda - Texto y CTA */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Conecta con Jira
            </h5>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Linkea automáticamente fallos con issues en Jira y pasa metadata (PR, commit) para facilitar el triage.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <i className="fas fa-check text-green-500"></i>
                <span>Linking automático de issues</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <i className="fas fa-check text-green-500"></i>
                <span>Metadata de PR y commits</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <i className="fas fa-check text-green-500"></i>
                <span>Triage facilitado</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="space-y-3">
            {isConnected ? (
              <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 dark:text-green-300 font-medium">Conectado a Jira</span>
              </div>
            ) : (
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isConnecting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
                } text-white`}
              >
                {isConnecting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Conectando...</span>
                  </>
                ) : (
                  <>
                    <i className="fab fa-jira"></i>
                    <span>Activar integración</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Derecha - Visual mock */}
        <div className="space-y-6">
          {/* Lista de testcases fallidos */}
          <div className="space-y-4">
            <h6 className="text-md font-semibold text-gray-700 dark:text-gray-300">
              Tests fallidos recientes
            </h6>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {mockFailingTestcases.map((testcase) => (
                <div
                  key={testcase.id}
                  onClick={() => handleTestcaseClick(testcase)}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer group"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h6 className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {testcase.name}
                      </h6>
                      <div className={`w-3 h-3 rounded-full ${getSeverityColor(testcase.jiraIssue.severity)}`}></div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <i className="fas fa-clock"></i>
                        <span>{testcase.lastExecution}</span>
                        <span>•</span>
                        <a href={testcase.buildLink} className="text-blue-500 hover:text-blue-600">
                          Build
                        </a>
                      </div>
                      
                      <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(testcase.jiraIssue.status)}`}>
                        {testcase.jiraIssue.key}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pie chart de severidad */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">
              Bugs por severidad
            </h6>
            
            {renderPieChart()}
            
            <div className="mt-4 space-y-2">
              {bugSeverityData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                  </div>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal con detalles del testcase */}
      {showModal && selectedTestcase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedTestcase.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedTestcase.jiraIssue.status)}`}>
                      {selectedTestcase.jiraIssue.key}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedTestcase.jiraIssue.severity}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Stack Trace
                  </h4>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded p-3 font-mono text-xs text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    {selectedTestcase.stackTrace}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <a
                    href={selectedTestcase.buildLink}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center"
                  >
                    Ver Build
                  </a>
                  <a
                    href={`#jira-${selectedTestcase.jiraIssue.key}`}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center"
                  >
                    Abrir en Jira
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JiraIntegration;