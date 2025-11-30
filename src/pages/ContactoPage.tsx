import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Layout } from '../components/ui/Layout';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { contactoInfo, horarioGimnasio } from '../data/mockData';

export function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular envío
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contacto</h1>
          <p className="text-xl text-red-100 max-w-2xl">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card hover>
              <CardContent className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Dirección</h3>
                <p className="text-sm text-gray-600">{contactoInfo.direccion}</p>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Teléfono</h3>
                <p className="text-sm text-gray-600">{contactoInfo.telefono}</p>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-sm text-gray-600">{contactoInfo.email}</p>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Horario</h3>
                <p className="text-sm text-gray-600">Lun-Vie: 6:00-23:00</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h2>
              
              {submitted ? (
                <Card className="bg-green-50 border border-green-200">
                  <CardContent className="text-center py-8">
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">
                      ¡Mensaje enviado!
                    </h3>
                    <p className="text-green-700">
                      Te responderemos lo antes posible
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Nombre completo"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Juan Pérez"
                  />
                  
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@email.com"
                  />
                  
                  <Input
                    label="Teléfono"
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="612 345 678"
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje
                    </label>
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent hover:border-gray-400 transition-colors"
                      placeholder="Cuéntanos en qué podemos ayudarte..."
                    />
                  </div>
                  
                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensaje
                  </Button>
                </form>
              )}
            </div>

            {/* Schedule & Map */}
            <div className="space-y-6">
              <Card>
                <CardContent>
                  <h3 className="font-bold text-lg mb-4">Horario de Apertura</h3>
                  <div className="space-y-2">
                    {horarioGimnasio.map(h => (
                      <div key={h.dia} className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">{h.dia}</span>
                        <span className="text-gray-600">
                          {h.apertura} - {h.cierre}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card>
                <CardContent className="p-0">
                  <div className="h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center p-8">
                      <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium">{contactoInfo.direccion}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Lat: {contactoInfo.coordenadas.lat}, Lng: {contactoInfo.coordenadas.lng}
                      </p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${contactoInfo.coordenadas.lat},${contactoInfo.coordenadas.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 text-red-600 hover:text-red-700 font-medium text-sm"
                      >
                        Ver en Google Maps →
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Preguntas Frecuentes
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: '¿Necesito experiencia previa para apuntarme?',
                a: 'No, nuestro gimnasio está abierto a todos los niveles. Tenemos clases para principiantes y nuestros entrenadores te ayudarán a empezar.'
              },
              {
                q: '¿Puedo probar una clase antes de inscribirme?',
                a: 'Sí, ofrecemos una primera clase gratis en cualquier actividad grupal para que puedas probar antes de decidirte.'
              },
              {
                q: '¿Hay aparcamiento disponible?',
                a: 'Sí, contamos con parking gratuito para los socios VIP y parking de pago para el resto de socios.'
              },
              {
                q: '¿Qué debo traer para mi primera visita?',
                a: 'Ropa deportiva cómoda, zapatillas y una toalla. Nosotros proporcionamos las esterillas y todo el equipo necesario para las clases.'
              }
            ].map((faq, index) => (
              <Card key={index} hover>
                <CardContent>
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
