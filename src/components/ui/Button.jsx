import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Button = ({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  leftIcon, 
  rightIcon, 
  children, 
  ...props 
}) => {
  const variants = {
    primary: 'bg-clinicDark text-white hover:bg-clinicPrimary hover:shadow-glass active:scale-95 shadow-google',
    secondary: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-google active:scale-95',
    accent: 'bg-gradient-to-br from-clinicPrimary to-clinicPrimary-dark text-white shadow-google hover:shadow-glass hover:-translate-y-0.5 active:scale-95',
    ghost: 'bg-transparent text-slate-500 hover:bg-slate-100 hover:text-clinicPrimary active:scale-90',
    danger: 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white shadow-google active:scale-95'
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
    icon: 'p-2.5'
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group whitespace-nowrap border-2 border-transparent hover:border-[#0a3d62]',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : leftIcon ? (
        <span className="mr-2 group-hover:-translate-x-0.5 transition-transform">{leftIcon}</span>
      ) : null}
      
      {children}
      
      {!isLoading && rightIcon && (
        <span className="ml-2 group-hover:translate-x-0.5 transition-transform">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;
