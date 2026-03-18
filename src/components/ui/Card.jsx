import React from 'react';
import { cn } from './Button';

const Card = ({ className, children, glass = false, hover = true, ...props }) => {
  return (
    <div 
      className={cn(
        'rounded-2xl p-6 transition-all duration-300 border border-transparent',
        glass ? 'glass-card' : 'bg-white shadow-premium',
        hover && 'hover:shadow-glass hover:-translate-y-1 hover:border-[#0a3d62] hover:border-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
