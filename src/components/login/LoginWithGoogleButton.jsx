import { GoogleLogin } from "@react-oauth/google";
import handleSuccess from "../../app/services/handleSuccess";
import handleError from "../../app/services/handleError";

const LoginWithGoogleButton = () => (
    <div>
      <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      ux_mode="popup"
      useOneTap
      flow="auth-code"
      />
    </div>
  );

  export default LoginWithGoogleButton;
