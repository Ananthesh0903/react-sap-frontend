import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, User, FileText, CreditCard, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  const navItems = [
    { to: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/profile", icon: <User size={20} />, label: "Profile" },
    { to: "/financial", icon: <CreditCard size={20} />, label: "Financial" },
    { to: "/documents", icon: <FileText size={20} />, label: "Documents" },
  ];
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-slate-900 text-slate-100 shadow-lg transition-transform duration-300 ease-in-out transform lg:translate-x-0 lg:static lg:z-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 lg:hidden">
          <div className="text-xl font-bold text-teal-500">Customer Portal</div>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-800" aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        
        <div className="mt-4 lg:mt-8 px-4">
          <div className="mb-8 p-4 bg-slate-800 rounded-lg">
            <div className="text-sm text-slate-400">Logged in as</div>
            <div className="text-md font-medium text-white">{user.name}</div>
            <div className="text-xs text-slate-400 mt-1">ID: {user.customerId}</div>
          </div>
          
          <nav>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-teal-600 text-white'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`
                    }
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        onClose();
                      }
                    }}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="text-xs text-slate-500 text-center">
            <p>© 2025 SAP Customer Portal</p>
            <p className="mt-1">v1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;