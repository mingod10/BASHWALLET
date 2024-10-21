import React, { useEffect, useState } from 'react';
import SummaryCards from './SummaryCards';
import DistributionChart from './DistributionChart';
import BenefitsUsageChart from './BenefitsUsageChart';
import RecentTransactions from './RecentTransactions';
import EmployeeTable from './EmployeeTable';
import { fetchEmployees } from '../api/api';
import { Employee } from '../types';

const Dashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    getEmployees();
  }, []);

  const activeEmployees = employees.filter(emp => emp.status === 'Active');
  const totalBalance = activeEmployees.reduce((sum, emp) => sum + emp.totalBalance, 0);
  const totalUsageCount = activeEmployees.reduce((sum, emp) => sum + emp.usageCount, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <SummaryCards 
        activeEmployeesCount={activeEmployees.length}
        totalBalance={totalBalance}
        totalUsageCount={totalUsageCount}
      />
      <div className="grid grid-cols-2 gap-6 mt-6">
        <DistributionChart />
        <div className="grid grid-rows-2 gap-6">
          <BenefitsUsageChart />
          <RecentTransactions />
        </div>
      </div>
      <EmployeeTable employees={activeEmployees.slice(0, 5)} />
    </div>
  );
};

export default Dashboard;