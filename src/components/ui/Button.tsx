type ButtonProps = {
  label: string;
  type?: "button" | "submit";
};

const Button = ({ label, type = "button" }: ButtonProps) => {
  return (
    <button
      type={type}
      className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
    >
      {label}
    </button>
  );
};

export default Button;
