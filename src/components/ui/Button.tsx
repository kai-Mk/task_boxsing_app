type ButtonProps = {
  label: string;
  type?: "button" | "submit";
  loading?: boolean;
};

const Button = ({ label, type = "button", loading = false }: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={loading}
      className={`w-full py-3 font-medium rounded-lg transition ${
        loading
          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {label}
    </button>
  );
};

export default Button;
