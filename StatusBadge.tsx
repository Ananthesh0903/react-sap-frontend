import React from 'react';

type StatusType = 
  | 'active' | 'inactive' | 'pending'
  | 'open' | 'processed' | 'closed'
  | 'in process' | 'delivered'
  | 'planned' | 'in transit'
  | 'paid' | 'overdue';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const styles = {
    // Account statuses
    active: 'bg-green-100 text-green-800 border-green-200',
    inactive: 'bg-slate-100 text-slate-800 border-slate-200',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    
    // Inquiry/Order statuses
    open: 'bg-blue-100 text-blue-800 border-blue-200',
    processed: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    closed: 'bg-slate-100 text-slate-800 border-slate-200',
    'in process': 'bg-purple-100 text-purple-800 border-purple-200',
    
    // Delivery statuses
    planned: 'bg-blue-100 text-blue-800 border-blue-200',
    'in transit': 'bg-amber-100 text-amber-800 border-amber-200',
    delivered: 'bg-green-100 text-green-800 border-green-200',
    
    // Payment statuses
    paid: 'bg-green-100 text-green-800 border-green-200',
    overdue: 'bg-red-100 text-red-800 border-red-200'
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]} ${className}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;