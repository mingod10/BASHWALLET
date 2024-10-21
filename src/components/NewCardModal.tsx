import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { fetchEmployeesWithoutCards } from '../api/api';

interface Employee {
  id: number;
  name: string;
  uniqueId: string;
}

interface NewCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (selectedEmployees: number[]) => void;
}

const NewCardModal: React.FC<NewCardModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [eligibleEmployees, setEligibleEmployees] = useState<Employee[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEligibleEmployees = async () => {
      setIsLoading(true);
      try {
        const employees = await fetchEmployeesWithoutCards();
        setEligibleEmployees(employees);
      } catch (error) {
        console.error('Error fetching eligible employees:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchEligibleEmployees();
    }
  }, [isOpen]);

  const handleToggleEmployee = (employeeId: number) => {
    setSelectedEmployees(prev =>
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedEmployees);
    setSelectedEmployees([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Solicitar Nueva Tarjeta</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        {isLoading ? (
          <p>Cargando empleados elegibles...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Seleccionar Empleados</h3>
              {eligibleEmployees.length === 0 ? (
                <p className="text-gray-500">No hay empleados elegibles para nuevas tarjetas.</p>
              ) : (
                <div className="space-y-2">
                  {eligibleEmployees.map(employee => (
                    <label key={employee.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(employee.id)}
                        onChange={() => handleToggleEmployee(employee.id)}
                        className="form-checkbox h-5 w-5 text-indigo-600"
                      />
                      <span>{employee.name} ({employee.uniqueId})</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={selectedEmployees.length === 0}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Solicitar Tarjetas
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewCardModal;