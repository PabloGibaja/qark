import React, { useState } from 'react';

const Benefits: React.FC = () => {
  const [hoveredBenefit, setHoveredBenefit] = useState(-1);

  const benefits = [
    {
      id: 1,
      icon: "⏱️",
      title: "Ahorra Tiempo",
      description: "Reduce las reuniones y accede rápidamente a la información que necesitas.",
      bulletPoints: [
        "Resúmenes rápidos y actualizados de avances de automatización",
        "KPIs relevantes para tus reportes al instante",
        "Información centralizada de todos tus equipos y microservicios en un solo lugar",
        "Menos reuniones de seguimiento para todos los equipos"
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
    },
    {
      id: 2,
      icon: "🎯",
      title: "Mejora el Control",
      description: "Supervisa y controla todos tus procesos desde un dashboard unificado.",
      bulletPoints: [
        "Vista unificada de pipelines, equipos y microservicios",
        "Páginas de detalle multinivel (microservicio, equipo, funcionalidad)",
        "Relanzamiento directo de pipelines desde QArk",
        "Histórico centralizado y detección temprana de retrasos en entregas"
      ],
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
    },
    {
      id: 3,
      icon: "🔍",
      title: "Unifica Resultados & Descubre Patrones",
      description: "Combina detalle técnico con visión estratégica para anticipar problemas.",
      bulletPoints: [
        "Detalle técnico para ingenieros, visión global para managers",
        "QArk Insights para detectar patrones en defectos",
        "Anticipación de problemas en todos los niveles",
        "Análisis desde pruebas individuales hasta riesgos de funcionalidad"
      ],
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
    }
  ];

  const handleCardHover = (index: number) => {
    setHoveredBenefit(index);
  };

  const handleCardLeave = () => {
    setHoveredBenefit(-1);
  };

  return (
    <section id='benefits' className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Beneficios de usar QArk
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const isHovered = hoveredBenefit === index;
              
              return (
                <div 
                  key={benefit.id} 
                  className="relative group"
                  onMouseEnter={() => handleCardHover(index)}
                  onMouseLeave={handleCardLeave}
                >
                  {/* Benefit Card */}
                  <div 
                    className={`
                      relative p-8 rounded-2xl border transition-all duration-500 transform h-full
                      ${
                        isHovered
                          ? 'border-blue-200 dark:border-blue-400/30 bg-white dark:bg-slate-800 backdrop-blur-sm scale-105 shadow-2xl shadow-blue-500/20'
                          : 'border-gray-200 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:border-blue-300 dark:hover:border-blue-500/30'
                      }
                    `}
                  >
                    {/* Background Gradient */}
                    <div 
                      className={`
                        absolute inset-0 rounded-2xl opacity-30 transition-opacity duration-500
                        bg-gradient-to-br ${benefit.bgColor}
                        ${
                          isHovered ? 'opacity-50' : 'opacity-20'
                        }
                      `}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="text-center mb-6">
                        <div 
                          className={`
                            w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto
                            bg-gradient-to-r ${benefit.color} shadow-lg
                            ${
                              isHovered ? 'scale-110 shadow-xl' : ''
                            }
                            transition-all duration-300
                          `}
                        >
                          {benefit.icon}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                        {benefit.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed text-center mb-6">
                        {benefit.description}
                      </p>

                      {/* Bullet Points */}
                      <ul className="space-y-3">
                        {benefit.bulletPoints.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                              <div 
                                className={`
                                  w-2 h-2 rounded-full
                                  bg-gradient-to-r ${benefit.color}
                                  ${
                                    isHovered ? 'scale-125' : ''
                                  }
                                  transition-all duration-300
                                `}
                              />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Subtle glow effect */}
                    {isHovered && (
                      <div 
                        className={`
                          absolute inset-0 rounded-2xl opacity-10 blur-xl
                          bg-gradient-to-r ${benefit.color}
                        `}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Claim */}
        <div className="text-center mt-20">
          <div className="inline-block">
            <p className="text-2xl md:text-3xl font-light text-gray-600 dark:text-gray-300 mb-2">
              Todo en un mismo lugar.
            </p>
            <div className="flex items-center justify-center">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-20 mr-4"></div>
              <div className="flex items-center space-x-3">
                <img 
                  src="/icon.png" 
                  alt="QArk Logo" 
                  className="w-8 h-8 md:w-10 md:h-10"
                />
                <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  QArk
                </span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent w-20 ml-4"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;