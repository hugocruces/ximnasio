import { useState } from 'react';
import { Layout } from '../components/ui/Layout';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { mockClases } from '../data/mockData';
import { Clock, Users, Award } from 'lucide-react';

export function ClasesPage() {
  const [selectedCategoria, setSelectedCategoria] = useState<string>('todas');
  const [selectedClase, setSelectedClase] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const { getHorariosClase } = useData();

  const categorias = [
    { id: 'todas', label: 'Todas' },
    { id: 'cardio', label: 'Cardio' },
    { id: 'fuerza', label: 'Fuerza' },
    { id: 'flexibilidad', label: 'Flexibilidad' },
    { id: 'acuatico', label: 'Acuático' },
    { id: 'grupal', label: 'Grupal' }
  ];

  const clasesFiltradas = selectedCategoria === 'todas'
    ? mockClases
    : mockClases.filter(c => c.categoria === selectedCategoria);

  const claseSeleccionada = mockClases.find(c => c.id === selectedClase);
  const horariosClase = selectedClase ? getHorariosClase(selectedClase).slice(0, 5) : [];

  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestras Clases</h1>
          <p className="text-xl text-red-100 max-w-2xl">
            Más de 8 modalidades diferentes con instructores certificados
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="container-custom py-6">
          <div className="flex flex-wrap gap-3">
            {categorias.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoria(cat.id)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  selectedCategoria === cat.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clasesFiltradas.map((clase) => (
              <Card key={clase.id} hover padding="none" className="overflow-hidden">
                <div className="relative h-56 overflow-hidden group">
                  <img
                    src={clase.imagen}
                    alt={clase.nombre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="danger" size="md">
                      {clase.categoria}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <Button
                      onClick={() => setSelectedClase(clase.id)}
                      variant="secondary"
                      size="sm"
                    >
                      Ver Horarios
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{clase.nombre}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{clase.descripcion}</p>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-red-600" />
                      <span>Instructor: {clase.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-red-600" />
                      <span>Duración: {clase.duracionMinutos} minutos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-red-600" />
                      <span>Capacidad: {clase.capacidadMaxima} personas</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <Button
                      onClick={() => setSelectedClase(clase.id)}
                      variant="outline"
                      className="w-full"
                    >
                      Ver Horarios
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de Horarios */}
      <Modal
        isOpen={!!selectedClase}
        onClose={() => setSelectedClase(null)}
        title={`Horarios - ${claseSeleccionada?.nombre}`}
        size="lg"
      >
        {claseSeleccionada && (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <img
                src={claseSeleccionada.imagen}
                alt={claseSeleccionada.nombre}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg mb-1">{claseSeleccionada.nombre}</h3>
                <p className="text-sm text-gray-600 mb-2">{claseSeleccionada.descripcion}</p>
                <div className="flex gap-3 text-xs text-gray-500">
                  <span>⏱️ {claseSeleccionada.duracionMinutos} min</span>
                  <span>👤 {claseSeleccionada.instructor}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Próximos Horarios</h4>
              {horariosClase.length > 0 ? (
                <div className="space-y-2">
                  {horariosClase.map(horario => {
                    const plazasDisponibles = claseSeleccionada.capacidadMaxima - horario.inscritos.length;
                    const fecha = new Date(horario.fecha);
                    const fechaFormateada = fecha.toLocaleDateString('es-ES', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short'
                    });

                    return (
                      <div
                        key={horario.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <div className="font-medium text-sm">{fechaFormateada}</div>
                          <div className="text-sm text-gray-600">
                            {horario.horaInicio} - {horario.horaFin}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-700">
                            {plazasDisponibles} plazas disponibles
                          </div>
                          <div className="text-xs text-gray-500">{horario.precio}€</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No hay horarios disponibles próximamente</p>
              )}
            </div>

            {!isAuthenticated && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800">
                  <strong>Inicia sesión</strong> para reservar clases
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </Layout>
  );
}
