import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Términos de Uso
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Última actualización: 1 de enero de 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2>1. Aceptación de los Términos</h2>
              <p>
                Al acceder y utilizar QArk ("el Servicio"), usted acepta estar sujeto a estos Términos de Uso. 
                Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro servicio.
              </p>

              <h2>2. Descripción del Servicio</h2>
              <p>
                QArk es una plataforma que permite centralizar y analizar resultados de testing de software. 
                El servicio incluye dashboards, integraciones con herramientas de CI/CD, y análisis de datos de pruebas.
              </p>

              <h2>3. Registro y Cuentas de Usuario</h2>
              <p>
                Para utilizar ciertas funciones del Servicio, debe registrarse y crear una cuenta. 
                Usted es responsable de mantener la confidencialidad de su cuenta y contraseña.
              </p>

              <h2>4. Uso Aceptable</h2>
              <p>Al utilizar QArk, usted se compromete a:</p>
              <ul>
                <li>Utilizar el servicio solo para fines legítimos y autorizados</li>
                <li>No interferir con el funcionamiento del servicio</li>
                <li>No intentar acceder a cuentas de otros usuarios</li>
                <li>Cumplir con todas las leyes y regulaciones aplicables</li>
              </ul>

              <h2>5. Propiedad Intelectual</h2>
              <p>
                QArk y todo su contenido, características y funcionalidad son propiedad de QArk y están 
                protegidos por derechos de autor, marcas comerciales y otras leyes de propiedad intelectual.
              </p>

              <h2>6. Privacidad y Datos</h2>
              <p>
                Su privacidad es importante para nosotros. Por favor, revise nuestra Política de Privacidad 
                para entender cómo recopilamos, utilizamos y protegemos su información.
              </p>

              <h2>7. Limitación de Responsabilidad</h2>
              <p>
                QArk se proporciona "tal como está" sin garantías de ningún tipo. No seremos responsables 
                de daños directos, indirectos, incidentales o consecuentes que resulten del uso del servicio.
              </p>

              <h2>8. Modificaciones</h2>
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. 
                Las modificaciones entrarán en vigor inmediatamente después de su publicación.
              </p>

              <h2>9. Terminación</h2>
              <p>
                Podemos terminar o suspender su acceso al servicio inmediatamente, sin previo aviso, 
                por cualquier motivo, incluyendo el incumplimiento de estos Términos de Uso.
              </p>

              <h2>10. Contacto</h2>
              <p>
                Si tiene preguntas sobre estos Términos de Uso, puede contactarnos en: 
                <a href="mailto:legal@qark.app" className="text-blue-600 dark:text-blue-400 hover:underline">
                  legal@qark.app
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;