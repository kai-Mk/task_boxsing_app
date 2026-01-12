"use client";

import { UseFormRegisterReturn } from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

type RadioGroupProps = {
  label: string;
  name: string;
  options: Option[];
  hint?: string;
  error?: string;
  register: UseFormRegisterReturn;
  required?: boolean;
  direction?: "horizontal" | "vertical";
};

const RadioGroup = ({
  label,
  options,
  hint,
  error,
  register,
  required = false,
  direction = "horizontal",
}: RadioGroupProps) => {
  return (
    <div className="relative pb-3">
      <div className="flex items-baseline gap-2 mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {required && (
          <span className="text-xs text-white bg-red-500 px-1.5 py-0.5 rounded">必須</span>
        )}
        {hint && <span className="text-sm text-gray-500">{hint}</span>}
      </div>
      <div
        className={`
          flex gap-4
          ${direction === "vertical" ? "flex-col" : "flex-row flex-wrap"}
        `}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              value={option.value}
              {...register}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="absolute -bottom-3 left-0 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default RadioGroup;
