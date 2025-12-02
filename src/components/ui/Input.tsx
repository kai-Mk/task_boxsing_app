import { UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  label: string;
  type: string;
  hint?: string;
  error?: string;
  register: UseFormRegisterReturn;
};

const Input = ({ label, type, hint, error, register }: InputProps) => {
  return (
    <div className="relative pb-3">
      <div className="flex items-baseline gap-2 mb-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {hint && <span className="text-sm text-gray-500">{hint}</span>}
      </div>
      <input
        type={type}
        {...register}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
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

export default Input;
