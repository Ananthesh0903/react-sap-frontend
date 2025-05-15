import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Menu } from 'lucide-react';
import Button from '../ui/Button';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  return (
    <header className="bg-slate-800 text-white shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 p-1 rounded-md hover:bg-slate-700 lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-teal-500 mr-2"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"></polyline>
                <line x1="12" y1="12" x2="20" y2="7.5"></line>
                <line x1="12" y1="12" x2="12" y2="21"></line>
                <line x1="12" y1="12" x2="4" y2="7.5"></line>
              </svg>
              <span className="text-xl font-bold">SAP Customer Portal</span>
            </NavLink>
          </div>
        </div>
        
        {user && (
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-1">
              <User size={16} className="text-slate-300" />
              <span className="text-sm font-medium">{user.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              leftIcon={<LogOut size={16} />}
              className="text-slate-300 hover:text-white hover:bg-slate-700"
            >
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;