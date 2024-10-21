import React from 'react';
import { BarChart2, Download, Search } from 'lucide-react';

const DistributionChart: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">Fondos distribuidos por mes</h3>
          <p className="text-sm text-gray-500">Uso en negocios con beneficios</p>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <BarChart2 className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <Download className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="h-64 flex items-end space-x-2">
        {/* Placeholder for actual chart */}
        <div className="w-1/12 h-1/4 bg-indigo-500 rounded-t"></div>
        <div className="w-1/12 h-1/2 bg-indigo-500 rounded-t"></div>
        <div className="w-1/12 h-3/4 bg-indigo-500 rounded-t"></div>
        <div className="w-1/12 h-full bg-indigo-500 rounded-t"></div>
        <div className="w-1/12 h-3/4 bg-indigo-500 rounded-t"></div>
        <div className="w-1/12 h-1/2 bg-indigo-500 rounded-t"></div>
        <div className="w-1/12 h-1/4 bg-indigo-500 rounded-t"></div>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        <div className="flex justify-between items-center">
          <span>2024</span>
          <div className="flex flex-wrap justify-end">
            <span className="flex items-center mr-4 mb-2"><div className="w-3 h-3 bg-indigo-500 rounded-full mr-1"></div> +Movil</span>
            <span className="flex items-center mr-4 mb-2"><div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div> Tigo</span>
            <span className="flex items-center mb-2"><div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div> Felipe Motta</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributionChart;