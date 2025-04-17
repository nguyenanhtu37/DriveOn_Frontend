// import { axios } from "@/lib/axios";

// const handleSuccess = async (credentialResponse) => {
//   try {
//     // Send the Google OAuth token to the backend for authentication
//     const result = await axios.post("auth/google", {
//       token: credentialResponse.credential,
//     });

//     // Log the response data and full result for debugging
//     console.log("result.data: ", JSON.stringify(result.data));
//     console.log("result: ", result);

//     // Check if the login was successful
//     if (result.status === 200) {
//       // Store the token in localStorage (if provided by backend)
//       if (result.data.token) {
//         localStorage.setItem("token", result.data.token);
//       }
//       // Redirect to homepage after successful login
//       window.location.href = "/";
//     } else {
//       alert(result.data.message || "Login failed");
//     }
//   } catch (error) {
//     // Handle errors and display the backend's error message if available
//     const data = error?.response?.data;
//     alert(data?.message || "Login failed");
//   }
// };

// export default handleSuccess;

import { axios } from "@/lib/axios";

const handleGoogleLogin = async ({
  credential,
  setUser,
  setUserRoles,
  setIsLoggedIn,
  navigate,
  setError,
}) => {
  try {
    const result = await axios.post("auth/google", {
      token: credential,
    });

    const { user, token, jwtToken } = result.data;
    const finalToken = jwtToken || token;

    if (!finalToken || !user) throw new Error("Invalid response from server");

    localStorage.setItem("token", finalToken);
    setUser(user);
    setIsLoggedIn(true);

    const roles = user.roles.map((r) =>
      typeof r === "string" ? r : r.roleName
    );
    setUserRoles(roles);

    if (roles.includes("admin")) {
      navigate("/adminDashboard");
    } else {
      navigate("/");
    }
  } catch (error) {
    console.error("Google login error:", error);
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Đăng nhập bằng Google thất bại.";
    if (setError) setError(message);
    else alert(message);
  }
};

export default handleGoogleLogin;