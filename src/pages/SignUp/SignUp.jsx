import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/background.png"; 
import ArrowLeftIcon from "../../assets/arrow-left.svg"; 
import SignUpForm from "../../components/sign-up/SignUpForm";

const SignUp = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/login"); // Navigate to the homepage or desired route
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

      {/* Car Owner Form Container */}
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Car Owner Registration</h1>
        <p className="text-sm text-gray-600">
          Please provide your details to register
        </p>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
