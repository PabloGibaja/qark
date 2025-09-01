import React, { useState } from 'react';

/**
 * Componente JiraIntegration
 * 
 * Muestra la integración con Jira con funcionalidad interactiva:
 * - Estado inicial: Solo texto y botón de activación
 * - Estado conectado: Tests con etiquetas Jira + gráficos (pie chart + barras apiladas)
 * 
 * Props opcionales:
 * - onConnect?: () => void - Callback para activar integración
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
  testStatus: 'FAILED' | 'FLAKY';
}

interface BugSeverityData {
  name: string;
  value: number;
  color: string;
}

interface HistoricalData {
  week: string;
  passed: number;
  failed: number;
  flaky: number;
}

// Datos de ejemplo
const mockFailingTestcases: FailingTestcase[] = [
  {
    id: '1',
    name: 'LoginTest.shouldAuthenticateUser',
    lastExecution: 'hace 15 min',
    buildLink: '#build-1234',
    jiraIssue: { id: '1', key: 'BUG-1298', status: 'Open', severity: 'Critical' },
    stackTrace: 'AssertionError: Expected status 200 but got 401\n  at LoginTest.java:45\n  at AuthService.authenticate()',
    testStatus: 'FAILED'
  },
  {
    id: '2',
    name: 'PaymentTest.shouldProcessPayment',
    lastExecution: 'hace 32 min',
    buildLink: '#build-1233',
    jiraIssue: { id: '2', key: 'BUG-1252', status: 'Open', severity: 'Critical' },
    stackTrace: 'NullPointerException: Payment gateway returned null\n  at PaymentService.java:78\n  at PaymentController.process()',
    testStatus: 'FAILED'
  }
];

const bugSeverityData: BugSeverityData[] = [
  { name: 'Critical', value: 20, color: '#ef4444' },
  { name: 'Major', value: 48, color: '#fa9c1c' },
  { name: 'Minor', value: 32, color: '#0f52ba' }
];

const historicalData: HistoricalData[] = [
  { week: 'S1', passed: 85, failed: 10, flaky: 5 },
  { week: 'S2', passed: 78, failed: 15, flaky: 7 },
  { week: 'S3', passed: 82, failed: 12, flaky: 6 },
  { week: 'S4', passed: 88, failed: 8, flaky: 4 },
  { week: 'S5', passed: 75, failed: 18, flaky: 7 },
  { week: 'S6', passed: 90, failed: 7, flaky: 3 }
];

interface Props {
  onConnect?: () => void;
}

const JiraIntegration: React.FC<Props> = ({ 
  onConnect
}) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [progressWidth, setProgressWidth] = useState<number>(0);

  // Simular conexión OAuth
  const handleConnect = async () => {
    setIsConnecting(true);
    setProgressWidth(0);
    
    // Animar el progreso
    const interval = setInterval(() => {
      setProgressWidth(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5; // Incrementa 5% cada 100ms para completar en 2s
      });
    }, 100);
    
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      setProgressWidth(0);
      clearInterval(interval);
      
      if (onConnect) {
        onConnect();
      }
    }, 2000);
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
                stroke={item.color}
                strokeWidth="3"
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
              Issues
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Renderizar gráfico de barras apiladas
  const renderStackedBarChart = () => {
    const maxValue = Math.max(...historicalData.map(d => d.passed + d.failed + d.flaky));
    
    return (
      <div className="space-y-3">
        <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
          Histórico semanal
        </h6>
        <div className="flex items-end justify-between space-x-1 h-32">
          {historicalData.map((data, index) => {
            const total = data.passed + data.failed + data.flaky;
            const passedHeight = (data.passed / maxValue) * 100;
            const failedHeight = (data.failed / maxValue) * 100;
            const flakyHeight = (data.flaky / maxValue) * 100;
            
            return (
              <div key={index} className="flex flex-col items-center space-y-1 flex-1">
                <div className="w-full flex flex-col" style={{ height: '100px' }}>
                  <div 
                    className="bg-red-500 w-full"
                    style={{ height: `${failedHeight}%` }}
                  ></div>
                  <div 
                    className="bg-yellow-500 w-full"
                    style={{ height: `${flakyHeight}%` }}
                  ></div>
                  <div 
                    className="bg-green-500 w-full"
                    style={{ height: `${passedHeight}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{data.week}</span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Exitoso</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Skipped</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Fallido</span>
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

  // Obtener color y estilo de la etiqueta de test
  const getTestStatusStyle = (testStatus: 'FAILED' | 'FLAKY') => {
    switch (testStatus) {
      case 'FAILED': return 'bg-red-500 text-white';
      case 'FLAKY': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
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
          Controla todo el ciclo de pruebas
        </h4>
        <p className="text-gray-600 dark:text-gray-400">
          Link automático entre issues, testcases y bugs
        </p>
      </div>

      {/* Estado inicial - Tests fallidos sin etiquetas Jira */}
      {!isConnected && (
        <div className="space-y-6">
          <div className="max-w-4xl mx-auto text-center space-y-4">
           
          </div>

          {/* Layout de 2 columnas - Texto izquierda, Tests derecha */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Columna 1: Beneficios y CTA */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <i className="fas fa-check text-green-500"></i>
                  <span>Summary, status, severity</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <i className="fas fa-check text-green-500"></i>
                  <span>Metadata de PR y commits disponible en Jira</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <i className="fas fa-check text-green-500"></i>
                  <span>Widgets de Jira disponibles en los dashboards</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <i className="fas fa-check text-green-500"></i>
                  <span>Insights disponibles en los issues de Jira</span>
                </div>
              </div>

              {/* CTA Button con animación de progreso */}
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className={`relative w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 overflow-hidden ${
                  isConnecting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
                } text-white`}
              >
                {/* Barra de progreso animada */}
                {isConnecting && (
                  <div 
                    className="absolute inset-y-0 left-0 bg-green-600 transition-all duration-100 ease-linear"
                    style={{ width: `${progressWidth}%` }}
                  >
                  </div>
                )}
                
                <div className="relative z-10 flex items-center space-x-2">
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
                </div>
              </button>
            </div>

            {/* Columna 2: Tests fallidos recientes */}
            <div className="space-y-4">
              <h6 className="text-md font-semibold text-gray-700 dark:text-gray-300">
                Tests fallidos recientes
              </h6>
              
              <div className="space-y-3">
                {mockFailingTestcases.map((testcase) => (
                  <div
                    key={testcase.id}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <h6 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            {testcase.name}
                          </h6>
                          
                        </div>
                        <div className={`w-3 h-3 rounded-full ${getSeverityColor(testcase.jiraIssue.severity)}`}></div>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-2">
                          <i className="fas fa-clock"></i>
                          <span>{testcase.lastExecution}</span>
                          <span>•</span>
                          <a className="text-blue-500 hover:text-blue-600">
                            Build
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estado conectado - Layout 2 columnas x 2 filas */}
      {isConnected && (
        <div className="space-y-6">
          <div className="max-w-4xl mx-auto text-center space-y-4">
           
          </div>

          {/* Primera fila: Texto izquierda, Tests CON etiquetas Jira derecha */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Columna 1: Beneficios y botón conectado */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <i className="fas fa-check text-green-500"></i>
                  <span>Summary, status, severity</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <i className="fas fa-check text-green-500"></i>
                  <span>Metadata de PR y commits disponible en Jira</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <i className="fas fa-check text-green-500"></i>
                  <span>Widgets de Jira disponibles en los dashboards</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <i className="fas fa-check text-green-500"></i>
                  <span>Insights disponibles en los issues de Jira</span>
                </div>
              </div>

              {/* Botón conectado */}
              <div className="w-full py-3 px-4 rounded-lg font-semibold bg-green-600 text-white flex items-center justify-center space-x-2">
                <i className="fas fa-check-circle"></i>
                <span>Jira conectado</span>
              </div>
            </div>

            {/* Columna 2: Tests fallidos CON etiquetas Jira */}
            <div className="space-y-4">
              <h6 className="text-md font-semibold text-gray-700 dark:text-gray-300">
                Tests fallidos recientes
              </h6>
              
              <div className="space-y-3">
                {mockFailingTestcases.map((testcase) => (
                  <div
                    key={testcase.id}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <h6 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            {testcase.name}
                          </h6>
                          
                        </div>
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
                        
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(testcase.jiraIssue.status)} relative overflow-hidden`}>
                          {/* Efecto shiny más exagerado */}
                          <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" style={{animationDelay: '0s'}}></div>
                          <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" style={{animationDelay: '0.5s'}}></div>
                          <span className="relative z-10">{testcase.jiraIssue.key} ({testcase.jiraIssue.status})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Segunda fila: Gráficos (2 columnas) */}
          <div className="grid md:grid-cols-2 gap-8 animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
            {/* Pie chart de severidad */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 transform transition-all duration-500 hover:scale-105">
              <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">
                Bugs por severidad
              </h6>
              
              <div className="animate-[scaleIn_0.8s_ease-out_0.5s_both]">
                {renderPieChart()}
              </div>
              
              <div className="mt-4 space-y-2 animate-[fadeIn_1s_ease-out_0.7s_both]">
                {bugSeverityData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between text-xs transform transition-all duration-300 hover:translate-x-1">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full transition-all duration-300 hover:scale-125" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                    </div>
                    <span className="text-gray-800 dark:text-gray-200 font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gráfico de barras apiladas */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 transform transition-all duration-500 hover:scale-105 animate-[slideInRight_0.6s_ease-out_0.4s_both]">
              <div className="animate-[fadeIn_0.8s_ease-out_0.6s_both]">
                {renderStackedBarChart()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JiraIntegration;