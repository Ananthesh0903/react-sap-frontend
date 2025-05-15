import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCustomerInquiries, getCustomerSalesOrders, getCustomerDeliveries } from '../services/salesService';
import { Inquiry, SalesOrder, Delivery } from '../types';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import StatusBadge from '../components/ui/StatusBadge';
import { BarChart3, ShoppingCart, TruckIcon, ClipboardList } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [salesOrders, setSalesOrders] = useState<SalesOrder[]>([]);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [isLoading, setIsLoading] = useState({
    inquiries: true,
    salesOrders: true,
    deliveries: true
  });
  
  useEffect(() => {
    const fetchData = async () => {
      if (user?.customerId) {
        try {
          const [inquiriesData, salesOrdersData, deliveriesData] = await Promise.all([
            getCustomerInquiries(user.customerId),
            getCustomerSalesOrders(user.customerId),
            getCustomerDeliveries(user.customerId)
          ]);
          
          setInquiries(inquiriesData);
          setSalesOrders(salesOrdersData);
          setDeliveries(deliveriesData);
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
        } finally {
          setIsLoading({
            inquiries: false,
            salesOrders: false,
            deliveries: false
          });
        }
      }
    };
    
    fetchData();
  }, [user?.customerId]);
  
  const totalInquiries = inquiries.length;
  const totalOrders = salesOrders.length;
  const totalOrdersValue = salesOrders.reduce((sum, order) => sum + order.totalValue, 0);
  const totalDeliveries = deliveries.length;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Overview of your business activities</p>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <ClipboardList size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Inquiries</p>
            <p className="text-xl font-semibold text-slate-900">{totalInquiries}</p>
          </div>
        </Card>
        
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
            <ShoppingCart size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Orders</p>
            <p className="text-xl font-semibold text-slate-900">{totalOrders}</p>
          </div>
        </Card>
        
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-teal-100 text-teal-600 mr-4">
            <BarChart3 size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Order Value</p>
            <p className="text-xl font-semibold text-slate-900">${totalOrdersValue.toLocaleString()}</p>
          </div>
        </Card>
        
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
            <TruckIcon size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Deliveries</p>
            <p className="text-xl font-semibold text-slate-900">{totalDeliveries}</p>
          </div>
        </Card>
      </div>
      
      {/* Latest Inquiries */}
      <Card title="Latest Inquiries" subtitle="Your recent product inquiries">
        <Table
          columns={[
            { key: 'id', header: 'Inquiry ID', width: 'w-1/6' },
            { key: 'date', header: 'Date', width: 'w-1/6' },
            { 
              key: 'items', 
              header: 'Items', 
              width: 'w-2/6',
              render: (row: Inquiry) => (
                <span>{row.items.length} item(s)</span>
              )
            },
            { 
              key: 'status', 
              header: 'Status',
              width: 'w-1/6',
              render: (row: Inquiry) => (
                <StatusBadge status={row.status} />
              )
            },
            {
              key: 'details',
              header: 'Details',
              width: 'w-1/6',
              render: () => (
                <a href="#" className="text-teal-600 hover:text-teal-800">
                  View
                </a>
              )
            }
          ]}
          data={inquiries}
          keyExtractor={(item) => item.id}
          isLoading={isLoading.inquiries}
        />
      </Card>
      
      {/* Latest Sales Orders */}
      <Card title="Latest Orders" subtitle="Your recent sales orders">
        <Table
          columns={[
            { key: 'id', header: 'Order ID', width: 'w-1/6' },
            { key: 'date', header: 'Date', width: 'w-1/6' },
            { 
              key: 'totalValue', 
              header: 'Value',
              width: 'w-1/6',
              render: (row: SalesOrder) => (
                <span>${row.totalValue.toLocaleString()}</span>
              )
            },
            { 
              key: 'status', 
              header: 'Status',
              width: 'w-1/6',
              render: (row: SalesOrder) => (
                <StatusBadge status={row.status} />
              )
            },
            {
              key: 'details',
              header: 'Details',
              width: 'w-1/6',
              render: () => (
                <a href="#" className="text-teal-600 hover:text-teal-800">
                  View
                </a>
              )
            }
          ]}
          data={salesOrders}
          keyExtractor={(item) => item.id}
          isLoading={isLoading.salesOrders}
        />
      </Card>
      
      {/* Latest Deliveries */}
      <Card title="Latest Deliveries" subtitle="Your recent product deliveries">
        <Table
          columns={[
            { key: 'id', header: 'Delivery ID', width: 'w-1/6' },
            { key: 'date', header: 'Date', width: 'w-1/6' },
            { 
              key: 'salesOrderId', 
              header: 'Order ID',
              width: 'w-1/6',
              render: (row: Delivery) => (
                <a href="#" className="text-teal-600 hover:text-teal-800">
                  {row.salesOrderId}
                </a>
              )
            },
            { 
              key: 'status', 
              header: 'Status',
              width: 'w-1/6',
              render: (row: Delivery) => (
                <StatusBadge status={row.status} />
              )
            },
            {
              key: 'details',
              header: 'Details',
              width: 'w-1/6',
              render: () => (
                <a href="#" className="text-teal-600 hover:text-teal-800">
                  View
                </a>
              )
            }
          ]}
          data={deliveries}
          keyExtractor={(item) => item.id}
          isLoading={isLoading.deliveries}
        />
      </Card>
    </div>
  );
};

export default DashboardPage;