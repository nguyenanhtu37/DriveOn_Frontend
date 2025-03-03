import { GoogleLogin } from "@react-oauth/google";
import handleSuccess from "../../app/services/handleSuccess";
import handleError from "../../app/services/handleError";

const LoginWithGoogleButton = () => (
    // <button
    //   type="button"
    //   className="flex items-center justify-center w-full px-4 py-2 mb-4 text-white bg-red-500 rounded-lg hover:bg-red-600 border border-solid border-gray-300"
    // >
    //   <span className="mr-2"></span>
    //   Login with Google
    // </button>
    <div>
      <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      />
    </div>
  );
  
  export default LoginWithGoogleButton;
  