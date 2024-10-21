import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Home, Users, LogOut, ChevronRight, ChevronLeft, CreditCard as CardIcon, UserCog, ChevronDown, Gift, Settings, Building } from 'lucide-react';

interface SidebarItemProps {
  Icon: React.ElementType;
  label: string;
  to: string;
  isOpen: boolean;
  subItems?: { label: string; to: string }[];
}

const SidebarItem: React.FC<SidebarItemProps> = ({ Icon, label, to, isOpen, subItems }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const handleClick = () => {
    if (subItems) {
      setIsSubMenuOpen(!isSubMenuOpen);
    }
  };

  return (
    <div>
      <Link
        to={to}
        className={`flex items-center w-full p-3 text-white hover:bg-indigo-700 transition-colors ${
          isOpen ? 'justify-start' : 'justify-center'
        }`}
        onClick={handleClick}
      >
        <Icon className={`w-6 h-6 ${isOpen ? 'mr-3' : ''}`} />
        {isOpen && (
          <span className="flex-grow text-left">{label}</span>
        )}
        {isOpen && subItems && (
          <ChevronDown className={`w-4 h-4 transition-transform ${isSubMenuOpen ? 'transform rotate-180' : ''}`} />
        )}
      </Link>
      {isOpen && isSubMenuOpen && subItems && (
        <div className="ml-6 mt-1 space-y-1">
          {subItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="block w-full text-left p-2 text-sm text-white hover:bg-indigo-700 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

interface SidebarProps {
  isAdminMode: boolean;
  setIsAdminMode: (isAdmin: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isAdminMode, setIsAdminMode }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleAdminMode = () => setIsAdminMode(!isAdminMode);

  const clientItems = [
    { Icon: Home, label: 'Dashboard', to: '/' },
    { Icon: Users, label: 'Empleados', to: '/employees' },
    { 
      Icon: CardIcon, 
      label: 'Tarjetas', 
      to: '/cards',
      subItems: [
        { label: "Solicitar Tarjetas", to: '/requestcards' },
        { label: "Recargar Tarjetas", to: '/reloadcards' },
      ]
    },
    { Icon: Gift, label: 'Beneficios', to: '/benefits' },
    { Icon: UserCog, label: 'Administradores', to: '/administrators' },
  ];

  const adminItems = [
    { Icon: Home, label: 'Panel de Admin', to: '/admin' },
    { Icon: Building, label: 'Cuentas', to: '/admin/accounts' },
    { Icon: UserCog, label: 'Roles', to: '/admin/roles' },
    { Icon: Users, label: 'Empleados', to: '/admin/employees' },
    { Icon: CardIcon, label: 'Tarjetas', to: '/admin/cards' },
    { Icon: Gift, label: 'Beneficios', to: '/admin/benefits' },
  ];

  const items = isAdminMode ? adminItems : clientItems;

  return (
    <aside
      className={`bg-indigo-800 text-white flex flex-col transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <CreditCard className="w-8 h-8" />
        {isOpen && <span className="font-bold">Dashboard</span>}
      </div>
      <button
        onClick={toggleSidebar}
        className="self-end p-2 m-2 rounded-full bg-indigo-700 hover:bg-indigo-600"
      >
        {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
      <nav className="flex-grow">
        {items.map((item, index) => (
          <SidebarItem key={index} {...item} isOpen={isOpen} />
        ))}
      </nav>
      <div className="mt-auto p-4">
        <button
          onClick={toggleAdminMode}
          className="flex items-center w-full p-2 text-white hover:bg-indigo-700 transition-colors"
        >
          <Settings className="w-6 h-6 mr-2" />
          {isOpen && (isAdminMode ? 'Cambiar a Cliente' : 'Cambiar a Admin')}
        </button>
        <Link
          to="/logout"
          className="flex items-center w-full p-2 text-white hover:bg-indigo-700 transition-colors mt-2"
        >
          <LogOut className="w-6 h-6 mr-2" />
          {isOpen && 'Cerrar Sesión'}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;