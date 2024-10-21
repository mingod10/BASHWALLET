import React from 'react';

const BenefitsUsageChart: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Uso de beneficios</h3>
      <div className="relative w-48 h-48 mx-auto">
        {/* Placeholder for actual pie chart */}
        <svg viewBox="0 0 36 36" className="w-full h-full">
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#4338ca" strokeWidth="2" strokeDasharray="75, 100" />
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="20, 100" strokeDashoffset="-75" />
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#34d399" strokeWidth="2" strokeDasharray="5, 100" strokeDashoffset="-95" />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-3xl font-bold">$ 1084</p>
          <p className="text-sm text-gray-500">29/julio/2024</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-indigo-600 rounded-full mr-2"></div>
          <span>+Movil</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
          <span>Tigo</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
          <span>Felipe Motta</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
          <span>Delta</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
          <span>Super99</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-purple-400 rounded-full mr-2"></div>
          <span>FarmaValue</span>
        </div>
      </div>
    </div>
  );
};

export default BenefitsUsageChart;