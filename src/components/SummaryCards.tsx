import React from 'react';

interface SummaryCardsProps {
  activeEmployeesCount: number;
  totalBalance: number;
  totalUsageCount: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ activeEmployeesCount, totalBalance, totalUsageCount }) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="bg-indigo-800 text-white p-4 rounded-lg">
        <h3 className="text-sm font-semibold mb-1">Saldo total disponible</h3>
        <p className="text-xs mb-2">Balance de julio</p>
        <p className="text-2xl font-bold">$ {totalBalance.toFixed(2)}</p>
        <p className="text-xs text-green-400">+0.7% desde mes anterior</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-semibold mb-1">Total de fondos distribuidos</h3>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-indigo-600">$ 18,916</p>
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-indigo-500"></div>
          </div>
        </div>
        <p className="text-xs text-gray-500">$ 30,000</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-semibold mb-1">Tarjetas en uso</h3>
        <p className="text-xs text-gray-500 mb-2">Mes de julio</p>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-5 bg-indigo-500 rounded"></div>
            <p className="text-sm">Activas {activeEmployeesCount}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-5 bg-gray-300 rounded"></div>
            <p className="text-sm">Inactivas {0}</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-semibold mb-1">Beneficios</h3>
        <p className="text-xs text-gray-500 mb-2">Usos totales</p>
        <p className="text-2xl font-bold text-indigo-600">{totalUsageCount}</p>
        <div className="flex space-x-2 mt-2">
          <div className="w-8 h-8 bg-red-500 rounded-full"></div>
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
          <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;