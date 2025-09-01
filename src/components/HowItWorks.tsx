import React, { useState } from 'react';

const HowItWorks: React.FC = () => {
  const [hoveredStep, setHoveredStep] = useState(-1);

  const steps = [
    {
      number: 1,
      title: "Ejecuta tus tests",
      description: "Ejecuta tus tests como siempre has hecho, en cualquier lenguaje y framework. QARK admite cualquier lenguaje de programación y framework de testing",
      icons: ["💻", "⚙️", "</>"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: 2,
      title: "Conecta tu CI/CD",
      description: "Envía resultados automáticamente desde tu pipeline en formato .zip. Puedes usar nuestro job en tu pipeline o utilizar la API REST que ofrecemos",
      icons: ["🔧", "🚀", "📦"],
      color: "from-purple-500 to-pink-500"
    },
    {
      number: 3,
      title: "Activa integraciones",
      description: "Activa las integraciones disponibles con Jira, Slack, Teams ... Consigue más información sobre tus tests, el estado actualizado y mejora la colaboración en tu equipo",
      icons: ["🔗", "💬", "🎯"],
      color: "from-green-500 to-emerald-500"
    },
    {
      number: 4,
      title: "Analiza y mejora",
      description: "Obtén KPIs e insights tanto para managers como para analistas. Controla el estado de todos tus microservicios, equipos y funcionalidades en un único lugar",
      icons: ["📊", "📈", "🔍"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const handleCardHover = (index: number) => {
    setHoveredStep(index);
  };

  const handleCardLeave = () => {
    setHoveredStep(-1);
  };

  return (
    <section id='how-it-works' className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            ¿Cómo funciona?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Utiliza QARK de forma sencilla y transparente sin modificar tu forma de trabajar
          </p>
        </div>

        {/* Steps Flow */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {steps.map((step, index) => {
              const isHovered = hoveredStep === index;
              
              return (
                <div key={step.number} className="relative">
                  {/* Step Card */}
                  <div 
                    className={`
                      relative p-6 rounded-2xl border transition-all duration-300 transform
                      ${
                        isHovered
                          ? 'border-blue-200 dark:border-blue-400/30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm scale-105 shadow-2xl'
                          : 'border-gray-200 dark:border-slate-700/50 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm hover:border-blue-300 dark:hover:border-blue-500/30'
                      }
                    `}
                    onMouseEnter={() => handleCardHover(index)}
                    onMouseLeave={handleCardLeave}
                  >
                    {/* Step Number */}
                    <div 
                      className={`
                        w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto
                        bg-gradient-to-r ${step.color}
                      `}
                    >
                      {step.number}
                    </div>

                    {/* Icons */}
                    <div className="flex justify-center space-x-2 mb-4">
                      {step.icons.map((icon, iconIndex) => (
                        <span 
                          key={iconIndex} 
                          className="text-2xl opacity-70"
                        >
                          {icon}
                        </span>
                      ))}
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;