import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Search } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  status: 'Activo' | 'Inactivo';
  accountId: string;
}

interface Account {
  id: string;
  name: string;
  type: string;
  employees: any[];
  activeCards: number;
  status: 'Activa' | 'Inactiva';
}

// Simula una función para obtener las cuentas de la base de datos
const fetchAccounts = async (): Promise<Account[]> => {
  // En una aplicación real, aquí harías una llamada a tu API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'Corporación ABC',
          type: 'Empresa',
          employees: [],
          activeCards: 450,
          status: 'Activa'
        },
        {
          id: '2',
          name: 'XYZ Inc.',
          type: 'PYME',
          employees: [],
          activeCards: 45,
          status: 'Activa'
        },
        {
          id: '3',
          name: 'Compañía 123',
          type: 'Startup',
          employees: [],
          activeCards: 18,
          status: 'Inactiva'
        },
      ]);
    }, 500); // Simula un retraso de red
  });
};

const initialEmployees: Employee[] = [
  { id: '1', name: 'Juan Pérez', email: 'juan@ejemplo.com', position: 'Gerente', department: 'Ventas', status: 'Activo', accountId: '1' },
  { id: '2', name: 'María García', email: 'maria@ejemplo.com', position: 'Desarrolladora', department: 'TI', status: 'Activo', accountId: '2' },
  { id: '3', name: 'Carlos Rodríguez', email: 'carlos@ejemplo.com', position: 'Contador', department: 'Finanzas', status: 'Inactivo', accountId: '1' },
];

const AdminEmployees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadAccounts = async () => {
      const fetchedAccounts = await fetchAccounts();
      setAccounts(fetchedAccounts);
    };
    loadAccounts();
  }, []);

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const handleSubmitEmployee = (employee: Employee) => {
    if (editingEmployee) {
      setEmployees(employees.map(e => e.id === employee.id ? employee : e));
    } else {
      setEmployees([...employees, { ...employee, id: String(employees.length + 1) }]);
    }
    setIsModalOpen(false);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestionar Empleados</h1>
        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Buscar empleados..."
              className="pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <button
            onClick={handleAddEmployee}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Añadir Empleado
          </button>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departamento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empresa</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.position}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.department}</td>
                <td className="px-6 py-4 whitespace-nowrap">{accounts.find(a => a.id === employee.accountId)?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    employee.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditEmployee(employee)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteEmployee(employee.id)}
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
        <EmployeeModal
          employee={editingEmployee}
          accounts={accounts}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitEmployee}
        />
      )}
    </div>
  );
};

interface EmployeeModalProps {
  employee: Employee | null;
  accounts: Account[];
  onClose: () => void;
  onSubmit: (employee: Employee) => void;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({ employee, accounts, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<Employee>(
    employee || { id: '', name: '', email: '', position: '', department: '', status: 'Activo', accountId: '' }
  );
  const [accountSearch, setAccountSearch] = useState('');
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAccountSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountSearch(e.target.value);
    setShowAccountDropdown(true);
  };

  const handleAccountSelect = (account: Account) => {
    setFormData(prev => ({ ...prev, accountId: account.id }));
    setAccountSearch(account.name);
    setShowAccountDropdown(false);
  };

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(accountSearch.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{employee ? 'Editar Empleado' : 'Añadir Nuevo Empleado'}</h2>
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
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Cargo</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Departamento</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700">Empresa</label>
            <input
              type="text"
              value={accountSearch}
              onChange={handleAccountSearch}
              onFocus={() => setShowAccountDropdown(true)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Buscar empresa..."
              required
            />
            {showAccountDropdown && (
              <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {filteredAccounts.map((account) => (
                  <li
                    key={account.id}
                    className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                    onClick={() => handleAccountSelect(account)}
                  >
                    {account.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Estado</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
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
              {employee ? 'Actualizar' : 'Añadir'} Empleado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEmployees;