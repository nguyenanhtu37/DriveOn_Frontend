import PropTypes from "prop-types";

const InputField = ({ label, type, placeholder, register, error }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      className={`block w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-purple-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
      placeholder={placeholder}
      {...register}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  register: PropTypes.object.isRequired,
  error: PropTypes.object,
};

export default InputField;