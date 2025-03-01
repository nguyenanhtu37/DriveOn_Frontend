"use client"

import PropTypes from "prop-types"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

const InputField = ({
  label,
  type,
  placeholder,
  register,
  error,
  required = false,
  disabled = false,
  className = "",
  helperText = "",
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const inputType = type === "password" && showPassword ? "text" : type

  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          type={inputType}
          className={`block w-full px-4 py-2 pr-10 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out
            ${error ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"} 
            ${disabled ? "bg-gray-100 cursor-not-allowed opacity-75" : "bg-white hover:border-purple-300"}`}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${label}-error` : helperText ? `${label}-helper` : undefined}
          {...register}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
      {helperText && !error && (
        <p id={`${label}-helper`} className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
      {error && (
        <p id={`${label}-error`} className="mt-1 text-sm text-red-600 font-medium">
          {error.message}
        </p>
      )}
    </div>
  )
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  register: PropTypes.object.isRequired,
  error: PropTypes.object,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  helperText: PropTypes.string,
}

export default InputField

