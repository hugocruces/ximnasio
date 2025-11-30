import { useState } from 'react';
import { Trash2, Plus, Edit2 } from 'lucide-react';
import { Layout } from '../../components/ui/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { useData } from '../../context/DataContext';
import type { User } from '../../types';

export function AdminUsuariosPage() {
  const { users, addUser, removeUser, updateUserData } = useData();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    apellidos: '',
    telefono: '',
    tipoMembresia: 'basico' as 'basico' | 'premium' | 'vip',
    fechaExpiracion: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      updateUserData(editingUser.id, formData);
      setEditingUser(null);
    } else {
      addUser({ ...formData, role: 'user' });
      setShowAddModal(false);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      nombre: '',
      apellidos: '',
      telefono: '',
      tipoMembresia: 'basico',
      fechaExpiracion: ''
    });
  };

  const handleEdit = (user: User) => {
    setFormData({
      email: user.email,
      password: user.password,
      nombre: user.nombre,
      apellidos: user.apellidos,
      telefono: user.telefono,
      tipoMembresia: user.tipoMembresia,
      fechaExpiracion: user.fechaExpiracion
    });
    setEditingUser(user);
  };

  const filteredUsers = users
    .filter(u => u.role === 'user')
    .filter(u =>
      u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8">
          <div className="container-custom">
            <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
            <p className="text-gray-300">Administra los miembros del gimnasio</p>
          </div>
        </div>

        <div className="container-custom py-8">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <CardTitle>Usuarios Registrados ({filteredUsers.length})</CardTitle>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <Input
                    placeholder="Buscar usuarios..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="md:w-64"
                  />
                  <Button onClick={() => setShowAddModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Añadir Usuario
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Usuario</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Teléfono</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Membresía</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Expira</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => {
                      const diasHastaExpiracion = Math.ceil(
                        (new Date(user.fechaExpiracion).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                      );

                      return (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
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
                              <div>
                                <p className="font-medium text-gray-900">
                                  {user.nombre} {user.apellidos}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Desde {new Date(user.fechaRegistro).toLocaleDateString('es-ES')}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{user.telefono}</td>
                          <td className="py-3 px-4">
                            <Badge
                              variant={
                                user.tipoMembresia === 'vip'
                                  ? 'warning'
                                  : user.tipoMembresia === 'premium'
                                  ? 'info'
                                  : 'default'
                              }
                            >
                              {user.tipoMembresia.toUpperCase()}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`text-sm ${
                                diasHastaExpiracion < 30 ? 'text-orange-600 font-medium' : 'text-gray-600'
                              }`}
                            >
                              {diasHastaExpiracion} días
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleEdit(user)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Editar"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`¿Eliminar a ${user.nombre} ${user.apellidos}?`)) {
                                    removeUser(user.id);
                                  }
                                }}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Eliminar"
                              >
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

        {/* Add/Edit Modal */}
        <Modal
          isOpen={showAddModal || !!editingUser}
          onClose={() => {
            setShowAddModal(false);
            setEditingUser(null);
            resetForm();
          }}
          title={editingUser ? 'Editar Usuario' : 'Añadir Nuevo Usuario'}
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
              <Input
                label="Apellidos"
                value={formData.apellidos}
                onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Input
                label="Teléfono"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              />
            </div>

            {!editingUser && (
              <Input
                label="Contraseña"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <Select
                label="Tipo de Membresía"
                value={formData.tipoMembresia}
                onChange={(e) =>
                  setFormData({ ...formData, tipoMembresia: e.target.value as 'basico' | 'premium' | 'vip' })
                }
                options={[
                  { value: 'basico', label: 'Básico' },
                  { value: 'premium', label: 'Premium' },
                  { value: 'vip', label: 'VIP' }
                ]}
              />
              <Input
                label="Fecha de Expiración"
                type="date"
                value={formData.fechaExpiracion}
                onChange={(e) => setFormData({ ...formData, fechaExpiracion: e.target.value })}
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" variant="primary">
                {editingUser ? 'Actualizar Usuario' : 'Crear Usuario'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingUser(null);
                  resetForm();
                }}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  );
}
