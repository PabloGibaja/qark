import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id='hero' className="relative min-h-screen flex items-center bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Fondo con patrón sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-teal-50/50 dark:from-gray-900 dark:to-gray-800"></div>
      
      {/* CAMBIO: Más padding-top en móvil para separar del navigation */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Columna izquierda - Contenido */}
          <div className="text-center lg:text-left order-1 lg:order-1">
            {/* Claim principal */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 lg:mb-6">
              Centraliza tus{' '}
              <span className="gradient-text">
                pruebas de software
              </span>
              {' '}en un único lugar
            </h1>
            
            {/* Subclaim */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 lg:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Conecta tus servicios fácilmente. QArk convierte datos dispersos en información útil para prevenir retrasos y descubrir patrones clave. Controla toda tu plataforma desde un único lugar
            </p>
           
            
            {/* Botones CTA */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start mb-8 lg:mb-12">
              {/* Botón primario */}
              <a 
                href="https://demo.qark.app"
                className="group bg-gradient-qark text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg text-base lg:text-lg font-semibold hover:opacity-90 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span className="mr-2 text-lg lg:text-xl group-hover:animate-bounce">🚀</span>
                Prueba la demo gratis
              </a>
              
              {/* Botón secundario */}
              <a 
                href="/contact"
                className="group border-2 border-qark-blue dark:border-qark-teal text-qark-blue dark:text-qark-teal px-6 lg:px-8 py-3 lg:py-4 rounded-lg text-base lg:text-lg font-semibold hover:bg-qark-blue hover:text-white dark:hover:bg-qark-teal dark:hover:text-white transition-all duration-300 inline-flex items-center justify-center"
              >
                <span className="mr-2 text-lg lg:text-xl group-hover:animate-pulse">📩</span>
                Contactar
              </a>
            </div>
            
            {/* Logos de integraciones */}
            <div className="">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 lg:mb-4 font-medium">
                Compatible con las herramientas de software más utilizadas
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 lg:gap-6 opacity-60 hover:opacity-80 transition-opacity duration-300">
                {/* GitHub */}
                <div className="flex items-center space-x-1 lg:space-x-2 bg-white dark:bg-gray-800 px-2 lg:px-3 py-1 lg:py-2 rounded-lg shadow-sm">
                  <img src="/images/ci-cd/github.svg" alt="GitHub" className="w-4 h-4 lg:w-6 lg:h-6" />
                  <span className="text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300">GitHub</span>
                </div>
                
                {/* Jira */}
                <div className="flex items-center space-x-1 lg:space-x-2 bg-white dark:bg-gray-800 px-2 lg:px-3 py-1 lg:py-2 rounded-lg shadow-sm">
                  <img src="/images/ci-cd/jira.svg" alt="Jira" className="w-4 h-4 lg:w-6 lg:h-6" />
                  <span className="text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300">Jira</span>
                </div>
                
                {/* Slack */}
                <div className="flex items-center space-x-1 lg:space-x-2 bg-white dark:bg-gray-800 px-2 lg:px-3 py-1 lg:py-2 rounded-lg shadow-sm">
                  <img src="/images/ci-cd/slack.svg" alt="Slack" className="w-4 h-4 lg:w-6 lg:h-6" />
                  <span className="text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300">Slack</span>
                </div>
                
                {/* Jenkins */}
                <div className="flex items-center space-x-1 lg:space-x-2 bg-white dark:bg-gray-800 px-2 lg:px-3 py-1 lg:py-2 rounded-lg shadow-sm">
                  <img src="/images/ci-cd/jenkins.svg" alt="Jenkins" className="w-4 h-4 lg:w-6 lg:h-6" />
                  <span className="text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300">Jenkins</span>
                </div>
                
                {/* Azure */}
                <div className="flex items-center space-x-1 lg:space-x-2 bg-white dark:bg-gray-800 px-2 lg:px-3 py-1 lg:py-2 rounded-lg shadow-sm">
                  <img src="/images/ci-cd/azure.svg" alt="Azure" className="w-4 h-4 lg:w-6 lg:h-6" />
                  <span className="text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300">Azure</span>
                </div>
                
                {/* Y muchos más */}
                <a 
                  href="#features"
                  className="flex items-center space-x-1 lg:space-x-2 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 border border-blue-200 dark:border-blue-700 px-2 lg:px-3 py-1 lg:py-2 rounded-lg shadow-sm hover:from-blue-100 hover:to-teal-100 dark:hover:from-blue-800/30 dark:hover:to-teal-800/30 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex space-x-0.5">
                    <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-blue-500 rounded-full"></div>
                    <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-teal-500 rounded-full"></div>
                    <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-purple-500 rounded-full"></div>
                  </div>
                  <span className="text-xs lg:text-sm font-medium text-blue-700 dark:text-blue-300">y muchos más</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Columna derecha - Visual */}
          <div className="relative order-2 lg:order-2 w-full">
            {/* Contenedor de la imagen con efectos */}
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              {/* Efectos de fondo - solo en desktop */}
              <div className="hidden lg:block absolute -inset-4 bg-gradient-qark rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
              
              {/* Imagen principal */}
              <div className="relative bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl shadow-lg lg:shadow-2xl p-3 lg:p-6 border border-gray-200 dark:border-gray-700">
                {/* Mockup del dashboard */}
                <div className="w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg lg:rounded-xl overflow-hidden">

                  
                  
                  {/* Dashboard de Pipelines */}
                  <div className="bg-gray-100 dark:bg-gray-900 p-3 lg:p-4 space-y-3 lg:space-y-4 relative overflow-hidden">
                    
                
                    {/* Pipeline 1: Payment Service */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 lg:p-4 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-sm lg:text-base font-semibold text-gray-900 dark:text-white">Payment Service</h3>
                          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs font-medium">Frontend</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors">
                            <i className="fas fa-external-link-alt mr-1"></i>Jira
                          </button>
                          <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <i className="fab fa-github mr-1"></i>GitHub
                          </button>
                          <button className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded text-xs hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors">
                            <i className="fab fa-microsoft mr-1"></i>Teams
                          </button>
                        </div>
                      </div>
                      
                      {/* Pipeline Status Dots - Payment Service */}
                      <div className="flex items-center space-x-1 mb-2">
                        {/* 13 tests: 11 passed, 1 failed, 1 running */}
                        <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-red-500 rounded-sm"></div>
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-green-500 rounded-sm"></div>
                        ))}
                        <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-yellow-500 rounded-sm"></div>
                        <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-red-500 rounded-sm"></div>
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-green-500 rounded-sm"></div>
                        ))}
                        <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-green-500 rounded-sm"></div>
                      </div>
                    </div>

                    {/* Pipeline 2: Notification Service */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 lg:p-4 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-sm lg:text-base font-semibold text-gray-900 dark:text-white">Notification Service</h3>
                          <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded text-xs font-medium">Backend</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors">
                            <i className="fas fa-external-link-alt mr-1"></i>Jira
                          </button>
                          <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <i className="fab fa-github mr-1"></i>GitHub
                          </button>
                          <button className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded text-xs hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors">
                            <i className="fab fa-microsoft mr-1"></i>Teams
                          </button>
                        </div>
                      </div>
                      
                      {/* Pipeline Status Dots - Notification Service */}
                      <div className="flex items-center space-x-1 mb-2">
                        {/* 14 tests: mostly passed with some failed */}
                        <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-red-500 rounded-sm"></div>
                        <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-yellow-500 rounded-sm"></div>
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-green-500 rounded-sm"></div>
                        ))}
                        <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-red-500 rounded-sm"></div>
                        {[...Array(2)].map((_, i) => (
                          <div key={i} className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-green-500 rounded-sm"></div>
                        ))}
                        <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-red-500 rounded-sm animate-bounce"></div>
                      </div>
                    </div>

                    {/* Detalle expandido del Notification Service */}
                    <div className="ml-4 lg:ml-6 bg-red-50 dark:bg-red-900/10 border-l-4 rounded-r-lg p-3 lg:p-4 border border-red-200 dark:border-red-800/30">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="w-3 h-3 bg-red-500 animate-bounce"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-semibold text-red-800 dark:text-red-300">Error: Connection timeout to SMTP server</h4>
                            <span className="text-xs text-red-600 dark:text-red-400 font-mono">2m ago</span>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="bg-red-100 dark:bg-red-900/20 rounded p-2 text-xs font-mono text-red-800 dark:text-red-300">
                              <div>❌ test_email_delivery_notification()</div>
                              <div className="text-red-600 dark:text-red-400 ml-4">→ SMTPConnectError: [Errno 110] Connection timed out</div>
                              <div className="text-red-600 dark:text-red-400 ml-4">→ at line 47 in notification_service.py</div>
                            </div>
                            
                            {/* QArk Insight */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-3 mt-3">
                              <div className="flex items-start space-x-2">
                                <div className="flex-shrink-0 mt-0.5">
                                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded flex items-center justify-center">
                                    <i className="fas fa-lightbulb text-white text-xs"></i>
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="text-xs font-semibold text-blue-800 dark:text-blue-300">QArk Insight</span>
                                  </div>
                                  <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                                    El servicio SMTP no esta declarado en tu docker-compose.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center space-x-3">
                                <span className="text-xs text-red-600 dark:text-red-400">
                                  <i className="fas fa-clock mr-1"></i>Duration: 30.2s
                                </span>
                                <span className="text-xs text-red-600 dark:text-red-400">
                                  <i className="fas fa-redo mr-1"></i>Retry 2/3
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded text-xs hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors">
                                  <i className="fas fa-bug mr-1"></i>Debug
                                </button>
                                <button className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors">
                                  <i className="fas fa-external-link-alt mr-1"></i>Logs
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pipeline 3: Infrastructure */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 lg:p-4 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-sm lg:text-base font-semibold text-gray-900 dark:text-white">Infrastructure</h3>
                          <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded text-xs font-medium">DevOps</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors">
                            <i className="fas fa-external-link-alt mr-1"></i>Jira
                          </button>
                          <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <i className="fab fa-github mr-1"></i>GitHub
                          </button>
                          <button className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded text-xs hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors">
                            <i className="fab fa-microsoft mr-1"></i>Teams
                          </button>
                        </div>
                      </div>
                      
                      {/* Pipeline Status Dots - Infrastructure */}
                      <div className="flex items-center space-x-1 mb-2">
                        {/* 13 tests: mixed results */}
                        {[...Array(2)].map((_, i) => (
                          <div key={i} className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-yellow-500 rounded-sm"></div>
                        ))}
                        <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-gray-400 rounded-sm"></div>
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-green-500 rounded-sm"></div>
                        ))}
                        <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-gray-400 rounded-sm"></div>
                        <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-gray-400 rounded-sm"></div>
                        <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-red-500 rounded-sm"></div>
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-green-500 rounded-sm"></div>
                        ))}
                      </div>
                    </div>

                    {/* Tarjeta parcial inferior - cortada */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 lg:p-4 border border-gray-200 dark:border-gray-700 transform translate-y-0 opacity-40 relative overflow-hidden h-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-sm lg:text-base font-semibold text-gray-900 dark:text-white">Analytics Engine</h3>
                          <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded text-xs font-medium">DevOps</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs">
                            <i className="fas fa-external-link-alt mr-1"></i>Jira
                          </button>
                          <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                            <i className="fab fa-github mr-1"></i>GitHub
                          </button>
                          <button className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded text-xs hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors">
                            <i className="fab fa-microsoft mr-1"></i>Teams
                          </button>
                        </div>
                      </div>
                      {/* Gradiente interno para crear efecto de corte */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-800 pointer-events-none"></div>
                    </div>
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-100 dark:from-gray-900 to-transparent pointer-events-none z-10"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-100 dark:from-gray-900 to-transparent pointer-events-none z-10"></div>
                  </div>
                </div>
              </div>
              
              {/* Elementos flotantes decorativos - solo en desktop */}
              <div className="hidden lg:block absolute -top-4 -right-4 w-20 h-20 bg-qark-teal/20 rounded-full blur-xl animate-float"></div>
              <div className="hidden lg:block absolute -bottom-4 -left-4 w-16 h-16 bg-qark-blue/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Indicador de scroll - solo en desktop */}
      <div className="hidden lg:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;