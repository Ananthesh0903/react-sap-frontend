export interface Customer {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  creditLimit: number;
  customerClass: string;
  salesRepresentative: string;
  region: string;
  accountStatus: 'active' | 'inactive' | 'pending';
}

export interface Inquiry {
  id: string;
  customerId: string;
  date: string;
  status: 'open' | 'processed' | 'closed';
  items: InquiryItem[];
}

export interface InquiryItem {
  id: string;
  materialId: string;
  materialName: string;
  quantity: number;
  unit: string;
  requestedDeliveryDate: string;
}

export interface SalesOrder {
  id: string;
  customerId: string;
  date: string;
  status: 'open' | 'in process' | 'delivered' | 'closed';
  items: SalesOrderItem[];
  totalValue: number;
}

export interface SalesOrderItem {
  id: string;
  materialId: string;
  materialName: string;
  quantity: number;
  unit: string;
  price: number;
  value: number;
  deliveryDate: string;
}

export interface Delivery {
  id: string;
  salesOrderId: string;
  customerId: string;
  date: string;
  status: 'planned' | 'in transit' | 'delivered';
  items: DeliveryItem[];
}

export interface DeliveryItem {
  id: string;
  materialId: string;
  materialName: string;
  quantity: number;
  unit: string;
}

export interface Invoice {
  id: string;
  customerId: string;
  salesOrderId: string;
  date: string;
  dueDate: string;
  status: 'open' | 'paid' | 'overdue';
  amount: number;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  materialId: string;
  materialName: string;
  quantity: number;
  unit: string;
  price: number;
  value: number;
}

export interface Payment {
  id: string;
  customerId: string;
  invoiceId: string;
  date: string;
  amount: number;
  method: 'bank transfer' | 'credit card' | 'check';
  reference: string;
}

export interface CreditDebitMemo {
  id: string;
  customerId: string;
  invoiceId: string;
  date: string;
  type: 'credit' | 'debit';
  amount: number;
  reason: string;
}

export interface AgingReport {
  invoiceId: string;
  customerId: string;
  amount: number;
  dueDate: string;
  billingDate: string;
  aging: number; // days
  ageCategory: '0-30' | '31-60' | '61-90' | '91+';
}

export interface User {
  id: string;
  customerId: string;
  name: string;
  role: 'admin' | 'user';
  isAuthenticated: boolean;
}