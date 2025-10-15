import React, { useState } from 'react';

const Pricing: React.FC = () => {
  const [hoveredPlan, setHoveredPlan] = useState(-1);

  const plans = [
    {
      id: 1,
      name: "Starter",
      price: "30€",
      period: "mes",
      description: "Perfecto para equipos pequeños que empiezan con QArk",
      features: [
        "Acceso a dashboards unificados",
        "Soporte a múltiples lenguajes y frameworks principales",
        "Integración básica con CI/CD",
        "Tracking de pruebas y KPIs básicos",
        "Hasta 5 usuarios"
      ],
      ctaText: "Obtener",
      popular: false,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      name: "Professional",
      price: "99€",
      period: "mes",
      description: "Para equipos grandes que necesitan funcionalidades avanzadas",
      features: [
        "Todo lo de Starter",
        "Integraciones avanzadas: Jira + GitHub completas",
        "Insights automáticos y detección de patrones",
        "Relanzamiento de pipelines desde QArk",
        "Histórico completo de resultados y reportes",
        "Usuarios ilimitados",
        "Soporte prioritario"
      ],
      ctaText: "Obtener",
      popular: true,
      color: "from-blue-700 to-blue-900"
    }
  ];

  const handleCardHover = (index: number) => {
    setHoveredPlan(index);
  };

  const handleCardLeave = () => {
    setHoveredPlan(-1);
  };

  return (
    <section id='pricing' className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Planes y Precios
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Elige el plan que mejor se adapte a las necesidades de tu equipo
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {plans.map((plan, index) => {
              const isHovered = hoveredPlan === index;
              const isStarter = plan.name === "Starter";
              
              return (
                <div 
                  key={plan.id} 
                  className={`relative group ${
                    isStarter ? 'lg:scale-95 lg:mt-2' : ''
                  }`}
                  onMouseEnter={() => handleCardHover(index)}
                  onMouseLeave={handleCardLeave}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                        Recomendado
                      </div>
                    </div>
                  )}

                  {/* Pricing Card */}
                  <div 
                    className={`
                      relative p-8 rounded-2xl border transition-all duration-500 transform h-full flex flex-col
                      ${
                        isHovered
                          ? 'border-blue-200 dark:border-blue-400/30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm scale-105 shadow-2xl shadow-blue-500/20'
                          : 'border-gray-200 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:border-blue-300 dark:hover:border-blue-500/30 shadow-lg'
                      }
                      ${
                        plan.popular ? 'ring-2 ring-blue-500/30 shadow-blue-500/20' : ''
                      }
                    `}
                  >
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                        {plan.description}
                      </p>
                      
                      {/* Price */}
                      <div className="mb-6">
                        <div className="flex items-baseline justify-center">
                          <span className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
                            {plan.price}
                          </span>
                          <span className="text-xl text-gray-600 dark:text-gray-300 ml-2">
                            /{plan.period}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Features List - Flex grow para empujar el botón hacia abajo */}
                    <div className="mb-8 flex-grow">
                      <ul className="space-y-4">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                              <div 
                                className={`
                                  w-5 h-5 rounded-full flex items-center justify-center
                                  bg-gradient-to-r ${plan.color}
                                  ${
                                    isHovered ? 'scale-110' : ''
                                  }
                                  transition-all duration-300
                                `}
                              >
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button - Siempre al final */}
                    <div className="text-center mt-auto">
                      <a 
                        href="/contact"
                        className={`
                          inline-block w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform text-center no-underline relative z-10
                          ${
                            plan.popular
                              ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 shadow-lg hover:shadow-xl'
                              : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl'
                          }
                          ${
                            isHovered ? 'scale-105' : ''
                          }
                        `}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = '/contact';
                        }}
                      >
                        Obtener
                      </a>
                    </div>

                    {/* Subtle glow effect */}
                    {isHovered && (
                      <div 
                        className={`
                          absolute inset-0 rounded-2xl opacity-10 blur-xl
                          bg-gradient-to-r ${plan.color}
                        `}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Todos los planes incluyen 1 mes de prueba gratuita. Sin compromiso.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;