import React, { useEffect, useState } from 'react';
import { fetchEmployees, createEmployee, updateEmployeeStatus } from '../api/api';
import { Download, Plus, Mail, Smartphone, Edit } from 'lucide-react';
import AddEmployeeModal from './AddEmployeeModal';

interface Employee {
  id: number;
  uniqueId: string;
  name: string;
  idNumber: string;
  status: string;
  cardNumber: string;
  totalBalance: number;
  usageCount: number;
  activationDate: string;
  email: string;
  cellPhone: string;
  service: string;
}

const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const getEmployees = async () => {
    setIsLoading(true);
    try {
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleAddEmployee = async (newEmployee: Partial<Employee>) => {
    try {
      await createEmployee(newEmployee);
      await getEmployees(); // Refresh the employee list
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleUpdateEmployee = async (updatedEmployee: Employee) => {
    try {
      // Here you would typically call an API to update the employee
      // For now, we'll just update the local state
      const updatedEmployees = employees.map(emp => 
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      );
      setEmployees(updatedEmployees);
      setIsModalOpen(false);
      setEditingEmployee(null);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleToggleStatus = async (employeeId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    try {
      await updateEmployeeStatus(employeeId, newStatus);
      await getEmployees(); // Refresh the employee list
    } catch (error) {
      console.error('Error updating employee status:', error);
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Empleados</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Agregar Empleado
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Identificación</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Servicio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Celular</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={`https://i.pravatar.cc/40?u=${employee.id}`} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.uniqueId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.idNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleStatus(employee.id, employee.status)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        employee.status === 'Active'
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {employee.status === 'Active' ? 'Activo' : 'Inactivo'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.cellPhone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                      <Download className="w-5 h-5" />
                    </button>
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                      <Mail className="w-5 h-5" />
                    </button>
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                      <Smartphone className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleEditEmployee(employee)} className="text-indigo-600 hover:text-indigo-900">
                      <Edit className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddEmployeeModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingEmployee(null);
        }} 
        onSubmit={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
        initialData={editingEmployee}
      />
    </div>
  );
};

export default EmployeesPage;