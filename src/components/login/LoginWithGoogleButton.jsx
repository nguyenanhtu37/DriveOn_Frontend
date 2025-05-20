import { GoogleLogin } from "@react-oauth/google";
import handleError from "../../app/services/handleError";
import { useLoginWithGoogle } from "@/app/stores/entity/google";
import { connectSocket, setUser } from "@/app/stores/view/user";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { requestPermissionAndGetToken } from "../../../firebase-messaging";

const LoginWithGoogleButton = () => {
  const navigate = useNavigate();
  const mutation = useLoginWithGoogle();

  const handleSuccess = async (credentialResponse) => {
    let deviceToken = null;

    try {
      deviceToken = await requestPermissionAndGetToken();
      console.log("Device token: ", deviceToken);
    } catch (error) {
      console.error("Failed to get device token: ", error);
    }

    mutation.mutate(
      { ...credentialResponse, deviceToken },
      {
        onSuccess: (data) => {
          setUser(data.user);
          connectSocket();
          localStorage.setItem("token", data.token);
          toast({
            title: "Login successful",
            description: "You have successfully logged in with Google.",
            status: "success",
            duration: 2000,
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
      }
    );
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
