import { Link } from 'react-router-dom';
import { Users, Calendar, DollarSign, Award } from 'lucide-react';
import { Layout } from '../../components/ui/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { useData } from '../../context/DataContext';

export function AdminDashboardPage() {
  const { users, clases, reservas, horarios } = useData();

  const totalUsuarios = users.filter(u => u.role === 'user').length;
  const reservasActivas = reservas.filter(r => r.estado === 'confirmada').length;
  const ingresosMes = reservas
    .filter(r => {
      const fecha = new Date(r.fechaReserva);
      const ahora = new Date();
      return fecha.getMonth() === ahora.getMonth() && fecha.getFullYear() === ahora.getFullYear();
    })
    .reduce((sum, r) => sum + r.precioPagado, 0);

  const proximosHorarios = horarios
    .filter(h => new Date(h.fecha) >= new Date())
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
    .slice(0, 5);

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8">
          <div className="container-custom">
            <h1 className="text-3xl font-bold">Panel de Administración</h1>
            <p className="text-gray-300">Gestiona tu gimnasio desde aquí</p>
          </div>
        </div>

        <div className="container-custom py-8">
          {/* Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card hover>
              <CardContent className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Usuarios</p>
                  <p className="text-2xl font-bold text-gray-900">{totalUsuarios}</p>
                </div>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Reservas Activas</p>
                  <p className="text-2xl font-bold text-gray-900">{reservasActivas}</p>
                </div>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Clases</p>
                  <p className="text-2xl font-bold text-gray-900">{clases.length}</p>
                </div>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ingresos Mes</p>
                  <p className="text-2xl font-bold text-gray-900">{ingresosMes.toFixed(2)}€</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white" hover>
              <CardContent className="text-center py-8">
                <Users className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Gestión de Usuarios</h3>
                <p className="text-blue-100 mb-4 text-sm">
                  Añade, edita o elimina usuarios del sistema
                </p>
                <Link
                  to="/admin/usuarios"
                  className="inline-block px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Ir a Usuarios
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white" hover>
              <CardContent className="text-center py-8">
                <Award className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Gestión de Clases</h3>
                <p className="text-purple-100 mb-4 text-sm">
                  Crea y administra clases y sus horarios
                </p>
                <Link
                  to="/admin/clases"
                  className="inline-block px-6 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors"
                >
                  Ir a Clases
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white" hover>
              <CardContent className="text-center py-8">
                <Calendar className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Horarios</h3>
                <p className="text-green-100 mb-4 text-sm">
                  Programa horarios para las clases
                </p>
                <Link
                  to="/admin/clases"
                  className="inline-block px-6 py-2 bg-white text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors"
                >
                  Gestionar Horarios
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Próximas Clases</CardTitle>
              </CardHeader>
              <CardContent>
                {proximosHorarios.length > 0 ? (
                  <div className="space-y-3">
                    {proximosHorarios.map(horario => {
                      const clase = clases.find(c => c.id === horario.claseId);
                      if (!clase) return null;

                      const fecha = new Date(horario.fecha);
                      const fechaFormateada = fecha.toLocaleDateString('es-ES', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short'
                      });

                      return (
                        <div
                          key={horario.id}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-gray-900">{clase.nombre}</p>
                            <p className="text-sm text-gray-600">
                              {fechaFormateada} • {horario.horaInicio}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-700">
                              {horario.inscritos.length}/{clase.capacidadMaxima}
                            </p>
                            <p className="text-xs text-gray-500">inscritos</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No hay horarios próximos</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usuarios Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {users
                    .filter(u => u.role === 'user')
                    .sort((a, b) => new Date(b.fechaRegistro).getTime() - new Date(a.fechaRegistro).getTime())
                    .slice(0, 5)
                    .map(user => (
                      <div
                        key={user.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        {user.foto ? (
                          <img
                            src={user.foto}
                            alt={user.nombre}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-semibold">
                            {user.nombre.charAt(0)}
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {user.nombre} {user.apellidos}
                          </p>
                          <p className="text-sm text-gray-600 capitalize">{user.tipoMembresia}</p>
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(user.fechaRegistro).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
