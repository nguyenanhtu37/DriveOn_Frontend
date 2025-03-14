import PropTypes from "prop-types"

const InputField = ({ label, type, placeholder, register, error }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-heading">{label}</label>
    <input
      type={type}
      className={`block w-full px-4 py-3 text-heading bg-gray2/30 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${error ? "border-destructive" : "border-gray"}`}
      placeholder={placeholder}
      {...register}
    />
    {error && <p className="mt-1 text-sm text-destructive">{error.message}</p>}
  </div>
)

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  register: PropTypes.object.isRequired,
  error: PropTypes.object,
}

export default InputField

