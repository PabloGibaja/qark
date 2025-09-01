import React, { useState, useMemo } from 'react';

/**
 * Componente DetailedTracking
 * 
 * Muestra tracking detallado con dos vistas:
 * - Managers: KPIs, tendencias y dashboard de alto nivel
 * - Analysts: Tabla detallada de tests con stacktraces y filtros
 * 
 * Props opcionales:
 * - onTestClick?: (test: any) => void - Callback para click en test
 * - onFileClick?: (file: string, line: number) => void - Callback para abrir archivo
 */

// Interfaces
interface ManagerKPI {
  id: string;
  title: string;
  value: string | number;
  change: number;
  icon: string;
  color: string;
}

interface TestDetail {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'flaky' | 'na';
  duration: number;
  firstFailureBuild: string;
  file: string;
  line: number;
  stackTrace: string;
  codeSnippet: string;
  tags: string[];
  aiInsight?: string; // Nuevo campo para el insight generado por IA
  history?: ('passed' | 'failed' | 'flaky' | 'na')[]; // Nuevo campo para el historial del test
}

interface TrendData {
  date: string;
  passed: number;
  failed: number;
  flaky: number;
}

// Datos de ejemplo para Managers - Primera fila de KPIs
const mockManagerKPIs: ManagerKPI[] = [
  {
    id: 'total-tests',
    title: 'Total Tests',
    value: 2847,
    change: 12.5,
    icon: 'fas fa-vial',
    color: 'text-blue-600'
  },
  {
    id: 'pass-rate',
    title: 'Pass Rate',
    value: '94.2%',
    change: 2.1,
    icon: 'fas fa-check-circle',
    color: 'text-green-600'
  },
  {
    id: 'flaky-rate',
    title: 'Flaky Rate',
    value: '3.8%',
    change: -0.5,
    icon: 'fas fa-exclamation-triangle',
    color: 'text-yellow-600'
  },
  {
    id: 'mttr',
    title: 'MTTR',
    value: '2.4h',
    change: -15.2,
    icon: 'fas fa-clock',
    color: 'text-purple-600'
  }
];

// Segunda fila de KPIs
const mockManagerKPIsSecondRow: ManagerKPI[] = [
  {
    id: 'dre',
    title: 'DRE',
    value: '96.5%',
    change: 1.8,
    icon: 'fas fa-bug',
    color: 'text-indigo-600'
  },
  {
    id: 'coverage',
    title: 'Cobertura',
    value: '87.3%',
    change: 3.2,
    icon: 'fas fa-shield-alt',
    color: 'text-cyan-600'
  },
  {
    id: 'automation',
    title: '% Automation',
    value: '78.9%',
    change: 5.4,
    icon: 'fas fa-robot',
    color: 'text-emerald-600'
  },
  {
    id: 'execution',
    title: '% Execution',
    value: '92.1%',
    change: -1.3,
    icon: 'fas fa-play-circle',
    color: 'text-amber-600'
  }
];

const mockTrendData: TrendData[] = [
  { date: '2024-01-01', passed: 40, failed: 32, flaky: 13 },
  { date: '2024-01-02', passed: 34, failed: 25, flaky: 10 },
  { date: '2024-01-03', passed: 55, failed: 30, flaky: 15 },
  { date: '2024-01-04', passed: 60, failed: 19, flaky: 7 },
  { date: '2024-01-05', passed: 58, failed: 15, flaky: 9 },
  { date: '2024-01-06', passed: 72, failed: 8, flaky: 5 },
  { date: '2024-01-07', passed: 80, failed: 8, flaky: 3 }
];

const mockTopFailingComponents = [
  { name: 'LoginService', failures: 23, percentage: 28 },
  { name: 'PaymentAPI', failures: 18, percentage: 22 },
  { name: 'UserDashboard', failures: 15, percentage: 18 },
  { name: 'NotificationSystem', failures: 12, percentage: 15 },
  { name: 'ReportGenerator', failures: 8, percentage: 10 },
  { name: 'Others', failures: 6, percentage: 7 }
];

