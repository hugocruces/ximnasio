import { Layout } from '../components/ui/Layout';
import { Card, CardContent } from '../components/ui/Card';
import { FeatureList } from '../components/ui/Badge';
import { mockInstalaciones } from '../data/mockData';

export function InstalacionesPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestras Instalaciones</h1>
          <p className="text-xl text-red-100 max-w-2xl">
            Espacios modernos y equipados con la última tecnología para tu entrenamiento
          </p>
        </div>
      </section>

      {/* Facilities */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="space-y-12">
            {mockInstalaciones.map((instalacion, index) => (
              <Card
                key={instalacion.id}
                hover
                className={index % 2 === 0 ? '' : 'bg-gray-50'}
              >
                <div className={`grid lg:grid-cols-2 gap-8 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <img
                      src={instalacion.imagen}
                      alt={instalacion.nombre}
                      className="w-full h-80 object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {instalacion.nombre}
                    </h2>
                    <p className="text-gray-600 mb-6 text-lg">
                      {instalacion.descripcion}
                    </p>
                    <FeatureList features={instalacion.caracteristicas} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white text-center">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">¿Quieres ver nuestras instalaciones?</h2>
              <p className="text-red-100 text-lg mb-6 max-w-2xl mx-auto">
                Ven a visitarnos y descubre todo lo que Ximnasio puede ofrecerte. Nuestro equipo estará encantado de mostrarte las instalaciones.
              </p>
              <a
                href="/contacto"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-red-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contacta con Nosotros
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
