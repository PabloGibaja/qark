import React, { useState, useEffect, useRef } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [showDemoMessage, setShowDemoMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState({
    website: '', // Campo honeypot común
    phone: '',   // Otro campo honeypot
    url: ''      // Tercer campo honeypot
  });
  const formStartTime = useRef<number>(0);
  const minFormTime = 3000; // Mínimo 3 segundos para completar el formulario

  useEffect(() => {
    // Verificar si viene del botón de demo
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('source') === 'demo') {
      setShowDemoMessage(true);
    }
    
    // Registrar tiempo de inicio del formulario
    formStartTime.current = Date.now();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHoneypotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHoneypot(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): { isValid: boolean; error?: string } => {
    // Verificar honeypots - si alguno tiene valor, es un bot
    if (honeypot.website || honeypot.phone || honeypot.url) {
      console.warn('Bot detected: Honeypot field filled');
      return { isValid: false, error: 'Formulario inválido. Por favor, inténtalo de nuevo.' };
    }

    // Verificar tiempo mínimo de completado
    const formCompletionTime = Date.now() - formStartTime.current;
    if (formCompletionTime < minFormTime) {
      console.warn('Bot detected: Form submitted too quickly', formCompletionTime);
      return { isValid: false, error: 'Por favor, tómate un momento para revisar tu mensaje antes de enviarlo.' };
    }

    // Validaciones para demo (solo email requerido)
    if (showDemoMessage) {
      if (!formData.email.trim()) {
        return { isValid: false, error: 'Por favor, introduce tu email para acceder a la demo.' };
      }
      
      // Validar email básico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        return { isValid: false, error: 'Por favor, introduce un email válido.' };
      }
      
      return { isValid: true };
    }

    // Validaciones básicas de contenido para contacto normal
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return { isValid: false, error: 'Por favor, completa todos los campos obligatorios.' };
    }

    // Validar email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return { isValid: false, error: 'Por favor, introduce un email válido.' };
    }

    // Verificar que el mensaje no sea demasiado corto (posible spam)
    if (formData.message.trim().length < 10) {
      return { isValid: false, error: 'Por favor, proporciona más detalles en tu mensaje.' };
    }

    return { isValid: true };
  };

  const sendEmail = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          honeypot: honeypot,
          formTime: Date.now() - formStartTime.current,
          isDemo: showDemoMessage
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('Email sent successfully:', result);
        return { success: true };
      } else {
        console.error('Error sending email:', result.error);
        return { success: false, error: result.error || 'Error desconocido' };
      }
    } catch (error) {
      console.error('Network error:', error);
      return { success: false, error: 'Error de conexión. Verifica tu internet.' };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateForm();
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendEmail();
      
      if (result.success) {
        alert('¡Gracias por contactarnos! Te responderemos pronto.');
        // Resetear formulario
        setFormData({ name: '', email: '', company: '', message: '' });
        setHoneypot({ website: '', phone: '', url: '' });
        formStartTime.current = Date.now();
      } else {
        alert(`Error al enviar el mensaje: ${result.error}`);
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      alert('Hubo un error inesperado. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header - Solo mostrar si NO es demo */}
          {!showDemoMessage && (
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Contacta con nosotros
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                ¿Tienes preguntas sobre QArk? Estamos aquí para ayudarte.
              </p>
            </div>
          )}

          {/* Demo Message - Ahora es el contenido principal para demo */}
          {showDemoMessage && (
            <div className="text-center mb-12">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 max-w-2xl mx-auto">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-blue-800 dark:text-blue-200 mb-3">
                      Debido a la alta demanda de demos, por favor contacta para obtener tu enlace personalizado.
                    </p>
                    <p className="text-blue-800 dark:text-blue-200">
                      Te enviaremos un email con el link y credenciales para acceder a tu demo cuando esté lista.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulario */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              {!showDemoMessage && (
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Envíanos un mensaje
                </h2>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campos Honeypot - Ocultos para usuarios reales */}
                <div className="hidden">
                  <label htmlFor="website">Website (no llenar):</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={honeypot.website}
                    onChange={handleHoneypotChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <label htmlFor="phone">Phone (no llenar):</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={honeypot.phone}
                    onChange={handleHoneypotChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <label htmlFor="url">URL (no llenar):</label>
                  <input
                    type="text"
                    id="url"
                    name="url"
                    value={honeypot.url}
                    onChange={handleHoneypotChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Solo mostrar campos adicionales si NO es demo */}
                {!showDemoMessage && (
                  <>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Tu nombre"
                        autoComplete="name"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder={showDemoMessage ? "" : "tu@email.com"}
                    autoComplete="email"
                  />
                </div>

                {/* Solo mostrar campos adicionales si NO es demo */}
                {!showDemoMessage && (
                  <>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Empresa
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Tu empresa"
                        autoComplete="organization"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Mensaje *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Cuéntanos cómo podemos ayudarte..."
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed text-gray-200' 
                      : 'bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:from-blue-700 hover:to-teal-700 hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {showDemoMessage ? 'Solicitando demo...' : 'Enviando...'}
                    </span>
                  ) : (
                    showDemoMessage ? 'Solicitar acceso a la demo' : 'Enviar mensaje'
                  )}
                </button>
              </form>
            </div>

            {/* Información de contacto */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Otras formas de contacto
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        Email
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        contacto@qark.app
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        LinkedIn
                      </h3>
                      <a 
                        href="https://www.linkedin.com/company/qark-app/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        @qark-app
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        Tiempo de respuesta medio
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Menos de 24 horas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;