// Datos de ejemplo para Analysts
const mockTestDetails: TestDetail[] = [
  {
    id: '1',
    name: 'Login.shouldLogValidUser',
    status: 'failed',
    duration: 2.3,
    firstFailureBuild: '#1234',
    file: 'src/test/LoginTest.java',
    line: 45,
    stackTrace: 'AssertionError: Expected status 200 but got 401\n  at LoginTest.java:45\n  at AuthService.authenticate()\n  at UserController.login()',
    codeSnippet: 'public void shouldAuthenticateValidUser() {\n  User user = new User("test@example.com", "password");\n  Response response = authService.authenticate(user);\n  assertEquals(200, response.getStatus()); // Line 45\n}',
    tags: ['authentication', 'critical'],
    aiInsight: 'El error 401 indica un problema de autenticación. Verifica las credenciales del usuario de prueba o si hay cambios recientes en la lógica de autenticación. Posiblemente el token de sesión esté caducado o el servicio de autenticación no está respondiendo correctamente.',
    history: ['na', 'passed', 'passed', 'failed', 'failed']
  },
  {
    id: '2',
    name: 'Payment.processCreditCard',
    status: 'flaky',
    duration: 5.7,
    firstFailureBuild: '#1230',
    file: 'src/test/PaymentTest.java',
    line: 78,
    stackTrace: 'TimeoutException: Payment gateway timeout after 30s\n  at PaymentService.java:156\n  at PaymentController.process()\n  at CreditCardProcessor.charge()',
    codeSnippet: 'public void shouldProcessCreditCard() {\n  CreditCard card = new CreditCard("4111111111111111");\n  PaymentResult result = paymentService.process(card, 100.0);\n  assertTrue(result.isSuccessful()); // Line 78\n}',
    tags: ['payment', 'integration'],
    aiInsight: 'Este test es inestable debido a timeouts en la pasarela de pago. Considera aumentar el tiempo de espera o implementar un mock para la pasarela de pago en pruebas. La naturaleza asíncrona de las transacciones de pago suele causar estos problemas de estabilidad.',
    history: ['passed', 'failed', 'failed', 'na', 'flaky']
  },
  {
    id: '3',
    name: 'UITest.renderUserDashboard',
    status: 'passed',
    duration: 1.2,
    firstFailureBuild: '',
    file: 'src/test/UITest.java',
    line: 23,
    stackTrace: '',
    codeSnippet: 'public void shouldRenderUserDashboard() {\n  driver.get("/dashboard");\n  WebElement dashboard = driver.findElement(By.id("dashboard"));\n  assertTrue(dashboard.isDisplayed()); // Line 23\n}',
    tags: ['ui', 'smoke'],
    aiInsight: 'El test lleva pasando establemente 7 builds',
    history: ['passed', 'passed', 'passed', 'passed', 'passed']
  },
  {
    id: '4',
    name: 'APITest.returnUserProfile',
    status: 'failed',
    duration: 0.8,
    firstFailureBuild: '#1235',
    file: 'src/test/APITest.java',
    line: 67,
    stackTrace: 'NullPointerException: User profile is null\n  at APITest.java:67\n  at UserService.getProfile()\n  at ProfileController.getUserProfile()',
    codeSnippet: 'public void shouldReturnUserProfile() {\n  String userId = "user123";\n  UserProfile profile = userService.getProfile(userId);\n  assertNotNull(profile); // Line 67\n  assertEquals("John Doe", profile.getName());\n}',
    tags: ['api', 'regression'],
    aiInsight: 'El NullPointerException sugiere que el servicio no está encontrando el perfil del usuario "user123". Verifica si este ID existe en la base de datos de prueba o si hay un problema con la conexión a la base de datos. También podría ser necesario revisar si hay cambios recientes en la estructura de datos de UserProfile.',
    history: ['passed', 'failed', 'passed', 'passed', 'failed']
  },
  {
    id: '5',
    name: 'Security.preventSQLInjection',
    status: 'passed',
    duration: 3.1,
    firstFailureBuild: '',
    file: 'src/test/SecurityTest.java',
    line: 89,
    stackTrace: '',
    codeSnippet: 'public void shouldPreventSQLInjection() {\n  String maliciousInput = "1\' OR \'1\'=\'1";\n  Result result = userService.findUser(maliciousInput);\n  assertNull(result); // Line 89\n}',
    tags: ['security', 'critical'],
    aiInsight: 'Los tiempos de ejecución tienen una varianza de 2.3 segundos, aunque pasa establemente desde hace 7 builds ',
    history: ['passed', 'passed', 'passed', 'passed', 'passed']

  }
];

interface Props {
  onTestClick?: (test: TestDetail) => void;
  onFileClick?: (file: string, line: number) => void;
}

const DetailedTracking: React.FC<Props> = ({ 
  onTestClick,
  onFileClick 
}) => {
  const [activeView, setActiveView] = useState<'managers' | 'analysts'>('managers');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortField, setSortField] = useState<keyof TestDetail>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [expandedTest, setExpandedTest] = useState<string | null>(null);

  // Filtrar y ordenar tests para vista de analysts
  const filteredAndSortedTests = useMemo(() => {
    let filtered = mockTestDetails;
    
    // Filtrar por término de búsqueda
    if (searchTerm.trim()) {
      filtered = filtered.filter(test => 
        test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Ordenar
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
    
    return filtered;
  }, [searchTerm, sortField, sortDirection]);

  // Manejar ordenamiento
  const handleSort = (field: keyof TestDetail) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Obtener color del estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'flaky': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // Renderizar gráfico lineal para tendencia
  const renderLineChart = (data: TrendData[]) => {
    const height = 120;
    const width = 100;
    const padding = 10;
    
    // Calcular valores máximos para escalar el gráfico
    const maxPassed = Math.max(...data.map(d => d.passed));
    const maxFailed = Math.max(...data.map(d => d.failed));
    const maxFlaky = Math.max(...data.map(d => d.flaky));
    const maxValue = Math.max(maxPassed, maxFailed, maxFlaky);
    
    // Generar puntos para cada línea
    const passedPoints = data.map((d, i) => {
      const x = padding + ((width - padding * 2) * i / (data.length - 1));
      const y = height - padding - ((height - padding * 2) * d.passed / maxValue);
      return `${x},${y}`;
    }).join(' ');
    
    const failedPoints = data.map((d, i) => {
      const x = padding + ((width - padding * 2) * i / (data.length - 1));
      const y = height - padding - ((height - padding * 2) * d.failed / maxValue);
      return `${x},${y}`;
    }).join(' ');
    
    const flakyPoints = data.map((d, i) => {
      const x = padding + ((width - padding * 2) * i / (data.length - 1));
      const y = height - padding - ((height - padding * 2) * d.flaky / maxValue);
      return `${x},${y}`;
    }).join(' ');
    
    // Generar etiquetas de fechas
    const dateLabels = data.map((d, i) => {
      const x = padding + ((width - padding * 2) * i / (data.length - 1));
      return (
        <text 
          key={`date-${i}`}
          x={x} 
          y={height - 2} 
          textAnchor="middle"
          className="text-[6px] fill-gray-500 dark:fill-gray-400"
        >
          {d.date.slice(8)} {/* Mostrar solo MM-DD */}
        </text>
      );
    });
    
    return (
      <svg className="w-full h-40" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        {/* Línea base */}
        <line 
          x1={padding} 
          y1={height - padding} 
          x2={width - padding} 
          y2={height - padding} 
          stroke="#9ca3af" 
          strokeWidth="0.5" 
          strokeDasharray="1,1"
        />
        
        {/* Líneas de datos */}
        <polyline
          fill="none"
          stroke="#22c55e" // Verde para passed
          strokeWidth="1.5"
          points={passedPoints}
        />
        <polyline
          fill="none"
          stroke="#ef4444" // Rojo para failed
          strokeWidth="1.5"
          points={failedPoints}
        />
        <polyline
          fill="none"
          stroke="#eab308" // Amarillo para flaky
          strokeWidth="1.5"
          points={flakyPoints}
        />
        
        {/* Puntos en cada dato */}
        {data.map((d, i) => {
          const x = padding + ((width - padding * 2) * i / (data.length - 1));
          const yPassed = height - padding - ((height - padding * 2) * d.passed / maxValue);
          const yFailed = height - padding - ((height - padding * 2) * d.failed / maxValue);
          const yFlaky = height - padding - ((height - padding * 2) * d.flaky / maxValue);
          
          return (
            <React.Fragment key={`points-${i}`}>
              <circle cx={x} cy={yPassed} r="1" fill="#22c55e" />
              <circle cx={x} cy={yFailed} r="1" fill="#ef4444" />
              <circle cx={x} cy={yFlaky} r="1" fill="#eab308" />
            </React.Fragment>
          );
        })}
        
        {/* Etiquetas de fechas */}
        {dateLabels}
      </svg>
    );
  };

  // Renderizar pie chart simple
  const renderPieChart = () => {
    let cumulativePercentage = 0;
    
    return (
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 42 42">
          <circle
            cx="21"
            cy="21"
            r="15.915"
            fill="transparent"
            stroke="#e5e7eb"
            strokeWidth="3"
          />
          {mockTopFailingComponents.slice(0, 5).map((component, index) => {
            const colors = ['#ef4444', '#f97316', '#eab308', '#06b6d4', '#8b5cf6'];
            const strokeDasharray = `${component.percentage} ${100 - component.percentage}`;
            const strokeDashoffset = -cumulativePercentage;
            cumulativePercentage += component.percentage;
            
            return (
              <circle
                key={component.name}
                cx="21"
                cy="21"
                r="15.915"
                fill="transparent"
                stroke={colors[index]}
                strokeWidth="3"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
              />
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className="w-full h-full space-y-6">
      {/* Toggle/Tabs */}
      <div className="flex justify-center">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 flex">
          <button
            onClick={() => setActiveView('managers')}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
              activeView === 'managers'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <i className="fas fa-chart-line mr-2"></i>
            Managers
          </button>
          <button
            onClick={() => setActiveView('analysts')}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
              activeView === 'analysts'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <i className="fas fa-table mr-2"></i>
            Analysts
          </button>
        </div>
      </div>

      {/* Vista de Managers */}
      {activeView === 'managers' && (
        <div className="space-y-6 animate-fade-in">
          {/* Primera fila de KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {mockManagerKPIs.map((kpi) => (
              <div key={kpi.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <div className={`text-2xl ${kpi.color}`}>
                    <i className={kpi.icon}></i>
                  </div>
                  <div className={`text-xs font-medium px-2 py-1 rounded ${
                    kpi.change >= 0 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {kpi.change >= 0 ? '+' : ''}{kpi.change}%
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {kpi.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {kpi.title}
                </div>
              </div>
            ))}
          </div>
          
          {/* Segunda fila de KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {mockManagerKPIsSecondRow.map((kpi) => (
              <div key={kpi.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <div className={`text-2xl ${kpi.color}`}>
                    <i className={kpi.icon}></i>
                  </div>
                  <div className={`text-xs font-medium px-2 py-1 rounded ${
                    kpi.change >= 0 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {kpi.change >= 0 ? '+' : ''}{kpi.change}%
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {kpi.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {kpi.title}
                </div>
              </div>
            ))}
          </div>

          {/* Tendencia y Top Failing Components */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Área de tendencia - Ahora con gráfico lineal */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
              <h6 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Tendencia de Tests (7 días)
              </h6>
              <div>
                {renderLineChart(mockTrendData)}
              </div>
              <div className="mt-4 flex justify-center space-x-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Passed</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Failed</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Flaky</span>
                </div>
              </div>
            </div>

            {/* Top Failing Components */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
              <h6 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Top Failing Components
              </h6>
              <div className="flex items-center space-x-4">
                {renderPieChart()}
                <div className="flex-1 space-y-2">
                  {mockTopFailingComponents.slice(0, 4).map((component, index) => {
                    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-cyan-500'];
                    return (
                      <div key={component.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${colors[index]}`}></div>
                          <span className="text-gray-700 dark:text-gray-300">{component.name}</span>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400">{component.failures}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vista de Analysts */}
      {activeView === 'analysts' && (
        <div className="space-y-6 animate-fade-in">
          {/* Mensaje de alerta */}
          <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 p-4 rounded-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <i className="fas fa-info-circle text-blue-600 dark:text-blue-400 text-lg"></i>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                  Build ejecutada en 15m 32s. Resultados e insights disponibles
                </p>
              </div>
            </div>
          </div>
          
          {/* Tabla de tests - Optimizada para móviles */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
            <div className="md:overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th 
                      className="px-2 md:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 w-full md:w-auto"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Test Name</span>
                        {sortField === 'name' && (
                          <i className={`fas fa-chevron-${sortDirection === 'asc' ? 'up' : 'down'}`}></i>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-2 md:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 hidden sm:table-cell"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Status</span>
                        {sortField === 'status' && (
                          <i className={`fas fa-chevron-${sortDirection === 'asc' ? 'up' : 'down'}`}></i>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-2 md:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 hidden md:table-cell"
                      onClick={() => handleSort('duration')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Duration</span>
                        {sortField === 'duration' && (
                          <i className={`fas fa-chevron-${sortDirection === 'asc' ? 'up' : 'down'}`}></i>
                        )}
                      </div>
                    </th>
                    <th className="px-2 md:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                      Historial
                    </th>
                    <th className="px-2 md:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                      Detalle
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {filteredAndSortedTests.map((test) => (
                    <React.Fragment key={test.id}>
                      <tr 
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => setExpandedTest(expandedTest === test.id ? null : test.id)}
                      >
                        <td className="px-2 md:px-4 py-3">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center justify-between">
                              <div className="flex items-center">
                                <span className="mr-2 sm:hidden">
                                  <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${getStatusColor(test.status)}`}>
                                    {test.status.toUpperCase()}
                                  </span>
                                </span>
                                <span className="sm:max-w-none">{test.name}</span>
                              </div>
                              <div className="flex items-center sm:hidden">
                                <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">{test.duration}s</span>
                                <i className={`fas fa-chevron-${expandedTest === test.id ? 'up' : 'down'} text-gray-400`}></i>
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center justify-between mt-1 sm:hidden">
                              <div className="flex flex-wrap gap-1">
                                {test.tags.map((tag) => (
                                  <span key={tag} className="inline-block bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs px-1 py-0.5 rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <div className="ml-2">
                                {renderTestHistory(test.history)}
                              </div>
                            </div>
                            <div className="hidden sm:flex sm:flex-wrap gap-1 mt-1">
                              {test.tags.map((tag) => (
                                <span key={tag} className="inline-block bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs px-1 py-0.5 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="px-2 md:px-4 py-3 hidden sm:table-cell">
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getStatusColor(test.status)}`}>
                            {test.status}
                          </span>
                        </td>
                        <td className="px-2 md:px-4 py-3 text-sm text-gray-900 dark:text-white hidden md:table-cell">
                          {test.duration}s
                        </td>
                        <td className="px-2 md:px-4 py-3 hidden sm:table-cell">
                          {renderTestHistory(test.history)}
                        </td>
                        <td className="px-2 md:px-4 py-3 hidden sm:table-cell">
                          <div className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                            <i className={`fas fa-chevron-${expandedTest === test.id ? 'up' : 'down'}`}></i>
                            <span className="ml-1 hidden sm:inline">Stack Trace</span>
                          </div>
                        </td>
                      </tr>
                      {expandedTest === test.id && (
                        <tr>
                          <td colSpan={5} className="px-2 md:px-4 py-3 bg-gray-50 dark:bg-gray-700">
                            <div className="space-y-4">
                              <div>
                                <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                  <i className="fas fa-robot mr-2"></i>
                                  Insights
                                </h6>
                                <div className="bg-indigo-50 dark:bg-indigo-900 border-l-4 border-indigo-500 p-3 rounded text-sm text-gray-800 dark:text-gray-200">
                                  {test.aiInsight}
                                </div>
                              </div>
                              <div>
                                <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                  Stack Trace
                                </h6>
                                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs overflow-x-auto">
                                  <pre className="whitespace-pre-wrap">{test.stackTrace || 'No stack trace available'}</pre>
                                </div>
                              </div>
                              <div>
                                <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                  Code Snippet
                                </h6>
                                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-xs overflow-x-auto">
                                  <pre className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{test.codeSnippet}</pre>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedTracking;

// Renderizar historial del test como cajitas coloreadas
const renderTestHistory = (history?: ('passed' | 'failed' | 'flaky' | 'na')[]) => {
  if (!history || history.length === 0) {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-3 h-3 bg-gray-200 dark:bg-gray-600 rounded-sm"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex space-x-1">
      {history.slice(-5).map((status, i) => {
        let bgColor = '';
        switch (status) {
          case 'passed':
            bgColor = 'bg-green-500';
            break;
          case 'failed':
            bgColor = 'bg-red-500';
            break;
          case 'flaky':
            bgColor = 'bg-yellow-500';
            break;
          default:
            bgColor = 'bg-gray-200 dark:bg-gray-600';
        }
        return <div key={i} className={`w-3 h-3 ${bgColor} rounded-sm`}></div>;
      })}
    </div>
  );
};