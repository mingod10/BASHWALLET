import React from 'react';
import { Users, CreditCard, Gift, Building, Download, ArrowUpRight, Search } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <p className="text-gray-500">Bienvenido, Administrador</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-semibold">A</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard icon={Building} title="Total de Cuentas" value="150" change="+5%" />
        <DashboardCard icon={Users} title="Total de Empleados" value="1,234" change="+12%" />
        <DashboardCard icon={CreditCard} title="Tarjetas Activas" value="987" change="+3%" />
        <DashboardCard icon={Gift} title="Beneficios Activos" value="25" change="+2%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Resumen general</h2>
          {/* Aquí iría el componente de gráfico de barras */}
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            Gráfico de Barras
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Uso de tarjetas</h2>
          {/* Aquí iría el componente de gráfico de líneas */}
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            Gráfico de Líneas
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Clientes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Empresa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Total de tarjetas activas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Saldo total disponible</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Beneficios activos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Fecha de activación</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">BAC</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Activo
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">345</td>
                <td className="px-6 py-4 whitespace-nowrap">$200.54</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex -space-x-1 overflow-hidden">
                    <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-indigo-500"></div>
                    <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-green-500"></div>
                    <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-yellow-500"></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">22/09/2020</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="text-indigo-600 hover:text-indigo-900">
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </td>
              </tr>
              {/* Puedes agregar más filas aquí */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface DashboardCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  change: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon: Icon, title, value, change }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center">
        <Icon className="w-8 h-8 text-indigo-600 mr-4" />
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold">{value}</p>
          <p className="text-sm text-green-500">{change} desde el mes anterior</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;