import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import EmployeesPage from './components/EmployeesPage';
import AdministratorsPage from './components/AdministratorsPage';
import RequestCardsPage from './components/RequestCardsPage';
import ReloadCardsPage from './components/ReloadCardsPage';
import BenefitsPage from './components/BenefitsPage';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminAccounts from './components/admin/AdminAccounts';
import AdminRoles from './components/admin/AdminRoles';
import AdminEmployees from './components/admin/AdminEmployees';
import AdminCards from './components/admin/AdminCards';
import AdminBenefits from './components/admin/AdminBenefits';

function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar onNavigate={() => {}} isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            {isAdminMode ? (
              // Admin Portal Routes
              <>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/accounts" element={<AdminAccounts />} />
                <Route path="/admin/roles" element={<AdminRoles />} />
                <Route path="/admin/employees" element={<AdminEmployees />} />
                <Route path="/admin/cards" element={<AdminCards />} />
                <Route path="/admin/benefits" element={<AdminBenefits />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </>
            ) : (
              // Client Portal Routes
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/employees" element={<EmployeesPage />} />
                <Route path="/administrators" element={<AdministratorsPage />} />
                <Route path="/requestcards" element={<RequestCardsPage />} />
                <Route path="/reloadcards" element={<ReloadCardsPage />} />
                <Route path="/benefits" element={<BenefitsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;