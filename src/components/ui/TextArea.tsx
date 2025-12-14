"use client";

import { UseFormRegisterReturn } from "react-hook-form";

type TextAreaProps = {
  label: string;
  hint?: string;
  error?: string;
  register: UseFormRegisterReturn;
  rows?: number;
  required?: boolean;
};

const TextArea = ({ label, hint, error, register, rows = 4, required = false }: TextAreaProps) => {
  return (
    <div className="relative pb-3">
      <div className="flex items-baseline gap-2 mb-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {required && (
          <span className="text-xs text-white bg-red-500 px-1.5 py-0.5 rounded">必須</span>
        )}
        {hint && <span className="text-sm text-gray-500">{hint}</span>}
      </div>
      <textarea
        {...register}
        rows={rows}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && (
        <p className="absolute -bottom-3 left-0 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextArea;
