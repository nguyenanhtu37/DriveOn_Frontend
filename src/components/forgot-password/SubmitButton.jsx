"use client"

import PropTypes from "prop-types"

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
  // Base styles that apply to all variants
  const baseStyles = `
    w-full 
    font-medium 
    rounded-lg 
    focus:outline-none 
    focus:ring-2 
    transition-all 
    duration-300
    shadow-md
    hover:shadow-lg
    transform
    hover:-translate-y-0.5
    active:translate-y-0
  `

  // Variant-specific styles
  const variantStyles = {
    primary: "bg-primary text-white hover:bg-primary/90 focus:ring-primary/50",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500/50",
    danger: "bg-destructive text-white hover:bg-destructive/90 focus:ring-destructive/50",
  }

  // Size-specific styles
  const sizeStyles = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  }

  // Disabled styles
  const disabledStyles = disabled || isLoading ? "opacity-70 cursor-not-allowed hover:transform-none" : ""

  // Combine all styles
  const combinedStyles = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${disabledStyles}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ")

  return (
    <button type="submit" className={combinedStyles} disabled={disabled || isLoading} onClick={onClick} {...props}>
      <span className="flex items-center justify-center">
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
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
  )
}

SubmitButton.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  variant: PropTypes.oneOf(["primary", "success", "danger"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
  onClick: PropTypes.func,
}

export default SubmitButton

