import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Fondo con patrón sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-teal-50/50 dark:from-gray-900 dark:to-gray-800"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Columna izquierda - Contenido */}
          <div className="text-center lg:text-left">
            {/* Claim principal */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Centraliza tus{' '}
              <span className="gradient-text">
                resultados de testing
              </span>
              {' '}en un único lugar
            </h1>
            
            {/* Subclaim */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Conecta tus pipelines, integra Jira y GitHub, y obtén insights claros para tu equipo en tiempo real. 
              <span className="font-medium text-gray-800 dark:text-gray-200">
                Menos fricción, más control.
              </span>
            </p>
            
            {/* Botones CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              {/* Botón primario */}
              <a 
                href="/demo"
                className="group bg-gradient-qark text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span className="mr-2 text-xl group-hover:animate-bounce">🚀</span>
                Probar demo
              </a>
              
              {/* Botón secundario */}
              <a 
                href="/contact"
                className="group border-2 border-qark-blue dark:border-qark-teal text-qark-blue dark:text-qark-teal px-8 py-4 rounded-lg text-lg font-semibold hover:bg-qark-blue hover:text-white dark:hover:bg-qark-teal dark:hover:text-white transition-all duration-300 inline-flex items-center justify-center"
              >
                <span className="mr-2 text-xl group-hover:animate-pulse">📩</span>
                Contactar
              </a>
            </div>
            
            {/* Logos de integraciones */}
            <div className="">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">
                Integra con tus herramientas favoritas
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 opacity-60 hover:opacity-80 transition-opacity duration-300">
                {/* GitHub */}
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-sm">
                  <i className="fab fa-github text-2xl text-gray-700 dark:text-gray-300"></i>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">GitHub</span>
                </div>
                
                {/* Jira */}
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-sm">
                  <i className="fab fa-jira text-2xl text-blue-600"></i>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Jira</span>
                </div>
                
                {/* Slack */}
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-sm">
                  <i className="fab fa-slack text-2xl text-purple-600"></i>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Slack</span>
                </div>
                
                {/* Jenkins */}
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-sm">
                  <i className="fas fa-cog text-2xl text-gray-600"></i>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Jenkins</span>
                </div>
                
                {/* Docker */}
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-sm">
                  <i className="fab fa-docker text-2xl text-blue-500"></i>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Docker</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Columna derecha - Visual */}
          <div className="relative">
            {/* Contenedor de la imagen con efectos */}
            <div className="relative">
              {/* Efectos de fondo */}
              <div className="absolute -inset-4 bg-gradient-qark rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
              
              {/* Imagen principal */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
                {/* Mockup del dashboard */}
                <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden">
                  {/* Header del dashboard */}
                  <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-300">QArk Dashboard</div>
                    </div>
                  </div>
                  
                  {/* Contenido del dashboard */}
                  <div className="p-4 space-y-4">
                    {/* Métricas */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <div className="text-green-600 dark:text-green-400 font-bold text-lg">847</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Tests Passed</div>
                      </div>
                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                        <div className="text-red-600 dark:text-red-400 font-bold text-lg">12</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Failed</div>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <div className="text-blue-600 dark:text-blue-400 font-bold text-lg">98%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Coverage</div>
                      </div>
                    </div>
                    
                    {/* Gráficos lado a lado */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Gráfico de barras existente */}
                      <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">Test Results Trend</div>
                        <div className="flex items-end space-x-1 h-16">
                          <div className="bg-qark-blue w-2 h-8 rounded-t"></div>
                          <div className="bg-qark-blue w-2 h-12 rounded-t"></div>
                          <div className="bg-qark-blue w-2 h-6 rounded-t"></div>
                          <div className="bg-qark-blue w-2 h-16 rounded-t"></div>
                          <div className="bg-qark-blue w-2 h-10 rounded-t"></div>
                          <div className="bg-qark-blue w-2 h-14 rounded-t"></div>
                          <div className="bg-qark-blue w-2 h-8 rounded-t"></div>
                          <div className="bg-qark-blue w-2 h-8 rounded-t"></div>
                          <div className="bg-qark-blue w-2 h-12 rounded-t"></div>
                          <div className="bg-qark-blue w-2 h-6 rounded-t"></div>
                          <div className="bg-qark-blue w-2 h-16 rounded-t"></div>
                          <div className="bg-qark-blue w-2 h-10 rounded-t"></div>
                          <div className="bg-qark-blue w-2 h-14 rounded-t"></div>
                          <div className="bg-qark-blue w-2 h-8 rounded-t"></div>
                          <div className="bg-qark-blue w-2 h-12 rounded-t"></div>
                          <div className="bg-qark-blue w-2 h-6 rounded-t"></div>
                          <div className="bg-qark-blue w-2 h-16 rounded-t"></div>
                          <div className="bg-qark-blue w-2 h-10 rounded-t"></div>
                          <div className="bg-qark-blue w-2 h-14 rounded-t"></div>
                          <div className="bg-qark-blue w-2 h-8 rounded-t"></div>
                        </div>
                      </div>
                      
                      {/* Pie chart simulado */}
                      <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">Test Distribution</div>
                        <div className="flex items-center justify-center h-16">
                          {/* Pie chart usando CSS */}
                          <div className="relative w-12 h-12">
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
                            <div className="absolute inset-2 rounded-full bg-white dark:bg-gray-700"></div>
                            
                            {/* Porcentaje central */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">85%</span>
                            </div>
                          </div>
                          
                          {/* Leyenda del pie chart */}
                          <div className="ml-3 space-y-1">
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-xs text-gray-600 dark:text-gray-400">Pass</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <span className="text-xs text-gray-600 dark:text-gray-400">Fail</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                              <span className="text-xs text-gray-600 dark:text-gray-400">Skip</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Elementos flotantes decorativos */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-qark-teal/20 rounded-full blur-xl animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-qark-blue/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;