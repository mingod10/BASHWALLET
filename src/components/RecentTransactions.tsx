import React from 'react';

const RecentTransactions: React.FC = () => {
  const transactions = [
    { id: 1, vendor: 'Tigo', amount: 34.00, user: 'David Lopez', time: '12:12 AM' },
    { id: 2, vendor: 'Super99', amount: 47.60, user: 'Benito Juárez', time: '08:17 AM' },
    { id: 3, vendor: '+Móvil', amount: 10.00, user: 'Ricardo Denver', time: '08:00 AM' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Transacciones recientes</h3>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <span className="text-sm font-semibold">{transaction.vendor[0]}</span>
              </div>
              <div>
                <p className="font-semibold">{transaction.vendor}</p>
                <p className="text-sm text-gray-500">{transaction.user}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">${transaction.amount.toFixed(2)}</p>
              <p className="text-sm text-gray-500">{transaction.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;