import React from 'react';

const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-tr from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300/10 rounded-full blur-lg animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header simplificado */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8">
              ¿Listo para empezar?
            </h2>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center mb-8">
            {/* Botón primario - Demo */}
            <a 
              href="/contact"
              className="group bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl text-base lg:text-lg font-bold hover:from-blue-700 hover:to-teal-700 transition-all duration-300 inline-flex items-center justify-center shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 min-w-[240px] sm:min-w-[280px]"
            >
              <span className="mr-3 text-xl group-hover:animate-bounce">🚀</span>
              Prueba la demo gratis
            </a>
            
            {/* Botón secundario - Contactar */}
            <a 
              href="/contact"
              className="group border-2 border-blue-600 dark:border-teal-400 text-blue-600 dark:text-teal-400 px-6 lg:px-8 py-3 lg:py-4 rounded-xl text-base lg:text-lg font-bold hover:bg-blue-600 hover:text-white dark:hover:bg-teal-400 dark:hover:text-white transition-all duration-300 inline-flex items-center justify-center bg-white dark:bg-gray-800 hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 min-w-[240px] sm:min-w-[280px]"
            >
              <span className="mr-3 text-xl group-hover:animate-pulse">📩</span>
              Contactar
            </a>
          </div>

          {/* Trust indicators simplificados */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">1 mes gratis</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Sin tarjeta de crédito</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;