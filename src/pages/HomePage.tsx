import { Link } from 'react-router-dom';
import { ArrowRight, Dumbbell, Users, Trophy, Clock } from 'lucide-react';
import { Layout } from '../components/ui/Layout';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { mockClases, mockInstalaciones } from '../data/mockData';

export function HomePage() {
  const featuredClases = mockClases.slice(0, 3);
  const featuredInstalaciones = mockInstalaciones.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient text-white">
        <div className="container-custom section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Transforma tu cuerpo, transforma tu vida
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-red-100">
                Únete a Ximnasio y descubre el gimnasio que te ayudará a alcanzar tus objetivos
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/precios">
                  <Button size="lg" variant="secondary">
                    Ver Tarifas
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/clases">
                  <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-red-600">
                    Nuestras Clases
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block animate-slide-up">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop"
                alt="Gimnasio Ximnasio"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir Ximnasio?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Más de 10 años ayudando a nuestros socios a alcanzar sus metas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Dumbbell,
                title: 'Equipamiento Premium',
                description: 'Las mejores máquinas y equipos del mercado'
              },
              {
                icon: Users,
                title: 'Clases Grupales',
                description: 'Más de 100 clases semanales con instructores certificados'
              },
              {
                icon: Trophy,
                title: 'Entrenadores Expertos',
                description: 'Personal altamente cualificado a tu disposición'
              },
              {
                icon: Clock,
                title: 'Horario Flexible',
                description: 'Abierto desde las 6:00 hasta las 23:00'
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center" hover>
                <CardContent className="pt-6">
                  <feature.icon className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Classes */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Clases Destacadas
              </h2>
              <p className="text-lg text-gray-600">
                Encuentra la actividad perfecta para ti
              </p>
            </div>
            <Link to="/clases">
              <Button variant="outline">
                Ver Todas
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredClases.map((clase) => (
              <Card key={clase.id} hover padding="none" className="overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={clase.imagen}
                    alt={clase.nombre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {clase.categoria}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{clase.nombre}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{clase.descripcion}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>👤 {clase.instructor}</span>
                    <span>⏱️ {clase.duracionMinutos} min</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Facilities */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestras Instalaciones
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Todo lo que necesitas para tu entrenamiento en un solo lugar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredInstalaciones.map((instalacion) => (
              <Card key={instalacion.id} hover padding="none" className="overflow-hidden">
                <div className="h-56 overflow-hidden">
                  <img
                    src={instalacion.imagen}
                    alt={instalacion.nombre}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{instalacion.nombre}</h3>
                  <p className="text-gray-600 text-sm">{instalacion.descripcion}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/instalaciones">
              <Button size="lg" variant="primary">
                Ver Todas las Instalaciones
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding hero-gradient text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para comenzar tu transformación?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Únete a cientos de personas que ya están alcanzando sus objetivos en Ximnasio
          </p>
          <Link to="/precios">
            <Button size="lg" variant="secondary">
              Ver Planes y Precios
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
