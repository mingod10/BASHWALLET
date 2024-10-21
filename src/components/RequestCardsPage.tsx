import React, { useEffect, useState } from 'react';
import { fetchCardRequests, createCardRequest, updateCardRequestStatus } from '../api/api';
import { Download, Mail, Smartphone, Edit, Plus, Search } from 'lucide-react';
import NewCardModal from './NewCardModal';

interface CardRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeUniqueId: string;
  status: 'En Proceso' | 'Activa' | 'Bloqueada' | 'Anulada';
  cardNumber: string | null;
  totalBalance: number;
  usageCount: number;
  activationDate: string | null;
}

const RequestCardsPage: React.FC = () => {
  const [cardRequests, setCardRequests] = useState<CardRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<CardRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const getCardRequests = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCardRequests();
      setCardRequests(data);
      setFilteredRequests(data);
    } catch (error) {
      console.error('Error fetching card requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCardRequests();
  }, []);

  useEffect(() => {
    const filtered = cardRequests.filter(request => {
      const matchesFilter = 
        activeFilter === 'Todos' || 
        (activeFilter === 'Por Activar' && request.status === 'En Proceso') ||
        (activeFilter === 'Activas' && request.status === 'Activa') ||
        (activeFilter === 'Bloqueadas' && request.status === 'Bloqueada') ||
        (activeFilter === 'Anuladas' && request.status === 'Anulada');
      
      const matchesSearch = 
        request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.employeeUniqueId.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    });
    setFilteredRequests(filtered);
  }, [activeFilter, searchTerm, cardRequests]);

  const handleNewCard = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitNewCard = async (selectedEmployees: number[]) => {
    try {
      for (const employeeId of selectedEmployees) {
        await createCardRequest(employeeId);
      }
      await getCardRequests();
    } catch (error) {
      console.error('Error creating new card requests:', error);
    }
    setIsModalOpen(false);
  };

  const getStatusCount = (status: string) => {
    return cardRequests.filter(request => 
      status === 'Todos' ? true : 
      status === 'Por Activar' ? request.status === 'En Proceso' :
      status === 'Activas' ? request.status === 'Activa' :
      status === 'Bloqueadas' ? request.status === 'Bloqueada' :
      status === 'Anuladas' ? request.status === 'Anulada' : false
    ).length;
  };

  if (isLoading) {
    return <div className="p-6">Cargando...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Solicitar Tarjetas</h1>
        <button
          onClick={handleNewCard}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nueva Tarjeta
        </button>
      </div>

      <div className="mb-6">
        <div className="flex space-x-4 mb-4">
          {['Todos', 'Por Activar', 'Activas', 'Bloqueadas', 'Anuladas'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full ${
                activeFilter === filter
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {filter} ({getStatusCount(filter)})
            </button>
          ))}
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-md pl-10"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Usuario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Número de tarjeta</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Saldo Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Cantidad de usos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Fecha de activación</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={`https://i.pravatar.cc/40?u=${request.employeeId}`} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{request.employeeName}</div>
                        <div className="text-sm text-gray-500">{request.employeeUniqueId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      request.status === 'Activa' ? 'bg-green-100 text-green-800' :
                      request.status === 'En Proceso' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'Bloqueada' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.cardNumber ? `**** **** ${request.cardNumber.slice(-4)}` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${request.totalBalance.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.usageCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.activationDate || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                      <Download className="w-5 h-5" />
                    </button>
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                      <Mail className="w-5 h-5" />
                    </button>
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <Smartphone className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <NewCardModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitNewCard}
      />
    </div>
  );
};

export default RequestCardsPage;