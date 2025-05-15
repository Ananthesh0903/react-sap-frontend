import { Inquiry, SalesOrder, Delivery } from '../types';

// Mock function to simulate RFC WebService call to SAP ERP
export const getCustomerInquiries = async (customerId: string): Promise<Inquiry[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (customerId === 'CUST001') {
    return [
      {
        id: 'INQ001',
        customerId: 'CUST001',
        date: '2025-01-15',
        status: 'open',
        items: [
          {
            id: 'INQI001',
            materialId: 'MAT001',
            materialName: 'High-Tensile Steel',
            quantity: 500,
            unit: 'kg',
            requestedDeliveryDate: '2025-02-15'
          },
          {
            id: 'INQI002',
            materialId: 'MAT002',
            materialName: 'Aluminum Alloy',
            quantity: 200,
            unit: 'kg',
            requestedDeliveryDate: '2025-02-20'
          }
        ]
      },
      {
        id: 'INQ002',
        customerId: 'CUST001',
        date: '2025-01-20',
        status: 'processed',
        items: [
          {
            id: 'INQI003',
            materialId: 'MAT003',
            materialName: 'Carbon Fiber',
            quantity: 100,
            unit: 'kg',
            requestedDeliveryDate: '2025-03-01'
          }
        ]
      }
    ];
  }
  
  return [];
};

export const getCustomerSalesOrders = async (customerId: string): Promise<SalesOrder[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (customerId === 'CUST001') {
    return [
      {
        id: 'SO001',
        customerId: 'CUST001',
        date: '2025-01-16',
        status: 'in process',
        totalValue: 25000,
        items: [
          {
            id: 'SOI001',
            materialId: 'MAT001',
            materialName: 'High-Tensile Steel',
            quantity: 500,
            unit: 'kg',
            price: 40,
            value: 20000,
            deliveryDate: '2025-02-15'
          },
          {
            id: 'SOI002',
            materialId: 'MAT002',
            materialName: 'Aluminum Alloy',
            quantity: 100,
            unit: 'kg',
            price: 50,
            value: 5000,
            deliveryDate: '2025-02-20'
          }
        ]
      },
      {
        id: 'SO002',
        customerId: 'CUST001',
        date: '2025-01-25',
        status: 'open',
        totalValue: 15000,
        items: [
          {
            id: 'SOI003',
            materialId: 'MAT003',
            materialName: 'Carbon Fiber',
            quantity: 50,
            unit: 'kg',
            price: 300,
            value: 15000,
            deliveryDate: '2025-03-05'
          }
        ]
      }
    ];
  }
  
  return [];
};

export const getCustomerDeliveries = async (customerId: string): Promise<Delivery[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  if (customerId === 'CUST001') {
    return [
      {
        id: 'DEL001',
        salesOrderId: 'SO001',
        customerId: 'CUST001',
        date: '2025-02-10',
        status: 'planned',
        items: [
          {
            id: 'DELI001',
            materialId: 'MAT001',
            materialName: 'High-Tensile Steel',
            quantity: 500,
            unit: 'kg'
          }
        ]
      },
      {
        id: 'DEL002',
        salesOrderId: 'SO001',
        customerId: 'CUST001',
        date: '2025-02-18',
        status: 'planned',
        items: [
          {
            id: 'DELI002',
            materialId: 'MAT002',
            materialName: 'Aluminum Alloy',
            quantity: 100,
            unit: 'kg'
          }
        ]
      }
    ];
  }
  
  return [];
};