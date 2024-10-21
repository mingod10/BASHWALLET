import React, { useState } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

const initialRoles: Role[] = [
  { id: '1', name: 'Super Admin', description: 'Acceso completo a todas las funciones', permissions: ['Todos'] },
  { id: '2', name: 'Gestor de Cuentas', description: 'Gestionar cuentas y empleados', permissions: ['Gestionar Cuentas', 'Gestionar Empleados'] },
  { id: '3', name: 'Gestor de Tarjetas', description: 'Gestionar tarjetas y transacciones', permissions: ['Gestionar Tarjetas', 'Ver Transacciones'] },
];

const AdminRoles: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const handleAddRole = () => {
    setEditingRole(null);
    setIsModalOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setIsModalOpen(true);
  };

  const handleDeleteRole = (id: string) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  const handleSubmitRole = (role: Role) => {
    if (editingRole) {
      setRoles(roles.map(r => r.id === role.id ? role : r));
    } else {
      setRoles([...roles, { ...role, id: String(roles.length + 1) }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestionar Roles</h1>
        <button
          onClick={handleAddRole}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Añadir Rol
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permisos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map((role) => (
              <tr key={role.id}>
                <td className="px-6 py-4 whitespace-nowrap">{role.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{role.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {role.permissions.join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditRole(role)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteRole(role.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <RoleModal
          role={editingRole}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitRole}
        />
      )}
    </div>
  );
};

interface RoleModalProps {
  role: Role | null;
  onClose: () => void;
  onSubmit: (role: Role) => void;
}

const RoleModal: React.FC<RoleModalProps> = ({ role, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<Role>(
    role || { id: '', name: '', description: '', permissions: [] }
  );

  const allPermissions = ['Gestionar Cuentas', 'Gestionar Empleados', 'Gestionar Tarjetas', 'Ver Transacciones', 'Gestionar Beneficios'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{role ? 'Editar Rol' : 'Añadir Nuevo Rol'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows={3}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Permisos</label>
            {allPermissions.map(permission => (
              <div key={permission} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={permission}
                  checked={formData.permissions.includes(permission)}
                  onChange={() => handlePermissionChange(permission)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor={permission} className="ml-2 block text-sm text-gray-900">
                  {permission}
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md"
            >
              {role ? 'Actualizar' : 'Añadir'} Rol
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRoles;