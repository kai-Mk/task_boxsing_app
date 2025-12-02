type InputProps = {
  label: string;
  type: string;
  name: string;
  hint?: string;
};

const Input = ({ label, type, name, hint }: InputProps) => {
  return (
    <div>
      <div className="flex items-baseline gap-2 mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {hint && <span className="text-sm text-gray-500">{hint}</span>}
      </div>
      <input
        type={type}
        name={name}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
      />
    </div>
  );
};

export default Input;
