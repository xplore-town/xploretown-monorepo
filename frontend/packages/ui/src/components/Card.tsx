import React from "react";

export interface CardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, description, children, footer, className = "" }) => {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
    >
      {(title || description) && (
        <div className="border-b border-gray-200 px-6 py-4">
          {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
          {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
        </div>
      )}

      {children && <div className="px-6 py-4">{children}</div>}

      {footer && <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">{footer}</div>}
    </div>
  );
};

export default Card;
