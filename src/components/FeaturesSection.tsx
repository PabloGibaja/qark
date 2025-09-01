import React, { useEffect, useRef, useState } from 'react';
import LangsAndFrameworks from './features/LangsAndFrameworks';
import CICDIntegrations from './features/CICDIntegrations';
import JiraIntegration from './features/JiraIntegration';
import DetailedTracking from './features/DetailedTracking';

// Interfaces para los datos
interface FeatureData {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  visual: {
    type: 'chart' | 'grid' | 'flow' | 'dashboard';
    data: any;
  };
}

// Datos de ejemplo para las 4 subsecciones
const featuresData: FeatureData[] = [
  {
    id: 'multi-language',
    title: 'Multi-language & Frameworks',
    description: 'Soporte universal para cualquier lenguaje de programación y framework de testing. Integra resultados desde Java, Python, JavaScript, C#, y más.',
    highlights: [
      'Soporte para la mayoria de lenguajes',
      'Compatible con la mayoria de frameworks',
      'Compatible con resultados de testing manuales',
      'Sin configuracion necesaria'
    ],
    visual: {
      type: 'grid',
      data: []
    }
  },
  {
    id: 'cicd-integrations',
    title: 'CI/CD Integrations',
    description: 'Conecta seamlessly con tus pipelines existentes. GitHub Actions, Jenkins, GitLab CI, y más. Automatiza la recolección de resultados.',
    highlights: [
      'GitHub Actions nativo',
      'Jenkins plugin oficial',
      'GitLab CI integration',
      'Webhooks personalizados'
    ],
    visual: {
      type: 'flow',
      data: [
        { step: 'Code Push', icon: 'fab fa-git-alt' },
        { step: 'CI Pipeline', icon: 'fas fa-cogs' },
        { step: 'Tests Run', icon: 'fas fa-vial' },
        { step: 'QArk Dashboard', icon: 'fas fa-chart-bar' }
      ]
    }
  },
  {
    id: 'jira-integration',
    title: 'Jira Integration',
    description: 'Enriquece tus reportes con información en tiempo real de Jira. Vincula tests fallidos con tickets, trackea el progreso de bugs.',
    highlights: [
      'Linking automático de issues',
      'Sincronización bidireccional',
      'Estados en tiempo real',
      'Reportes unificados'
    ],
    visual: {
      type: 'dashboard',
      data: {
        linkedIssues: 24,
        resolvedBugs: 18,
        openTickets: 6,
        avgResolutionTime: '2.3 days'
      }
    }
  },
  {
    id: 'detailed-tracking',
    title: 'Detailed Tracking',
    description: 'Análisis profundo de cada test fallido. Stack traces, líneas de código específicas, historial de cambios, y sugerencias de fix.',
    highlights: [
      'Stack traces completos',
      'Code line tracking',
      'Failure patterns',
      'AI-powered suggestions'
    ],
    visual: {
      type: 'chart',
      data: {
        failureRate: 12,
        avgFixTime: '4.2h',
        topFailures: ['Login Test', 'API Response', 'UI Rendering']
      }
    }
  }
];

// Hook para detectar cuando un elemento entra en viewport
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible] as const;
};

