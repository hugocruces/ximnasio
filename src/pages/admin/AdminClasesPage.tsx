import { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar } from 'lucide-react';
import { Layout } from '../../components/ui/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useData } from '../../context/DataContext';

export function AdminClasesPage() {
  const { clases, horarios, getHorariosClase } = useData();
  const [selectedCategoria, setSelectedCategoria] = useState<string>('todas');

  const categorias = [
    { id: 'todas', label: 'Todas' },
    { id: 'cardio', label: 'Cardio' },
    { id: 'fuerza', label: 'Fuerza' },
    { id: 'flexibilidad', label: 'Flexibilidad' },
    { id: 'acuatico', label: 'Acuático' },
    { id: 'grupal', label: 'Grupal' }
  ];

  const clasesFiltradas = selectedCategoria === 'todas'
    ? clases
    : clases.filter(c => c.categoria === selectedCategoria);

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8">
          <div className="container-custom">
            <h1 className="text-3xl font-bold">Gestión de Clases</h1>
            <p className="text-gray-300">Administra las clases y horarios</p>
          </div>
        </div>

        <div className="container-custom py-8">
          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-3">
            {categorias.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoria(cat.id)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  selectedCategoria === cat.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Clases ({clasesFiltradas.length})</CardTitle>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Clase
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clasesFiltradas.map(clase => {
                  const horariosClase = getHorariosClase(clase.id);
                  const proximosHorarios = horariosClase.filter(
                    h => new Date(h.fecha) >= new Date()
                  ).length;

                  return (
                    <Card key={clase.id} hover padding="none" className="overflow-hidden">
                      <div className="relative h-40">
                        <img
                          src={clase.imagen}
                          alt={clase.nombre}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge variant="danger">{clase.categoria}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2">{clase.nombre}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {clase.descripcion}
                        </p>
                        <div className="text-xs text-gray-500 space-y-1 mb-4">
                          <p>👤 {clase.instructor}</p>
                          <p>⏱️ {clase.duracionMinutos} min</p>
                          <p>👥 Capacidad: {clase.capacidadMaxima}</p>
                          <p>📅 {proximosHorarios} horarios próximos</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit2 className="w-3 h-3 mr-1" />
                            Editar
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            Horarios
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Schedules */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Próximos Horarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Clase</th>
                      <th className="text-left py-3 px-4 font-semibold">Fecha</th>
                      <th className="text-left py-3 px-4 font-semibold">Hora</th>
                      <th className="text-left py-3 px-4 font-semibold">Inscritos</th>
                      <th className="text-left py-3 px-4 font-semibold">Precio</th>
                      <th className="text-right py-3 px-4 font-semibold">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {horarios
                      .filter(h => new Date(h.fecha) >= new Date())
                      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
                      .slice(0, 10)
                      .map(horario => {
                        const clase = clases.find(c => c.id === horario.claseId);
                        if (!clase) return null;

                        const fecha = new Date(horario.fecha);
                        const ocupacion = (horario.inscritos.length / clase.capacidadMaxima) * 100;

                        return (
                          <tr key={horario.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="font-medium">{clase.nombre}</div>
                              <div className="text-xs text-gray-500">{clase.instructor}</div>
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {fecha.toLocaleDateString('es-ES', {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'short'
                              })}
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {horario.horaInicio} - {horario.horaFin}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full ${
                                      ocupacion >= 90 ? 'bg-red-500' : ocupacion >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}
                                    style={{ width: `${ocupacion}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium">
                                  {horario.inscritos.length}/{clase.capacidadMaxima}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm font-medium">{horario.precio}€</td>
                            <td className="py-3 px-4">
                              <div className="flex justify-end gap-2">
                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                  <Trash2 className="w-4 h-4" />
                                </button>
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
      </div>
    </Layout>
  );
}
