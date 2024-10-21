import React, { useState } from 'react';
import { Edit, Trash2, Plus, Search, CreditCard } from 'lucide-react';

interface Card {
  id: string;
  employeeName: string;
  cardNumber: string;
  expirationDate: string;
  status: 'Activa' | 'Inactiva' | 'Bloqueada';
  balance: number;
}

const initialCards: Card[] = [
  { id: '1', employeeName: 'Juan Pérez', cardNumber: '**** **** **** 1234', expirationDate: '12/25', status: 'Activa', balance: 500 },
  { id: '2', employeeName: 'María García', cardNumber: '**** **** **** 5678', expirationDate: '06/24', status: 'Activa', balance: 750 },
  { id: '3', employeeName: 'Carlos Rodríguez', cardNumber: '**** **** **** 9012', expirationDate: '03/23', status: 'Bloqueada', balance: 0 },
];

const AdminCards: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddCard = () => {
    setEditingCard(null);
    setIsModalOpen(true);
  };

  const handleEditCard = (card: Card) => {
    setEditingCard(card);
    setIsModalOpen(true);
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const handleSubmitCard = (card: Card) => {
    if (editingCard) {
      setCards(cards.map(c => c.id === card.id ? card : c));
    } else {
      setCards([...cards, { ...card, id: String(cards.length + 1) }]);
    }
    setIsModalOpen(false);
  };

  const filteredCards = cards.filter(card =>
    card.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.cardNumber.includes(searchTerm) ||
    card.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestionar Tarjetas</h1>
        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Buscar tarjetas..."
              className="pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <button
            onClick={handleAddCard}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Añadir Tarjeta
          </button>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre del Empleado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número de Tarjeta</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Expiración</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Saldo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCards.map((card) => (
              <tr key={card.id}>
                <td className="px-6 py-4 whitespace-nowrap">{card.employeeName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{card.cardNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{card.expirationDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    card.status === 'Activa' ? 'bg-green-100 text-green-800' :
                    card.status === 'Inactiva' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {card.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">${card.balance.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditCard(card)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCard(card.id)}
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
        <CardModal
          card={editingCard}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitCard}
        />
      )}
    </div>
  );
};

interface CardModalProps {
  card: Card | null;
  onClose: () => void;
  onSubmit: (card: Card) => void;
}

const CardModal: React.FC<CardModalProps> = ({ card, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<Card>(
    card || { id: '', employeeName: '', cardNumber: '', expirationDate: '', status: 'Activa', balance: 0 }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{card ? 'Editar Tarjeta' : 'Añadir Nueva Tarjeta'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nombre del Empleado</label>
            <input
              type="text"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Número de Tarjeta</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Fecha de Expiración</label>
            <input
              type="text"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              placeholder="MM/AA"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
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
              <option value="Activa">Activa</option>
              <option value="Inactiva">Inactiva</option>
              <option value="Bloqueada">Bloqueada</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Saldo</label>
            <input
              type="number"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
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
              {card ? 'Actualizar' : 'Añadir'} Tarjeta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCards;