import { GoogleLogin } from "@react-oauth/google";
import handleError from "../../app/services/handleError";
import { useLoginWithGoogle } from "@/app/stores/entity/google";
import { setUser } from "@/app/stores/view/user";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const LoginWithGoogleButton = () => {
  const navigate = useNavigate();
  const mutation = useLoginWithGoogle();
  const handleSuccess = (credentialResponse) => {
    mutation.mutate(credentialResponse, {
      onSuccess: (data) => {
        setUser(data.user);
        localStorage.setItem("token", data.token);
        toast({
          title: "Login successful",
          description: "You have successfully logged in with Google.",
          status: "success",
        });
        let roles = data.user.roles;
        if (roles.some((userRole) => userRole.roleName === "admin")) {
          navigate("/admin");
        }
        if (roles.some((userRole) => userRole.roleName === "staff")) {
          navigate(`/garageManagement/${data.user.garageList[0]._id}`);
        } else {
          console.log("➡️ Redirecting to homepage...");
          navigate("/");
        }
      },
      onError: (error) => {
        console.error("Login failed:", error);
        alert("Login failed. Please try again.");
      },
    });
  };

  return (
    <div className="w-full">
      <div>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          ux_mode="popup"
          useOneTap
          flow="auth-code"
        />
      </div>
    </div>
  );
};

export default LoginWithGoogleButton;
