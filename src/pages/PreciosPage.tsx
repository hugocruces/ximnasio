import { Check } from 'lucide-react';
import { Layout } from '../components/ui/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { mockPlanesMembresia, mockPreciosClases, mockClases } from '../data/mockData';

export function PreciosPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tarifas y Precios</h1>
          <p className="text-xl text-red-100 max-w-2xl">
            Elige el plan que mejor se adapte a tus necesidades
          </p>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Planes de Membresía</h2>
            <p className="text-gray-600">Sin permanencia. Cancela cuando quieras.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {mockPlanesMembresia.map((plan) => (
              <Card
                key={plan.id}
                hover
                className={`relative ${
                  plan.destacado
                    ? 'border-2 border-red-600 shadow-xl scale-105'
                    : ''
                }`}
              >
                {plan.destacado && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Más Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="text-2xl font-bold mb-2">{plan.nombre}</div>
                    <div className="text-4xl font-bold text-red-600">
                      {plan.precio}€
                      <span className="text-lg text-gray-500 font-normal">/mes</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.caracteristicas.map((caracteristica, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm">{caracteristica}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.destacado ? 'primary' : 'outline'}
                    className="w-full"
                  >
                    Seleccionar Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Classes Prices */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Precios de Clases Sueltas</h2>
            <p className="text-gray-600">¿Prefieres pagar por clase? Tenemos opciones para ti</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-4 px-4 font-semibold text-gray-900">Clase</th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-900">1 Clase</th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-900">Bono 5</th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-900">Bono 10</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPreciosClases.map((precio) => {
                        const clase = mockClases.find(c => c.id === precio.claseId);
                        if (!clase) return null;

                        return (
                          <tr key={precio.id} className="border-b hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <div className="font-medium text-gray-900">{clase.nombre}</div>
                              <div className="text-sm text-gray-500">{clase.duracionMinutos} min</div>
                            </td>
                            <td className="text-center py-4 px-4 text-gray-700">
                              {precio.precioUnitario}€
                            </td>
                            <td className="text-center py-4 px-4">
                              <div className="text-gray-700 font-medium">{precio.precioPaquete5}€</div>
                              <div className="text-xs text-green-600">
                                Ahorro: {((precio.precioUnitario * 5 - precio.precioPaquete5)).toFixed(0)}€
                              </div>
                            </td>
                            <td className="text-center py-4 px-4">
                              <div className="text-gray-700 font-medium">{precio.precioPaquete10}€</div>
                              <div className="text-xs text-green-600">
                                Ahorro: {((precio.precioUnitario * 10 - precio.precioPaquete10)).toFixed(0)}€
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              <strong>Nota:</strong> Los bonos de clases tienen una validez de 3 meses desde su compra
            </p>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="text-center">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="font-bold text-lg mb-2">Sin Permanencia</h3>
                <p className="text-sm text-gray-600">
                  Cancela tu membresía cuando quieras, sin penalizaciones
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center">
                <div className="text-4xl mb-3">💪</div>
                <h3 className="font-bold text-lg mb-2">Primera Clase Gratis</h3>
                <p className="text-sm text-gray-600">
                  Prueba cualquier clase grupal sin compromiso
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center">
                <div className="text-4xl mb-3">👥</div>
                <h3 className="font-bold text-lg mb-2">Trae un Amigo</h3>
                <p className="text-sm text-gray-600">
                  Invita a un amigo y ambos obtienen un 10% de descuento
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
