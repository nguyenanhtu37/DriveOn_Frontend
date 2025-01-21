import NewPasswordForm from "@/components/forgot-password/NewPasswordForm";
import backgroundImage from "@/assets/background.png";

const NewPasswordPage = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Create New Password</h1>
        <p className="text-sm text-gray-600">Set a strong and secure password</p>
        <NewPasswordForm />
      </div>
    </div>
  );
};

export default NewPasswordPage;
