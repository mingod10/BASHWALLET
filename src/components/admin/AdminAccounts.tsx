import React, { useState } from 'react';
import { Edit, Trash2, Plus, ChevronDown, ChevronUp } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  position: string;
  email: string;
}

interface Account {
  id: string;
  name: string;
  type: string;
  employees: Employee[];
  activeCards: number;
  status: 'Activa' | 'Inactiva';
}

const initialAccounts: Account[] = [
  {
    id: '1',
    name: 'Corporación ABC',
    type: 'Empresa',
    employees: [
      { id: '1', name: 'Juan Pérez', position: 'Gerente', email: 'juan@abc.com' },
      { id: '2', name: 'Ana López', position: 'Analista', email: 'ana@abc.com' },
    ],
    activeCards: 450,
    status: 'Activa'
  },
  {
    id: '2',
    name: 'XYZ Inc.',
    type: 'PYME',
    employees: [
      { id: '3', name: 'Carlos Gómez', position: 'Director', email: 'carlos@xyz.com' },
    ],
    activeCards: 45,
    status: 'Activa'
  },
  {
    id: '3',
    name: 'Compañía 123',
    type: 'Startup',
    employees: [
      { id: '4', name: 'María Rodríguez', position: 'CEO', email: 'maria@123.com' },
      { id: '5', name: 'Pedro Sánchez', position: 'CTO', email: 'pedro@123.com' },
    ],
    activeCards: 18,
    status: 'Inactiva'
  },
];

const AdminAccounts: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [expandedAccountId, setExpandedAccountId] = useState<string | null>(null);

  const handleAddAccount = () => {
    setEditingAccount(null);
    setIsModalOpen(true);
  };

  const handleEditAccount = (account: Account) => {
    setEditingAccount(account);
    setIsModalOpen(true);
  };

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  const handleSubmitAccount = (account: Account) => {
    if (editingAccount) {
      setAccounts(accounts.map(a => a.id === account.id ? account : a));
    } else {
      setAccounts([...accounts, { ...account, id: String(accounts.length + 1) }]);
    }
    setIsModalOpen(false);
  };

  const toggleEmployeeList = (accountId: string) => {
    setExpandedAccountId(expandedAccountId === accountId ? null : accountId);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestionar Cuentas</h1>
        <button
          onClick={handleAddAccount}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Añadir Cuenta
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empleados</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarjetas Activas</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {accounts.map((account) => (
              <React.Fragment key={account.id}>
                <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleEmployeeList(account.id)}>
                  <td className="px-6 py-4 whitespace-nowrap">{account.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{account.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{account.employees.length}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{account.activeCards}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      account.status === 'Activa' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {account.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditAccount(account);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAccount(account.id);
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    {expandedAccountId === account.id ? <ChevronUp className="w-5 h-5 inline-block ml-2" /> : <ChevronDown className="w-5 h-5 inline-block ml-2" />}
                  </td>
                </tr>
                {expandedAccountId === account.id && (
                  <tr>
                    <td colSpan={6}>
                      <div className="px-6 py-4 bg-gray-50">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Empleados de {account.name}</h4>
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {account.employees.map((employee) => (
                              <tr key={employee.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{employee.position}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <AccountModal
          account={editingAccount}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitAccount}
        />
      )}
    </div>
  );
};

// ... (El resto del código, incluyendo AccountModal, permanece igual)

export default AdminAccounts;