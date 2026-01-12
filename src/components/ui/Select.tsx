"use client";

import { UseFormRegisterReturn } from "react-hook-form";
import { ChevronDown } from "lucide-react";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  label: string;
  options: Option[];
  hint?: string;
  error?: string;
  register: UseFormRegisterReturn;
  required?: boolean;
};

const Select = ({
  label,
  options,
  hint,
  error,
  register,
  required = false,
}: SelectProps) => {
  return (
    <div className="relative pb-3">
      <div className="flex items-baseline gap-2 mb-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {required && (
          <span className="text-xs text-white bg-red-500 px-1.5 py-0.5 rounded">
            必須
          </span>
        )}
        {hint && <span className="text-sm text-gray-500">{hint}</span>}
      </div>
      <div className="relative">
        <select
          {...register}
          className={`
            w-full px-4 py-2 border rounded-lg appearance-none
            focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition
            bg-white cursor-pointer
            ${error ? "border-red-500" : "border-gray-300"}
          `}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
      {error && (
        <p className="absolute -bottom-3 left-0 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
