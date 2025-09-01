import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Política de Privacidad
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Última actualización: 1 de enero de 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2>1. Información que Recopilamos</h2>
              <p>
                En QArk, recopilamos información que usted nos proporciona directamente, 
                información que recopilamos automáticamente cuando utiliza nuestros servicios, 
                e información de terceros.
              </p>

              <h3>Información que nos proporciona:</h3>
              <ul>
                <li>Información de registro (nombre, email, empresa)</li>
                <li>Datos de pruebas y testing que sube a la plataforma</li>
                <li>Comunicaciones con nuestro equipo de soporte</li>
              </ul>

              <h3>Información recopilada automáticamente:</h3>
              <ul>
                <li>Información de uso y actividad en la plataforma</li>
                <li>Datos técnicos (dirección IP, tipo de navegador, sistema operativo)</li>
                <li>Cookies y tecnologías similares</li>
              </ul>

              <h2>2. Cómo Utilizamos su Información</h2>
              <p>Utilizamos la información recopilada para:</p>
              <ul>
                <li>Proporcionar, mantener y mejorar nuestros servicios</li>
                <li>Procesar transacciones y enviar confirmaciones</li>
                <li>Enviar comunicaciones técnicas y actualizaciones</li>
                <li>Proporcionar soporte al cliente</li>
                <li>Analizar el uso del servicio para mejoras</li>
              </ul>

              <h2>3. Compartir Información</h2>
              <p>
                No vendemos, alquilamos ni compartimos su información personal con terceros, 
                excepto en las siguientes circunstancias:
              </p>
              <ul>
                <li>Con su consentimiento explícito</li>
                <li>Para cumplir con obligaciones legales</li>
                <li>Para proteger nuestros derechos y seguridad</li>
                <li>Con proveedores de servicios que nos ayudan a operar la plataforma</li>
              </ul>

              <h2>4. Seguridad de los Datos</h2>
              <p>
                Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger 
                su información personal contra acceso no autorizado, alteración, divulgación o destrucción.
              </p>

              <h2>5. Retención de Datos</h2>
              <p>
                Conservamos su información personal durante el tiempo necesario para cumplir con los 
                propósitos descritos en esta política, a menos que la ley requiera un período de retención más largo.
              </p>

              <h2>6. Sus Derechos</h2>
              <p>Dependiendo de su ubicación, puede tener los siguientes derechos:</p>
              <ul>
                <li>Acceder a su información personal</li>
                <li>Corregir información inexacta</li>
                <li>Solicitar la eliminación de su información</li>
                <li>Oponerse al procesamiento de su información</li>
                <li>Portabilidad de datos</li>
              </ul>

              <h2>7. Cookies</h2>
              <p>
                Utilizamos cookies y tecnologías similares para mejorar su experiencia, 
                analizar el uso del sitio y personalizar el contenido. Puede controlar las 
                cookies a través de la configuración de su navegador.
              </p>

              <h2>8. Transferencias Internacionales</h2>
              <p>
                Su información puede ser transferida y procesada en países distintos al suyo. 
                Nos aseguramos de que dichas transferencias cumplan con las leyes de protección de datos aplicables.
              </p>

              <h2>9. Cambios a esta Política</h2>
              <p>
                Podemos actualizar esta Política de Privacidad ocasionalmente. Le notificaremos 
                sobre cambios significativos publicando la nueva política en nuestro sitio web.
              </p>

              <h2>10. Contacto</h2>
              <p>
                Si tiene preguntas sobre esta Política de Privacidad o sobre nuestras prácticas de datos, 
                puede contactarnos en: 
                <a href="mailto:privacy@qark.app" className="text-blue-600 dark:text-blue-400 hover:underline">
                  privacy@qark.app
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;