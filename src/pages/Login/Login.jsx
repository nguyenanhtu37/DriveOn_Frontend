import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/login/LoginForm";
import FooterSection from "../../components/login/FooterSection";
import backgroundImage from "../../assets/background.png";
import ArrowLeftIcon from "../../assets/arrow-left.svg";
const LoginPage = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/car-owner");
  };

  const handleBackToHome = () => {
    navigate("/"); // Navigate to the homepage
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
      {/* Back Arrow Button at the Top-Left of the Page */}
      <button
        onClick={handleBackToHome}
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 bg-white p-2 rounded-full shadow"
      >
        <img src={ArrowLeftIcon} alt="Back to home" className="w-6 h-6" />
      </button>

      {/* Login Form Container */}
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md border border-solid border-gray-300">
        <h1 className="text-2xl font-bold text-gray-800">Login</h1>
        <p className="text-sm text-gray-600">Hi, Welcome back 👋</p>
        <LoginForm />
        <FooterSection onRegisterClick={handleRegisterClick} />
      </div>
    </div>
  );
};

export default LoginPage;
