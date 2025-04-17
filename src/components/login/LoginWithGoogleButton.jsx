// import { GoogleLogin } from "@react-oauth/google"
// import handleSuccess from "../../app/services/handleSuccess"
// import handleError from "../../app/services/handleError"

// const LoginWithGoogleButton = () => {
//   return (
//     <div className="w-full">
//       <div>
//         <GoogleLogin
//           onSuccess={handleSuccess}
//           onError={handleError}
//           ux_mode="popup"
//           useOneTap
//           flow="auth-code"
//         />
//       </div>
//     </div>
//   )
// }

// export default LoginWithGoogleButton

import { GoogleLogin } from "@react-oauth/google";
import handleSuccess from "../../app/services/handleSuccess";
import handleError from "../../app/services/handleError";

const LoginWithGoogleButton = ({
  setUser,
  setUserRoles,
  setIsLoggedIn,
  navigate,
  setError,
}) => {
  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={(credentialResponse) =>
          handleSuccess({
            credential: credentialResponse.credential,
            setUser,
            setUserRoles,
            setIsLoggedIn,
            navigate,
            setError,
          })()
        }
        onError={handleError}
        ux_mode="popup"
        useOneTap
        flow="auth-code"
      />
    </div>
  );
};

export default LoginWithGoogleButton;
