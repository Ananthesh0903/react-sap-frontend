import { Invoice, Payment, CreditDebitMemo, AgingReport } from '../types';

// Mock functions to simulate RFC WebService calls to SAP ERP
export const getCustomerInvoices = async (customerId: string): Promise<Invoice[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 900));
  
  if (customerId === 'CUST001') {
    return [
      {
        id: 'INV001',
        customerId: 'CUST001',
        salesOrderId: 'SO001',
        date: '2025-02-16',
        dueDate: '2025-03-18',
        status: 'open',
        amount: 20000,
        items: [
          {
            id: 'INVI001',
            materialId: 'MAT001',
            materialName: 'High-Tensile Steel',
            quantity: 500,
            unit: 'kg',
            price: 40,
            value: 20000
          }
        ]
      },
      {
        id: 'INV002',
        customerId: 'CUST001',
        salesOrderId: 'SO001',
        date: '2025-02-20',
        dueDate: '2025-03-22',
        status: 'open',
        amount: 5000,
        items: [
          {
            id: 'INVI002',
            materialId: 'MAT002',
            materialName: 'Aluminum Alloy',
            quantity: 100,
            unit: 'kg',
            price: 50,
            value: 5000
          }
        ]
      }
    ];
  }
  
  return [];
};

export const getCustomerPayments = async (customerId: string): Promise<Payment[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  if (customerId === 'CUST001') {
    return [
      {
        id: 'PAY001',
        customerId: 'CUST001',
        invoiceId: 'INV001',
        date: '2025-03-10',
        amount: 10000, // Partial payment
        method: 'bank transfer',
        reference: 'TRF12345'
      }
    ];
  }
  
  return [];
};

export const getCustomerMemos = async (customerId: string): Promise<CreditDebitMemo[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (customerId === 'CUST001') {
    return [
      {
        id: 'MEMO001',
        customerId: 'CUST001',
        invoiceId: 'INV001',
        date: '2025-03-05',
        type: 'credit',
        amount: 1000,
        reason: 'Damaged goods'
      }
    ];
  }
  
  return [];
};

export const getCustomerAgingReport = async (customerId: string): Promise<AgingReport[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (customerId === 'CUST001') {
    return [
      {
        invoiceId: 'INV001',
        customerId: 'CUST001',
        amount: 10000, // Remaining after partial payment
        dueDate: '2025-03-18',
        billingDate: '2025-02-16',
        aging: 15, // 15 days from billing to current date (assuming current date is 2025-03-03)
        ageCategory: '0-30'
      },
      {
        invoiceId: 'INV002',
        customerId: 'CUST001',
        amount: 5000,
        dueDate: '2025-03-22',
        billingDate: '2025-02-20',
        aging: 11, // 11 days from billing to current date (assuming current date is 2025-03-03)
        ageCategory: '0-30'
      }
    ];
  }
  
  return [];
};