import { Link } from 'react-router-dom';
import { Calendar, Award, Clock, TrendingUp } from 'lucide-react';
import { Layout } from '../../components/ui/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export function DashboardPage() {
  const { user } = useAuth();
  const { getReservasUsuario, getHorarioById, getClaseById } = useData();

  if (!user) return null;

  const reservasUsuario = getReservasUsuario(user.id);
  const reservasActivas = reservasUsuario.filter(r => r.estado === 'confirmada');
  
  const proximasClases = reservasActivas
    .map(reserva => {
      const horario = getHorarioById(reserva.horarioClaseId);
      const clase = horario ? getClaseById(horario.claseId) : null;
      return { reserva, horario, clase };
    })
    .filter(item => item.horario && item.clase)
    .sort((a, b) => {
      if (!a.horario || !b.horario) return 0;
      return new Date(a.horario.fecha).getTime() - new Date(b.horario.fecha).getTime();
    })
    .slice(0, 3);

  const diasHastaExpiracion = user.fechaExpiracion
    ? Math.ceil((new Date(user.fechaExpiracion).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="hero-gradient text-white py-8">
          <div className="container-custom">
            <div className="flex items-center gap-4">
              {user.foto ? (
                <img
                  src={user.foto}
                  alt={user.nombre}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg bg-white flex items-center justify-center text-red-600 text-3xl font-bold">
                  {user.nombre.charAt(0)}
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold">¡Hola, {user.nombre}!</h1>
                <p className="text-red-100">Bienvenido a tu panel personal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="container-custom py-8">
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card hover>
              <CardContent className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Membresía</p>
                  <p className="text-xl font-bold text-gray-900 capitalize">{user.tipoMembresia}</p>
                </div>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Clases Reservadas</p>
                  <p className="text-xl font-bold text-gray-900">{reservasActivas.length}</p>
                </div>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Días Restantes</p>
                  <p className="text-xl font-bold text-gray-900">{diasHastaExpiracion}</p>
                </div>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Clases Completadas</p>
                  <p className="text-xl font-bold text-gray-900">
                    {reservasUsuario.filter(r => r.estado === 'completada').length}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Próximas Clases */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Mis Próximas Clases</CardTitle>
                </CardHeader>
                <CardContent>
                  {proximasClases.length > 0 ? (
                    <div className="space-y-4">
                      {proximasClases.map(({ reserva, horario, clase }) => {
                        if (!horario || !clase) return null;
                        
                        const fecha = new Date(horario.fecha);
                        const fechaFormateada = fecha.toLocaleDateString('es-ES', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long'
                        });

                        return (
                          <div
                            key={reserva.id}
                            className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <img
                              src={clase.imagen}
                              alt={clase.nombre}
                              className="w-24 h-24 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold text-lg text-gray-900">{clase.nombre}</h3>
                                  <p className="text-sm text-gray-600">{clase.instructor}</p>
                                </div>
                                <Badge variant="success">Confirmada</Badge>
                              </div>
                              <div className="text-sm text-gray-600">
                                <p className="capitalize">{fechaFormateada}</p>
                                <p>{horario.horaInicio} - {horario.horaFin}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">No tienes clases reservadas</p>
                      <Link
                        to="/clases"
                        className="text-red-600 hover:text-red-700 font-medium"
                      >
                        Explorar Clases →
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Acciones Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link
                    to="/clases"
                    className="block px-4 py-3 bg-red-600 text-white rounded-lg text-center font-medium hover:bg-red-700 transition-colors"
                  >
                    Reservar Clase
                  </Link>
                  <Link
                    to="/mis-reservas"
                    className="block px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg text-center font-medium hover:bg-gray-50 transition-colors"
                  >
                    Ver Mis Reservas
                  </Link>
                  <Link
                    to="/perfil"
                    className="block px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg text-center font-medium hover:bg-gray-50 transition-colors"
                  >
                    Editar Perfil
                  </Link>
                </CardContent>
              </Card>

              <Card className={diasHastaExpiracion < 30 ? 'border-2 border-orange-300' : ''}>
                <CardHeader>
                  <CardTitle>Estado de Membresía</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tipo:</span>
                      <span className="font-semibold capitalize">{user.tipoMembresia}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Expira:</span>
                      <span className="font-semibold">
                        {new Date(user.fechaExpiracion).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                    {diasHastaExpiracion < 30 && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mt-3">
                        <p className="text-sm text-orange-800">
                          ⚠️ Tu membresía expira en {diasHastaExpiracion} días
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
