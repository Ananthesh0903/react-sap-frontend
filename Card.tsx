import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  footer,
  hover = false,
}) => {
  return (
    <div className={`bg-white rounded-lg border border-slate-200 shadow-sm ${hover ? 'hover:shadow-md transition-shadow duration-300' : ''} ${className}`}>
      {(title || subtitle) && (
        <div className="p-4 border-b border-slate-200">
          {title && <h3 className="text-lg font-medium text-slate-900">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        </div>
      )}
      <div className="p-4">{children}</div>
      {footer && <div className="p-4 bg-slate-50 border-t border-slate-200 rounded-b-lg">{footer}</div>}
    </div>
  );
};

export default Card;