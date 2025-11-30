import { useState } from 'react';
import { Layout } from '../../components/ui/Layout';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Calendar, Clock, X, AlertTriangle } from 'lucide-react';

export function MisReservasPage() {
  const { user } = useAuth();
  const { getReservasUsuario, getHorarioById, getClaseById, cancelReserva } = useData();
  const [cancelingReserva, setCancelingReserva] = useState<string | null>(null);
  const [cancelResult, setCancelResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!user) return null;

  const reservas = getReservasUsuario(user.id);
  const reservasConDetalles = reservas.map(reserva => {
    const horario = getHorarioById(reserva.horarioClaseId);
    const clase = horario ? getClaseById(horario.claseId) : null;
    return { reserva, horario, clase };
  }).sort((a, b) => {
    if (!a.horario || !b.horario) return 0;
    return new Date(b.horario.fecha).getTime() - new Date(a.horario.fecha).getTime();
  });

  const handleCancelar = (reservaId: string) => {
    const result = cancelReserva(reservaId);
    setCancelResult({
      success: result.success,
      message: result.error || 'Reserva cancelada correctamente'
    });
    setCancelingReserva(null);
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="hero-gradient text-white py-8">
          <div className="container-custom">
            <h1 className="text-3xl font-bold">Mis Reservas</h1>
            <p className="text-red-100">Gestiona tus clases reservadas</p>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="max-w-4xl mx-auto">
            {cancelResult && (
              <div className={`mb-6 p-4 rounded-lg ${cancelResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p className={`text-sm ${cancelResult.success ? 'text-green-800' : 'text-red-800'}`}>
                  {cancelResult.message}
                </p>
              </div>
            )}

            {reservasConDetalles.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No tienes reservas
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Explora nuestras clases y haz tu primera reserva
                  </p>
                  <a
                    href="/clases"
                    className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
                  >
                    Ver Clases Disponibles
                  </a>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {reservasConDetalles.map(({ reserva, horario, clase }) => {
                  if (!horario || !clase) return null;

                  const fecha = new Date(horario.fecha);
                  const ahora = new Date();
                  const esPasada = fecha < ahora;
                  const fechaFormateada = fecha.toLocaleDateString('es-ES', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  });

                  const getEstadoBadge = () => {
                    switch (reserva.estado) {
                      case 'confirmada':
                        return <Badge variant="success">Confirmada</Badge>;
                      case 'cancelada':
                        return <Badge variant="danger">Cancelada</Badge>;
                      case 'completada':
                        return <Badge variant="info">Completada</Badge>;
                      default:
                        return null;
                    }
                  };

                  return (
                    <Card key={reserva.id} hover>
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row gap-4 p-6">
                          <img
                            src={clase.imagen}
                            alt={clase.nombre}
                            className="w-full md:w-32 h-32 rounded-lg object-cover"
                          />
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">{clase.nombre}</h3>
                                <p className="text-sm text-gray-600">{clase.instructor}</p>
                              </div>
                              {getEstadoBadge()}
                            </div>

                            <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-red-600" />
                                <span className="capitalize">{fechaFormateada}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-red-600" />
                                <span>{horario.horaInicio} - {horario.horaFin}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span>💰</span>
                                <span>{reserva.precioPagado}€</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span>📅</span>
                                <span>Reservado: {new Date(reserva.fechaReserva).toLocaleDateString('es-ES')}</span>
                              </div>
                            </div>

                            {reserva.estado === 'confirmada' && !esPasada && (
                              <div className="mt-4 pt-4 border-t">
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => setCancelingReserva(reserva.id)}
                                >
                                  <X className="w-4 h-4 mr-2" />
                                  Cancelar Reserva
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Cancel Modal */}
        <Modal
          isOpen={!!cancelingReserva}
          onClose={() => setCancelingReserva(null)}
          title="Cancelar Reserva"
          size="sm"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-semibold mb-1">Importante:</p>
                <p>
                  Si cancelas con menos de 1 hora de antelación, se te cobrará el 50% del precio de la clase.
                </p>
              </div>
            </div>
            
            <p className="text-gray-600">
              ¿Estás seguro de que deseas cancelar esta reserva?
            </p>

            <div className="flex gap-3">
              <Button
                variant="danger"
                onClick={() => cancelingReserva && handleCancelar(cancelingReserva)}
                className="flex-1"
              >
                Sí, Cancelar
              </Button>
              <Button
                variant="outline"
                onClick={() => setCancelingReserva(null)}
                className="flex-1"
              >
                No, Mantener
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
}
