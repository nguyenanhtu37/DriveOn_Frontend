import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import NewPasswordForm from "../../components/forgot-password/NewPasswordForm";

const NewPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8 font-archivo">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('/src/assets/background.png')" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-secondary/80 backdrop-blur-sm" />
      </div>

      {/* Back button */}
      <button
        onClick={handleBackToLogin}
        className="absolute top-4 left-4 z-10 bg-white hover:bg-gray2 text-heading p-3 rounded-full shadow-lg transition-all duration-300"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="sr-only">Back to login</span>
      </button>

      {/* New Password card */}
      <div className="w-full max-w-md z-10 bg-white rounded-lg shadow-2xl border border-gray p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-heading">Create New Password</h1>
          <p className="text-sm text-body">Set a strong and secure password</p>
        </div>

        {/* Pass the token to the NewPasswordForm */}
        <NewPasswordForm token={token} />
      </div>
    </div>
  );
};

export default NewPasswordPage;
