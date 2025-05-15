import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  getCustomerInvoices, 
  getCustomerPayments, 
  getCustomerMemos, 
  getCustomerAgingReport 
} from '../services/financialService';
import { Invoice, Payment, CreditDebitMemo, AgingReport } from '../types';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import StatusBadge from '../components/ui/StatusBadge';
import { FileText, CreditCard, AlertTriangle, Receipt, Calendar } from 'lucide-react';

const FinancialPage: React.FC = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [memos, setMemos] = useState<CreditDebitMemo[]>([]);
  const [agingReport, setAgingReport] = useState<AgingReport[]>([]);
  const [isLoading, setIsLoading] = useState({
    invoices: true,
    payments: true,
    memos: true,
    aging: true
  });
  
  const [activeTab, setActiveTab] = useState('invoices');
  
  useEffect(() => {
    const fetchData = async () => {
      if (user?.customerId) {
        try {
          // Fetch all financial data in parallel
          const [invoicesData, paymentsData, memosData, agingData] = await Promise.all([
            getCustomerInvoices(user.customerId),
            getCustomerPayments(user.customerId),
            getCustomerMemos(user.customerId),
            getCustomerAgingReport(user.customerId)
          ]);
          
          setInvoices(invoicesData);
          setPayments(paymentsData);
          setMemos(memosData);
          setAgingReport(agingData);
        } catch (error) {
          console.error('Error fetching financial data:', error);
        } finally {
          setIsLoading({
            invoices: false,
            payments: false,
            memos: false,
            aging: false
          });
        }
      }
    };
    
    fetchData();
  }, [user?.customerId]);
  
  // Calculate summary values
  const totalInvoiceAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalPayments = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalCredits = memos
    .filter(memo => memo.type === 'credit')
    .reduce((sum, memo) => sum + memo.amount, 0);
  const totalDebits = memos
    .filter(memo => memo.type === 'debit')
    .reduce((sum, memo) => sum + memo.amount, 0);
  
  const balanceDue = totalInvoiceAmount - totalPayments - totalCredits + totalDebits;
  
  // Group aging report by category
  const agingByCategory = agingReport.reduce((acc, item) => {
    if (!acc[item.ageCategory]) {
      acc[item.ageCategory] = 0;
    }
    acc[item.ageCategory] += item.amount;
    return acc;
  }, {} as Record<string, number>);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Financial Overview</h1>
        <p className="mt-1 text-sm text-slate-500">View your account balance, invoices, and payment history</p>
      </div>
      
      {/* Financial summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Invoiced</p>
            <p className="text-xl font-semibold text-slate-900">${totalInvoiceAmount.toLocaleString()}</p>
          </div>
        </Card>
        
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
            <CreditCard size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Payments</p>
            <p className="text-xl font-semibold text-slate-900">${totalPayments.toLocaleString()}</p>
          </div>
        </Card>
        
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
            <Receipt size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Credits/Debits</p>
            <p className="text-xl font-semibold text-slate-900">${(totalCredits - totalDebits).toLocaleString()}</p>
          </div>
        </Card>
        
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Balance Due</p>
            <p className="text-xl font-semibold text-slate-900">${balanceDue.toLocaleString()}</p>
          </div>
        </Card>
      </div>
      
      {/* Aging summary */}
      <Card title="Account Aging" subtitle="Outstanding balance by age category">
        <div className="grid grid-cols-4 gap-4">
          {['0-30', '31-60', '61-90', '91+'].map((category) => {
            const amount = agingByCategory[category] || 0;
            const bgColor = 
              category === '0-30' ? 'bg-green-100' : 
              category === '31-60' ? 'bg-blue-100' : 
              category === '61-90' ? 'bg-amber-100' : 
              'bg-red-100';
            const textColor = 
              category === '0-30' ? 'text-green-800' : 
              category === '31-60' ? 'text-blue-800' : 
              category === '61-90' ? 'text-amber-800' : 
              'text-red-800';
            
            return (
              <div key={category} className={`p-4 rounded-lg ${bgColor}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${textColor}`}>{category} days</span>
                  <Calendar size={16} className={textColor} />
                </div>
                <p className={`mt-2 text-lg font-semibold ${textColor}`}>${amount.toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      </Card>
      
      {/* Financial data tabs */}
      <div>
        <div className="border-b border-slate-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'invoices', label: 'Invoices' },
              { id: 'payments', label: 'Payments' },
              { id: 'memos', label: 'Credit/Debit Memos' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id 
                    ? 'border-teal-500 text-teal-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="mt-6">
          {activeTab === 'invoices' && (
            <Card title="Invoices" subtitle="List of all invoices">
              <Table
                columns={[
                  { key: 'id', header: 'Invoice ID', width: 'w-1/6' },
                  { key: 'date', header: 'Date', width: 'w-1/6' },
                  { key: 'dueDate', header: 'Due Date', width: 'w-1/6' },
                  { 
                    key: 'amount', 
                    header: 'Amount',
                    width: 'w-1/6',
                    render: (row: Invoice) => (
                      <span>${row.amount.toLocaleString()}</span>
                    )
                  },
                  { 
                    key: 'status', 
                    header: 'Status',
                    width: 'w-1/6',
                    render: (row: Invoice) => (
                      <StatusBadge status={row.status} />
                    )
                  },
                  {
                    key: 'actions',
                    header: 'Actions',
                    width: 'w-1/6',
                    render: () => (
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">View</button>
                        <button className="text-teal-600 hover:text-teal-800">Download</button>
                      </div>
                    )
                  }
                ]}
                data={invoices}
                keyExtractor={(item) => item.id}
                isLoading={isLoading.invoices}
              />
            </Card>
          )}
          
          {activeTab === 'payments' && (
            <Card title="Payments" subtitle="List of all payments">
              <Table
                columns={[
                  { key: 'id', header: 'Payment ID', width: 'w-1/6' },
                  { key: 'date', header: 'Date', width: 'w-1/6' },
                  { 
                    key: 'invoiceId', 
                    header: 'Invoice ID',
                    width: 'w-1/6',
                    render: (row: Payment) => (
                      <a href="#" className="text-teal-600 hover:text-teal-800">
                        {row.invoiceId}
                      </a>
                    )
                  },
                  { 
                    key: 'amount', 
                    header: 'Amount',
                    width: 'w-1/6',
                    render: (row: Payment) => (
                      <span>${row.amount.toLocaleString()}</span>
                    )
                  },
                  { key: 'method', header: 'Method', width: 'w-1/6' },
                  { key: 'reference', header: 'Reference', width: 'w-1/6' }
                ]}
                data={payments}
                keyExtractor={(item) => item.id}
                isLoading={isLoading.payments}
              />
            </Card>
          )}
          
          {activeTab === 'memos' && (
            <Card title="Credit/Debit Memos" subtitle="List of all memos">
              <Table
                columns={[
                  { key: 'id', header: 'Memo ID', width: 'w-1/6' },
                  { key: 'date', header: 'Date', width: 'w-1/6' },
                  { 
                    key: 'invoiceId', 
                    header: 'Invoice ID',
                    width: 'w-1/6',
                    render: (row: CreditDebitMemo) => (
                      <a href="#" className="text-teal-600 hover:text-teal-800">
                        {row.invoiceId}
                      </a>
                    )
                  },
                  { 
                    key: 'type', 
                    header: 'Type',
                    width: 'w-1/6',
                    render: (row: CreditDebitMemo) => (
                      <span className={row.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
                        {row.type.charAt(0).toUpperCase() + row.type.slice(1)}
                      </span>
                    )
                  },
                  { 
                    key: 'amount', 
                    header: 'Amount',
                    width: 'w-1/6',
                    render: (row: CreditDebitMemo) => (
                      <span>${row.amount.toLocaleString()}</span>
                    )
                  },
                  { key: 'reason', header: 'Reason', width: 'w-1/6' }
                ]}
                data={memos}
                keyExtractor={(item) => item.id}
                isLoading={isLoading.memos}
              />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialPage;