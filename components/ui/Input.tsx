import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="block mb-1 font-medium text-gray-700 dark:text-gray-200"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full rounded-md border border-gray-300
            px-3 py-2 text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed
            dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600
            dark:focus:ring-blue-400 dark:focus:border-blue-400
            ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
