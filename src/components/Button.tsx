import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyle = "px-6 py-3 font-bold uppercase tracking-wider transition-all duration-200 text-sm md:text-base flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200 border-2 border-white",
    secondary: "bg-neutral-800 text-white hover:bg-neutral-700 border-2 border-neutral-800",
    outline: "bg-transparent text-white border-2 border-white hover:bg-white/10",
    danger: "bg-red-700 text-white hover:bg-red-600 border-2 border-red-700"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};