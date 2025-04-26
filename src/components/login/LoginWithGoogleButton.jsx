import { GoogleLogin } from "@react-oauth/google"
import handleSuccess from "../../app/services/handleSuccess"
import handleError from "../../app/services/handleError"

const LoginWithGoogleButton = () => {
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
  )
}

export default LoginWithGoogleButton