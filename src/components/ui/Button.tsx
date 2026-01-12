type ButtonProps = {
  label: string;
  type?: "button" | "submit";
  loading?: boolean;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  onClick?: () => void;
};

const VARIANT_CLASSES = {
  primary: {
    normal: "bg-blue-600 text-white hover:bg-blue-700",
    disabled: "bg-gray-400 text-gray-200 cursor-not-allowed",
  },
  secondary: {
    normal: "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50",
    disabled: "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed",
  },
} as const;

const Button = ({
  label,
  type = "button",
  loading = false,
  variant = "primary",
  fullWidth = true,
  onClick,
}: ButtonProps) => {
  const variantClass = loading
    ? VARIANT_CLASSES[variant].disabled
    : VARIANT_CLASSES[variant].normal;

  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className={`
        py-2.5 px-4 font-medium rounded-lg transition
        ${fullWidth ? "w-full" : ""}
        ${variantClass}
      `}
    >
      {label}
    </button>
  );
};

export default Button;
