import PropTypes from "prop-types"

const SubmitButton = ({ children, disabled }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-full px-4 py-3 text-white font-medium bg-primary rounded-lg
        hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed
        transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0`}
    >
      {children}
    </button>
  )
}

SubmitButton.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
}

export default SubmitButton

