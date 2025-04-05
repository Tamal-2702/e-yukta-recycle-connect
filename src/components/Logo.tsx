
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
              src="/lovable-uploads/d37ce6c5-60d7-468a-a8ba-32adb3f7de51.png" 
              alt="ई-Yukta Logo" 
              className={sizeClasses[size]}
            />
          </div>
        </div>
      ) : (
        <div className={`text-primary ${sizeClasses[size]}`}>
          <img 
            src="/lovable-uploads/6c301a42-c407-456b-b013-05fa8c7bb54b.png" 
            alt="ई-Yukta Icon" 
            className={sizeClasses[size]}
          />
        </div>
      )}
    </div>
  );
};

export default Logo;
