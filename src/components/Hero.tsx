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
              Conecta tus pipelines, integra tus herramientas habituales y obtén insights avanzados y claros para tus equipos. 
              
            </p>
           
            
            {/* Botones CTA */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start mb-8 lg:mb-12">
              {/* Botón primario */}
              <a 
                href="/contact?source=demo"
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
                <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg lg:rounded-xl overflow-hidden">
                  {/* Header del dashboard */}
                  <div className="bg-white dark:bg-gray-800 p-2 lg:p-4 border-b border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 lg:space-x-2">
                        <div className="w-2 h-2 lg:w-3 lg:h-3 bg-red-400 rounded-full"></div>
                        <div className="w-2 h-2 lg:w-3 lg:h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-300">QArk Dashboard</div>
                    </div>
                  </div>
                  
                  {/* Contenido del dashboard */}
                  <div className="p-3 lg:p-4 space-y-3 lg:space-y-4">
                    {/* Métricas */}
                    <div className="grid grid-cols-3 gap-2 lg:gap-3">
                      <div className="bg-green-50 dark:bg-green-900/20 p-2 lg:p-3 rounded-md lg:rounded-lg">
                        <div className="text-green-600 dark:text-green-400 font-bold text-sm lg:text-lg">847</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Tests Passed</div>
                      </div>
                      <div className="bg-red-50 dark:bg-red-900/20 p-2 lg:p-3 rounded-md lg:rounded-lg">
                        <div className="text-red-600 dark:text-red-400 font-bold text-sm lg:text-lg">12</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Failed</div>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-2 lg:p-3 rounded-md lg:rounded-lg">
                        <div className="text-blue-600 dark:text-blue-400 font-bold text-sm lg:text-lg">98%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Coverage</div>
                      </div>
                    </div>
                    
                    {/* Gráficos lado a lado - MEJORADOS PARA MÓVIL */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-3">
                      {/* Gráfico de barras - ALTURA CONTROLADA */}
                      <div className="bg-white dark:bg-gray-700 p-3 lg:p-3 rounded-md lg:rounded-lg">
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">Test Results Trend</div>
                        {/* CAMBIO: Altura fija y overflow hidden para contener las barras */}
                        <div className="flex items-end justify-center space-x-1 h-16 lg:h-16 overflow-hidden">
                          {[8, 12, 6, 16, 10, 14, 8, 8, 12, 6, 16, 10].map((height, index) => {
                            // CAMBIO: Normalizar altura para que nunca exceda el contenedor
                            const maxHeight = 14; // Altura máxima en unidades
                            const normalizedHeight = Math.min(height, maxHeight);
                            const heightInRem = (normalizedHeight / maxHeight) * 3.5; // Max 3.5rem (56px)
                            
                            return (
                              <div 
                                key={index} 
                                className="bg-qark-blue w-2 lg:w-2 rounded-t flex-shrink-0" 
                                style={{height: `${heightInRem}rem`}}
                              ></div>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Pie chart simulado - TAMAÑO MEJORADO */}
                      <div className="bg-white dark:bg-gray-700 p-3 lg:p-3 rounded-md lg:rounded-lg">
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">Test Distribution</div>
                        {/* CAMBIO: Altura mayor y mejor distribución en móvil */}
                        <div className="flex items-center justify-center h-16 lg:h-16">
                          {/* Pie chart usando CSS - TAMAÑO AUMENTADO */}
                          <div className="relative w-12 h-12 lg:w-12 lg:h-12">
                            {/* Círculo base */}
                            <div className="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-600"></div>
                            
                            {/* Segmento verde (Passed - 70%) */}
                            <div 
                              className="absolute inset-0 rounded-full"
                              style={{
                                background: `conic-gradient(#10b981 0deg 252deg, transparent 252deg)`
                              }}
                            ></div>
                            
                            {/* Segmento rojo (Failed - 20%) */}
                            <div 
                              className="absolute inset-0 rounded-full"
                              style={{
                                background: `conic-gradient(transparent 0deg 252deg, #ef4444 252deg 324deg, transparent 324deg)`
                              }}
                            ></div>
                            
                            {/* Segmento amarillo (Skipped - 10%) */}
                            <div 
                              className="absolute inset-0 rounded-full"
                              style={{
                                background: `conic-gradient(transparent 0deg 324deg, #f59e0b 324deg 360deg, transparent 360deg)`
                              }}
                            ></div>
                            
                            {/* Círculo interior para efecto donut */}
                            <div className="absolute inset-2 lg:inset-2 rounded-full bg-white dark:bg-gray-700"></div>
                            
                            {/* Porcentaje central */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">85%</span>
                            </div>
                          </div>
                          
                          {/* Leyenda del pie chart - MEJORADA */}
                          <div className="ml-3 lg:ml-3 space-y-1 lg:space-y-1">
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 lg:w-2 lg:h-2 bg-green-500 rounded-full"></div>
                              <span className="text-xs text-gray-600 dark:text-gray-400">Pass</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 lg:w-2 lg:h-2 bg-red-500 rounded-full"></div>
                              <span className="text-xs text-gray-600 dark:text-gray-400">Fail</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 lg:w-2 lg:h-2 bg-yellow-500 rounded-full"></div>
                              <span className="text-xs text-gray-600 dark:text-gray-400">Skip</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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