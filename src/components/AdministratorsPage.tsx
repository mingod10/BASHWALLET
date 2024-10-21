import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Info, ArrowUp, ArrowDown } from 'lucide-react';
import AddAdminModal from './AddAdminModal';
import AccountInformationPage from './AccountInformationPage';

interface Administrator {
  id: number;
  uniqueId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phoneNumber: string;
  image: string | null;
}

const AdministratorsPage: React.FC = () => {
  const [administrators, setAdministrators] = useState<Administrator[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Administrator | null>(null);
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Administrator; direction: 'ascending' | 'descending' } | null>(null);
  const [filters, setFilters] = useState<Partial<Administrator>>({});

  useEffect(() => {
    setAdministrators([
      { id: 1, uniqueId: 'ADM001', firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Admin', phoneNumber: '+1234567890', image: null },
      { id: 2, uniqueId: 'ADM002', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', role: 'Super Admin', phoneNumber: '+0987654321', image: null },
    ]);
  }, []);

  const handleAddAdmin = (newAdmin: Omit<Administrator, 'id' | 'uniqueId'>) => {
    const adminWithId = { 
      ...newAdmin, 
      id: administrators.length + 1,
      uniqueId: `ADM${String(administrators.length + 1).padStart(3, '0')}`
    };
    setAdministrators([...administrators, adminWithId]);
    setIsModalOpen(false);
  };

  const handleEditAdmin = (admin: Administrator) => {
    setEditingAdmin(admin);
    setIsModalOpen(true);
  };

  const handleUpdateAdmin = (updatedAdmin: Administrator) => {
    setAdministrators(administrators.map(admin => 
      admin.id === updatedAdmin.id ? updatedAdmin : admin
    ));
    setIsModalOpen(false);
    setEditingAdmin(null);
  };

  const handleDeleteAdmin = (id: number) => {
    setAdministrators(administrators.filter(admin => admin.id !== id));
  };

  const handleShowAccountInfo = () => {
    setShowAccountInfo(true);
  };

  const handleSort = (key: keyof Administrator) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleFilter = (key: keyof Administrator, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredAndSortedAdministrators = React.useMemo(() => {
    let filteredAdmins = administrators.filter(admin => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return String(admin[key as keyof Administrator]).toLowerCase().includes(value.toLowerCase());
      });
    });

    if (sortConfig !== null) {
      filteredAdmins.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredAdmins;
  }, [administrators, filters, sortConfig]);

  if (showAccountInfo) {
    return <AccountInformationPage admin={null} onBack={() => setShowAccountInfo(false)} />;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Administrators</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleShowAccountInfo}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
          >
            <Info className="w-5 h-5 mr-2" />
            Account Information
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Administrator
          </button>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['ID', 'Name', 'Email', 'Role', 'Phone', 'Actions'].map((header, index) => (
                  <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <span className="mr-2">{header}</span>
                        <button onClick={() => handleSort(header.toLowerCase() as keyof Administrator)}>
                          {sortConfig?.key === header.toLowerCase() ? (
                            sortConfig.direction === 'ascending' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                          ) : (
                            <ArrowUp className="w-4 h-4 text-gray-300" />
                          )}
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder={`Filter ${header}`}
                        className="mt-1 text-sm border rounded px-2 py-1"
                        onChange={(e) => handleFilter(header.toLowerCase() as keyof Administrator, e.target.value)}
                      />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedAdministrators.map((admin) => (
                <tr key={admin.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{admin.uniqueId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {admin.image ? (
                          <img className="h-10 w-10 rounded-full" src={admin.image} alt="" />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-800 font-medium">{admin.firstName[0]}{admin.lastName[0]}</span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{admin.firstName} {admin.lastName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.phoneNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditAdmin(admin)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteAdmin(admin.id)}
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
      </div>
      <AddAdminModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAdmin(null);
        }}
        onSubmit={editingAdmin ? handleUpdateAdmin : handleAddAdmin}
        initialData={editingAdmin}
      />
    </div>
  );
};

export default AdministratorsPage;