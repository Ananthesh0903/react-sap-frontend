import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { LogIn, AlertCircle } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { user, login, isLoading, error } = useAuth();
  const [customerId, setCustomerId] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  
  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (!customerId) {
      setFormError('Customer ID is required');
      return;
    }
    
    if (!password) {
      setFormError('Password is required');
      return;
    }
    
    try {
      await login(customerId, password);
    } catch (err) {
      // Error is already set in the AuthContext
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="h-12 w-12 text-teal-600"
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
              </div>
              <h2 className="mt-4 text-3xl font-bold text-slate-900">Customer Portal</h2>
              <p className="mt-2 text-sm text-slate-600">Sign in to access your customer account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {(error || formError) && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start text-sm">
                  <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                  <span>{formError || error}</span>
                </div>
              )}
              
              <div>
                <label htmlFor="customerId" className="block text-sm font-medium text-slate-700">
                  Customer ID
                </label>
                <div className="mt-1">
                  <input
                    id="customerId"
                    name="customerId"
                    type="text"
                    autoComplete="username"
                    required
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    placeholder="CUST001"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                  leftIcon={!isLoading ? <LogIn size={16} /> : undefined}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  Sign in
                </Button>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="text-center text-xs text-slate-500">
                <p>For demo purposes, use:</p>
                <p className="mt-1 font-mono">Customer ID: CUST001</p>
                <p className="font-mono">Password: password</p>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 sm:px-8">
            <div className="text-xs text-center text-slate-500">
              <p>© 2025 SAP Customer Portal System</p>
              <p className="mt-1">All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;