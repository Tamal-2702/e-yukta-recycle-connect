
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', variant = 'full', className = '' }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
  };

  return (
    <div className={`flex items-center ${className}`}>
      {variant === 'full' ? (
        <div className="flex items-center">
          <div className={`text-primary font-bold ${sizeClasses[size]}`}>
            <img 
              src="/lovable-uploads/27733395-edc3-4227-9c4f-64c67cc6ae4a.png" 
              alt="ई-Yukta Logo" 
              className={sizeClasses[size]}
            />
          </div>
        </div>
      ) : (
        <div className={`text-primary ${sizeClasses[size]}`}>
          <img 
            src="/lovable-uploads/5cf4d238-8867-41cf-8b31-91d2cabfc66a.png" 
            alt="ई-Yukta Icon" 
            className={sizeClasses[size]}
          />
        </div>
      )}
    </div>
  );
};

export default Logo;
