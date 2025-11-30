import { useState } from 'react';
import { Layout } from '../../components/ui/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

export function PerfilPage() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    apellidos: user?.apellidos || '',
    telefono: user?.telefono || '',
    email: user?.email || '',
    objetivos: user?.objetivos || '',
    foto: user?.foto || ''
  });

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="hero-gradient text-white py-8">
          <div className="container-custom">
            <h1 className="text-3xl font-bold">Mi Perfil</h1>
            <p className="text-red-100">Gestiona tu información personal</p>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Información Personal</CardTitle>
                  {!isEditing && (
                    <Button onClick={() => setIsEditing(true)} variant="outline">
                      Editar Perfil
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Photo */}
                  <div className="flex items-center gap-6">
                    {formData.foto ? (
                      <img
                        src={formData.foto}
                        alt={formData.nombre}
                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-3xl font-bold">
                        {formData.nombre.charAt(0)}
                      </div>
                    )}
                    {isEditing && (
                      <div className="flex-1">
                        <Input
                          label="URL de Foto"
                          name="foto"
                          value={formData.foto}
                          onChange={handleChange}
                          placeholder="https://ejemplo.com/foto.jpg"
                        />
                      </div>
                    )}
                  </div>

                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                    />
                    <Input
                      label="Apellidos"
                      name="apellidos"
                      value={formData.apellidos}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                    />
                    <Input
                      label="Teléfono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>

                  {/* Objetivos */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Objetivos de Fitness
                    </label>
                    <textarea
                      name="objetivos"
                      value={formData.objetivos}
                      onChange={handleChange}
                      disabled={!isEditing}
                      rows={3}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors ${
                        !isEditing ? 'bg-gray-100' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="Describe tus objetivos..."
                    />
                  </div>

                  {/* Membership Info (Read Only) */}
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold text-lg mb-4">Información de Membresía</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Tipo de Membresía
                        </label>
                        <p className="text-lg font-semibold capitalize">{user.tipoMembresia}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Fecha de Expiración
                        </label>
                        <p className="text-lg font-semibold">
                          {new Date(user.fechaExpiracion).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Miembro desde
                        </label>
                        <p className="text-lg font-semibold">
                          {new Date(user.fechaRegistro).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  {isEditing && (
                    <div className="flex gap-3 pt-4">
                      <Button type="submit" variant="primary">
                        Guardar Cambios
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            nombre: user.nombre,
                            apellidos: user.apellidos,
                            telefono: user.telefono,
                            email: user.email,
                            objetivos: user.objetivos || '',
                            foto: user.foto || ''
                          });
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
