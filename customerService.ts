import { Customer } from '../types';

// Mock function to simulate RFC WebService call to SAP ERP
// In a real implementation, this would make an API call to the SAP backend
export const getCustomerProfile = async (customerId: string): Promise<Customer> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In production, this would call the SAP ERP system via RFC WebService
  if (customerId === 'CUST001') {
    return {
      id: 'CUST001',
      name: 'Acme Corporation',
      address: '123 Business Ave, Corporate Park, NY 10001',
      email: 'contact@acmecorp.com',
      phone: '+1 (555) 123-4567',
      creditLimit: 100000,
      customerClass: 'A',
      salesRepresentative: 'John Smith',
      region: 'North America',
      accountStatus: 'active'
    };
  }
  
  throw new Error('Customer not found');
};