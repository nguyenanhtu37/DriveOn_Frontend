
import PropTypes from "prop-types";

const FooterSection = ({ onRegisterClick }) => (
  <p className="mt-4 text-sm text-center text-gray-600">
    Not registered yet? 
    <button 
      className="text-purple-600 hover:underline ml-1"
      onClick={onRegisterClick}
    >
      Register now
    </button>
  </p>
);

FooterSection.propTypes = {
  onRegisterClick: PropTypes.func.isRequired,
};

export default FooterSection;