// Función para renderizar el visual específico según el tipo
const renderFeatureVisual = (feature: FeatureData) => {
  switch (feature.id) {
    case 'multi-language':
      return (
        <div className="h-full">
          <LangsAndFrameworks 
            onContactRequest={(framework) => {
              console.log(`Solicitud de soporte para: ${framework}`);
              // Aquí podrías integrar con un sistema real de contacto
            }}
          />
        </div>
      );
    
    case 'cicd-integrations':
      return (
        <div className="h-full">
          <CICDIntegrations 
            onPipelineRelaunch={() => {
              console.log('Pipeline relanzado desde UI');
              // Aquí podrías integrar con un sistema real de CI/CD
            }}
            onDocsClick={() => {
              console.log('Navegando a documentación de CI/CD');
              // Aquí podrías abrir la documentación real
            }}
          />
        </div>
      );
    
    case 'jira-integration':
      return (
        <div className="h-full">
          <JiraIntegration 
            onConnect={() => {
              console.log('Integración con Jira activada');
              // Aquí podrías integrar con OAuth real de Jira
            }}
            onTestcaseClick={(testcase) => {
              console.log('Testcase seleccionado:', testcase.name);
              // Aquí podrías abrir detalles adicionales o navegar
            }}
          />
        </div>
      );
    
    case 'detailed-tracking':
      return (
        <div className="h-full">
          <DetailedTracking 
            onTestClick={(test) => {
              console.log('Test seleccionado:', test.name);
              // Aquí podrías abrir detalles del test o navegar
            }}
            onFileClick={(file, line) => {
              console.log(`Abriendo archivo: ${file}:${line}`);
              // Aquí podrías integrar con editor/IDE
            }}
          />
        </div>
      );
    
    default:
      // Placeholder para otros subcomponentes
      return (
        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-qark rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-chart-bar text-white text-2xl"></i>
            </div>
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {feature.title}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Visual interactivo próximamente
            </p>
          </div>
        </div>
      );
  }
};

// Componente para renderizar cada subsección
const FeatureSubsection: React.FC<{ 
  feature: FeatureData; 
  index: number; 
  isVisible: boolean;
}> = ({ feature, index, isVisible }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center py-12 lg:py-16 ${
      isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
    } transition-all duration-700 ease-out`} style={{ transitionDelay: `${index * 200}ms` }}>
      
      {/* Contenido de texto - 1/3 del ancho en desktop, full width en móvil */}
      <div className={`${
        isEven 
          ? 'lg:order-1 lg:col-span-1' 
          : 'lg:order-2 lg:col-span-1'
      } space-y-4 lg:space-y-6 text-center lg:text-left`}>
        <div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4 text-gray-900 dark:text-white">
            {feature.title}
          </h3>
          <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {feature.description}
          </p>
        </div>
        
        {/* Lista de highlights */}
        <ul className="space-y-2 lg:space-y-3" role="list" aria-label={`Características de ${feature.title}`}>
          {feature.highlights.map((highlight, idx) => (
            <li key={idx} className="flex items-center space-x-3 justify-center lg:justify-start">
              <div className="flex-shrink-0 w-4 h-4 lg:w-5 lg:h-5 bg-gradient-qark rounded-full flex items-center justify-center">
                <i className="fas fa-check text-white text-xs"></i>
              </div>
              <span className="text-sm lg:text-base text-gray-700 dark:text-gray-300 font-medium">
                {highlight}
              </span>
            </li>
          ))}
        </ul>
        
        
      </div>
      
      {/* Visual - 2/3 del ancho en desktop, full width en móvil */}
      <div className={`${
        isEven 
          ? 'lg:order-2 lg:col-span-2' 
          : 'lg:order-1 lg:col-span-2'
      } mt-8 lg:mt-0`}>
        <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl p-4 lg:p-8 border border-gray-200 dark:border-gray-700">
          {renderFeatureVisual(feature)}
        </div>
      </div>
    </div>
  );
};

// Componente principal FeaturesSection
const FeaturesSection: React.FC = () => {
  const [headerRef, isHeaderVisible] = useIntersectionObserver(0.2);
  
  return (
    <section 
      id="features" 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Encabezado de la sección */}
        <div 
          ref={headerRef}
          className={`text-center mb-8 ${
            isHeaderVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
          } transition-all duration-700 ease-out`}
        >
          <h2 
            id="features-heading"
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            Funcionalidades
          </h2>
        </div>
        
        {/* Subsecciones */}
        <div className="space-y-5">
          {featuresData.map((feature, index) => {
            const [ref, isVisible] = useIntersectionObserver(0.1);
            
            return (
              <div key={feature.id} ref={ref}>
                <FeatureSubsection 
                  feature={feature} 
                  index={index} 
                  isVisible={isVisible}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Exportaciones
export default FeaturesSection;
export { FeatureSubsection };
export type { FeatureData };