"use client"

import PropTypes from "prop-types"

const FooterSection = ({ onRegisterClick }) => (
  <div className="mt-6 text-center">
    <p className="text-sm text-body">
      Not registered yet?{" "}
      <button
        className="text-primary font-medium hover:text-primary/80 hover:underline transition-colors"
        onClick={onRegisterClick}
      >
        Register now
      </button>
    </p>
  </div>
)

FooterSection.propTypes = {
  onRegisterClick: PropTypes.func.isRequired,
}

export default FooterSection

