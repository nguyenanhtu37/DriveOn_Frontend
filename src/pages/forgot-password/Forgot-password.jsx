import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "../../components/forgot-password/ForgotPasswordForm";
import backgroundImage from "../../assets/background.png";
import ArrowLeftIcon from "../../assets/arrow-left.svg"; 
const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/loginlogin");
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <button
        onClick={handleBackToLogin}
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 bg-white p-2 rounded-full shadow"
      >
        <img src={ArrowLeftIcon} alt="Back to home" className="w-6 h-6" />
      </button>

      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Forgot Password</h1>
        <p className="text-sm text-gray-600">
          Enter your email to reset your password
        </p>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;