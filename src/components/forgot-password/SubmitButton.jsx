// components/ui/AuthSubmitButton.jsx
import PropTypes from "prop-types";

const SubmitButton = ({
  children,
  disabled = false,
  isLoading = false,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  ...props
}) => {
  const baseStyles = `
    w-full 
    font-semibold 
    rounded-lg 
    focus:outline-none 
    focus:ring-2 
    focus:ring-offset-2 
    transition-all 
    duration-200 
    shadow-sm
  `;

  const variantStyles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const disabledStyles = disabled || isLoading 
    ? "opacity-60 cursor-not-allowed" 
    : "hover:shadow-md";

  const loadingStyles = isLoading ? "cursor-wait" : "";

  const combinedStyles = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    disabledStyles,
    loadingStyles,
    className,
  ].join(" ").trim();

  return (
    <button
      type="submit"
      className={combinedStyles}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      <span className="flex items-center justify-center">
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </span>
    </button>
  );
};

SubmitButton.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  variant: PropTypes.oneOf(["primary", "success", "danger"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default SubmitButton;