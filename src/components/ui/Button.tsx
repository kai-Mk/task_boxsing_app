type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit";
};

const Button = ({ children, type = "button" }: ButtonProps) => {
  return (
    <button
      type={type}
      className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
    >
      {children}
    </button>
  );
};

export default Button;
