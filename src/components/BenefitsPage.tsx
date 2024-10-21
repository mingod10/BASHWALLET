import React, { useState } from 'react';
import { Search, Filter, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

interface Benefit {
  id: string;
  name: string;
  logo: string;
  category: string;
  users: number;
  isActive: boolean;
}

const benefits: Benefit[] = [
  { id: '1', name: 'Tigo', logo: 'https://via.placeholder.com/150?text=Tigo', category: 'Telefono Celular', users: 321, isActive: true },
  { id: '2', name: 'Delta', logo: 'https://via.placeholder.com/150?text=Delta', category: 'Gasolina', users: 321, isActive: true },
  { id: '3', name: 'Super 99', logo: 'https://via.placeholder.com/150?text=Super99', category: 'Vale de alimentos', users: 321, isActive: true },
  { id: '4', name: '+Movil', logo: 'https://via.placeholder.com/150?text=+Movil', category: 'Telefono Celular', users: 321, isActive: true },
  { id: '5', name: 'FarmaValue', logo: 'https://via.placeholder.com/150?text=FarmaValue', category: 'Seguro de Salud', users: 321, isActive: true },
  { id: '6', name: 'Felipe Motta', logo: 'https://via.placeholder.com/150?text=FelipeMotta', category: 'Vale de alimentos', users: 321, isActive: true },
  { id: '7', name: 'Riba Smith', logo: 'https://via.placeholder.com/150?text=RibaSmith', category: 'Vale de alimentos', users: 321, isActive: true },
  { id: '8', name: 'Arrocha', logo: 'https://via.placeholder.com/150?text=Arrocha', category: 'Seguro de Salud', users: 321, isActive: true },
];

const categories = [
  'Todo',
  'Vale de alimentos',
  'Seguro de Salud',
  'Seguro de vida',
  'Fondo de Cesantia',
  'Telefono Celular',
  'Luz Electrica',
  'Internet',
  'Gasolina'
];

const BenefitsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todo');
  const [searchTerm, setSearchTerm] = useState('');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const filteredBenefits = benefits.filter(benefit => 
    (selectedCategory === 'Todo' || benefit.category === selectedCategory) &&
    benefit.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleScroll = (direction: 'left' | 'right') => {
    const filterContainer = document.getElementById('filter-container');
    if (filterContainer) {
      const scrollAmount = filterContainer.clientWidth / 2;
      filterContainer.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Beneficios</h1>
        <p className="text-gray-500">Creación y manejo de beneficios</p>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center">
            <Plus size={20} className="mr-2" />
            Agregar Beneficio
          </button>
        </div>
      </div>

      <div className="relative mb-6">
        <div className="flex items-center">
          <Filter size={20} className="text-gray-400 mr-2" />
          <span className="text-gray-600 mr-4">Filtrar:</span>
          {showLeftArrow && (
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <div
            id="filter-container"
            className="flex space-x-2 overflow-x-auto scrollbar-hide"
            style={{ scrollBehavior: 'smooth' }}
            onScroll={(e) => {
              const target = e.target as HTMLDivElement;
              setShowLeftArrow(target.scrollLeft > 0);
              setShowRightArrow(
                target.scrollLeft < target.scrollWidth - target.clientWidth
              );
            }}
          >
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          {showRightArrow && (
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBenefits.map((benefit) => (
          <div key={benefit.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={benefit.logo} alt={benefit.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{benefit.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{benefit.category}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{benefit.users} usuarios</span>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" checked={benefit.isActive} readOnly />
                    <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                    <div className={`absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition ${benefit.isActive ? 'transform translate-x-full bg-indigo-600' : ''}`}></div>
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    {benefit.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsPage;