import { User } from '../types';

// Mock function to simulate RFC WebService call to SAP ERP
// In a real implementation, this would make an API call to the SAP backend
export const loginUser = async (customerId: string, password: string): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demo purposes, we're using mock validation
  // In production, this would call the SAP ERP system via RFC WebService
  if (customerId && password) {
    if (customerId === 'CUST001' && password === 'password') {
      const user: User = {
        id: '1',
        customerId: 'CUST001',
        name: 'Acme Corporation',
        role: 'admin',
        isAuthenticated: true
      };
      
      // Store in localStorage for persistence
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      return user;
    }
  }
  
  throw new Error('Invalid customer ID or password');
};

export const logoutUser = async (): Promise<void> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Clear from localStorage
  localStorage.removeItem('currentUser');
  
  return Promise.resolve();
};

export const checkAuthStatus = async (): Promise<User | null> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Check if user is stored in localStorage
  const storedUser = localStorage.getItem('currentUser');
  
  if (storedUser) {
    return JSON.parse(storedUser) as User;
  }
  
  return null;
};