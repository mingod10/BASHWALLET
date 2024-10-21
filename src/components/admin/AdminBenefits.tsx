import React, { useState } from 'react';
import { Edit, Trash2, Plus, Search } from 'lucide-react';

interface Benefit {
  id: string;
  razonComercial: string;
  razonSocial: string;
  ruc: string;
  dv: string;
  telefono: string;
  correo: string;
  contacto: string;
  direccion: string;
  direccion2: string;
  sucursales: Sucursal[];
  estado: 'Activo' | 'Inactivo' | 'Bloqueado';
}

interface Sucursal {
  nombre: string;
  direccion: string;
  mcc: string[];
}

interface BenefitModalProps {
  benefit: Benefit | null;
  onClose: () => void;
  onSubmit: (benefit: Benefit) => void;
}

const AdminBenefits: React.FC = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState<Benefit | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddBenefit = () => {
    setEditingBenefit(null);
    setIsModalOpen(true);
  };

  const handleEditBenefit = (benefit: Benefit) => {
    setEditingBenefit(benefit);
    setIsModalOpen(true);
  };

  const handleDeleteBenefit = (id: string) => {
    setBenefits(benefits.filter(benefit => benefit.id !== id));
  };

  const handleSubmitBenefit = (benefit: Benefit) => {
    if (editingBenefit) {
      setBenefits(benefits.map(b => b.id === benefit.id ? benefit : b));
    } else {
      setBenefits([...benefits, { ...benefit, id: String(benefits.length + 1) }]);
    }
    setIsModalOpen(false);
  };

  const filteredBenefits = benefits.filter(benefit =>
    benefit.razonComercial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    benefit.razonSocial.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestionar Beneficios</h1>
        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Buscar beneficios..."
              className="pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <button
            onClick={handleAddBenefit}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Añadir Beneficio
          </button>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Razón Comercial</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Razón Social</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RUC</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBenefits.map((benefit) => (
              <tr key={benefit.id}>
                <td className="px-6 py-4 whitespace-nowrap">{benefit.razonComercial}</td>
                <td className="px-6 py-4 whitespace-nowrap">{benefit.razonSocial}</td>
                <td className="px-6 py-4 whitespace-nowrap">{benefit.ruc}-{benefit.dv}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    benefit.estado === 'Activo' ? 'bg-green-100 text-green-800' :
                    benefit.estado === 'Inactivo' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {benefit.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditBenefit(benefit)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteBenefit(benefit.id)}
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
        <BenefitModal
          benefit={editingBenefit}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitBenefit}
        />
      )}
    </div>
  );
};

const BenefitModal: React.FC<BenefitModalProps> = ({ benefit, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<Benefit>(
    benefit || {
      id: '',
      razonComercial: '',
      razonSocial: '',
      ruc: '',
      dv: '',
      telefono: '',
      correo: '',
      contacto: '',
      direccion: '',
      direccion2: '',
      sucursales: [],
      estado: 'Activo'
    }
  );

  const [showSucursalModal, setShowSucursalModal] = useState(false);
  const [editingSucursal, setEditingSucursal] = useState<Sucursal | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAddSucursal = () => {
    setEditingSucursal(null);
    setShowSucursalModal(true);
  };

  const handleEditSucursal = (sucursal: Sucursal) => {
    setEditingSucursal(sucursal);
    setShowSucursalModal(true);
  };

  const handleSubmitSucursal = (sucursal: Sucursal) => {
    if (editingSucursal) {
      setFormData(prev => ({
        ...prev,
        sucursales: prev.sucursales.map(s => s === editingSucursal ? sucursal : s)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        sucursales: [...prev.sucursales, sucursal]
      }));
    }
    setShowSucursalModal(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{benefit ? 'Editar Beneficio' : 'Añadir Nuevo Beneficio'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Razón Comercial</label>
            <input
              type="text"
              name="razonComercial"
              value={formData.razonComercial}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Razón Social</label>
            <input
              type="text"
              name="razonSocial"
              value={formData.razonSocial}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">RUC</label>
              <input
                type="text"
                name="ruc"
                value={formData.ruc}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="w-20">
              <label className="block text-sm font-medium text-gray-700">DV</label>
              <input
                type="text"
                name="dv"
                value={formData.dv}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Correo</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Contacto</label>
            <input
              type="text"
              name="contacto"
              value={formData.contacto}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Dirección</label>
            <textarea
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Dirección 2</label>
            <textarea
              name="direccion2"
              value={formData.direccion2}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Estado</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="Bloqueado">Bloqueado</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Sucursales</label>
            <ul className="mt-1 border rounded-md divide-y">
              {formData.sucursales.map((sucursal, index) => (
                <li key={index} className="p-2 flex justify-between items-center">
                  <span>{sucursal.nombre}</span>
                  <button
                    type="button"
                    onClick={() => handleEditSucursal(sucursal)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Editar
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={handleAddSucursal}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Agregar Sucursal
            </button>
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
              {benefit ? 'Actualizar' : 'Añadir'} Beneficio
            </button>
          </div>
        </form>
      </div>
      {showSucursalModal && (
        <SucursalModal
          sucursal={editingSucursal}
          onClose={() => setShowSucursalModal(false)}
          onSubmit={handleSubmitSucursal}
        />
      )}
    </div>
  );
};

interface SucursalModalProps {
  sucursal: Sucursal | null;
  onClose: () => void;
  onSubmit: (sucursal: Sucursal) => void;
}

const SucursalModal: React.FC<SucursalModalProps> = ({ sucursal, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<Sucursal>(
    sucursal || { nombre: '', direccion: '', mcc: [] }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMccChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mccList = e.target.value.split(',').map(mcc => mcc.trim());
    setFormData(prev => ({ ...prev, mcc: mccList }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{sucursal ? 'Editar Sucursal' : 'Añadir Nueva Sucursal'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nombre de la Sucursal</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Dirección</label>
            <textarea
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">MCC (separados por coma)</label>
            <input
              type="text"
              name="mcc"
              value={formData.mcc.join(', ')}
              onChange={handleMccChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
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
              {sucursal ? 'Actualizar' : 'Añadir'} Sucursal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminBenefits;