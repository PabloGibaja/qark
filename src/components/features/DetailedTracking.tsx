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
  status: 'passed' | 'failed' | 'flaky';
  duration: number;
  firstFailureBuild: string;
  file: string;
  line: number;
  stackTrace: string;
  codeSnippet: string;
  tags: string[];
}

interface TrendData {
  date: string;
  passed: number;
  failed: number;
  flaky: number;
}

// Datos de ejemplo para Managers
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

const mockTrendData: TrendData[] = [
  { date: '2024-01-01', passed: 2680, failed: 120, flaky: 47 },
  { date: '2024-01-02', passed: 2695, failed: 115, flaky: 37 },
  { date: '2024-01-03', passed: 2710, failed: 98, flaky: 39 },
  { date: '2024-01-04', passed: 2725, failed: 85, flaky: 37 },
  { date: '2024-01-05', passed: 2740, failed: 72, flaky: 35 },
  { date: '2024-01-06', passed: 2755, failed: 67, flaky: 25 },
  { date: '2024-01-07', passed: 2680, failed: 125, flaky: 42 }
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
    name: 'LoginTest.shouldAuthenticateValidUser',
    status: 'failed',
    duration: 2.3,
    firstFailureBuild: '#1234',
    file: 'src/test/LoginTest.java',
    line: 45,
    stackTrace: 'AssertionError: Expected status 200 but got 401\n  at LoginTest.java:45\n  at AuthService.authenticate()\n  at UserController.login()',
    codeSnippet: 'public void shouldAuthenticateValidUser() {\n  User user = new User("test@example.com", "password");\n  Response response = authService.authenticate(user);\n  assertEquals(200, response.getStatus()); // Line 45\n}',
    tags: ['authentication', 'critical']
  },
  {
    id: '2',
    name: 'PaymentTest.shouldProcessCreditCard',
    status: 'flaky',
    duration: 5.7,
    firstFailureBuild: '#1230',
    file: 'src/test/PaymentTest.java',
    line: 78,
    stackTrace: 'TimeoutException: Payment gateway timeout after 30s\n  at PaymentService.java:156\n  at PaymentController.process()\n  at CreditCardProcessor.charge()',
    codeSnippet: 'public void shouldProcessCreditCard() {\n  CreditCard card = new CreditCard("4111111111111111");\n  PaymentResult result = paymentService.process(card, 100.0);\n  assertTrue(result.isSuccessful()); // Line 78\n}',
    tags: ['payment', 'integration']
  },
  {
    id: '3',
    name: 'UITest.shouldRenderUserDashboard',
    status: 'passed',
    duration: 1.2,
    firstFailureBuild: '',
    file: 'src/test/UITest.java',
    line: 23,
    stackTrace: '',
    codeSnippet: 'public void shouldRenderUserDashboard() {\n  driver.get("/dashboard");\n  WebElement dashboard = driver.findElement(By.id("dashboard"));\n  assertTrue(dashboard.isDisplayed()); // Line 23\n}',
    tags: ['ui', 'smoke']
  },
  {
    id: '4',
    name: 'APITest.shouldReturnUserProfile',
    status: 'failed',
    duration: 0.8,
    firstFailureBuild: '#1235',
    file: 'src/test/APITest.java',
    line: 67,
    stackTrace: 'NullPointerException: User profile is null\n  at APITest.java:67\n  at UserService.getProfile()\n  at ProfileController.getUserProfile()',
    codeSnippet: 'public void shouldReturnUserProfile() {\n  String userId = "user123";\n  UserProfile profile = userService.getProfile(userId);\n  assertNotNull(profile); // Line 67\n  assertEquals("John Doe", profile.getName());\n}',
    tags: ['api', 'regression']
  },
  {
    id: '5',
    name: 'SecurityTest.shouldPreventSQLInjection',
    status: 'passed',
    duration: 3.1,
    firstFailureBuild: '',
    file: 'src/test/SecurityTest.java',
    line: 89,
    stackTrace: '',
    codeSnippet: 'public void shouldPreventSQLInjection() {\n  String maliciousInput = "1\' OR \'1\'=\'1";\n  Result result = userService.findUser(maliciousInput);\n  assertNull(result); // Line 89\n}',
    tags: ['security', 'critical']
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

  // Renderizar sparkline simple
  const renderSparkline = (data: TrendData[]) => {
    const maxValue = Math.max(...data.map(d => d.passed + d.failed + d.flaky));
    const points = data.map((d, i) => {
      const total = d.passed + d.failed + d.flaky;
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - (total / maxValue) * 100;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg className="w-full h-12" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          points={points}
          className="text-blue-500"
        />
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
          {/* KPI Cards */}
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

          {/* Tendencia y Top Failing Components */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Área de tendencia */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
              <h6 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Tendencia de Tests (7 días)
              </h6>
              <div className="text-blue-500">
                {renderSparkline(mockTrendData)}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-green-600">2755</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Passed</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-red-600">67</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Failed</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-yellow-600">25</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Flaky</div>
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
          {/* Buscador y filtros */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nombre o tag..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {filteredAndSortedTests.length} tests encontrados
              </div>
            </div>
          </div>

          {/* Tabla de tests */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
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
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
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
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => handleSort('duration')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Duration</span>
                        {sortField === 'duration' && (
                          <i className={`fas fa-chevron-${sortDirection === 'asc' ? 'up' : 'down'}`}></i>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      First Failure
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      File:Line
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {filteredAndSortedTests.map((test) => (
                    <React.Fragment key={test.id}>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {test.name}
                            </div>
                            <div className="flex space-x-1 mt-1">
                              {test.tags.map((tag) => (
                                <span key={tag} className="inline-block bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getStatusColor(test.status)}`}>
                            {test.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                          {test.duration}s
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {test.firstFailureBuild || '-'}
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => onFileClick && onFileClick(test.file, test.line)}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-mono"
                          >
                            {test.file}:{test.line}
                          </button>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => setExpandedTest(expandedTest === test.id ? null : test.id)}
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          >
                            <i className={`fas fa-chevron-${expandedTest === test.id ? 'up' : 'down'}`}></i>
                            <span className="ml-1">Stack Trace</span>
                          </button>
                        </td>
                      </tr>
                      {expandedTest === test.id && (
                        <tr>
                          <td colSpan={6} className="px-4 py-4 bg-gray-50 dark:bg-gray-700">
                            <div className="space-y-4">
                              <div>
                                <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                  Stack Trace
                                </h6>
                                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs overflow-x-auto">
                                  <pre>{test.stackTrace || 'No stack trace available'}</pre>
                                </div>
                              </div>
                              <div>
                                <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                  Code Snippet
                                </h6>
                                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-xs overflow-x-auto">
                                  <pre className="text-gray-800 dark:text-gray-200">{test.codeSnippet}</pre>
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