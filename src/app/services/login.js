import { axios } from "../../lib/axios";

// Login service
// export const login = async (credentials) => {
//   try {
//     const response = await axios.post("/auth/login", credentials);
//     const { token, user, roles } = response.data;

//     // Validate response
//     if (!token) {
//       throw new Error("Invalid response from server: No token received");
//     }
//     if (!user) {
//       throw new Error("Invalid response from server: No user data received");
//     }

//     // Return structured data for useAuth
//     return {
//       token,
//       user,
//       roles: roles || ["carowner"], // Default to "carowner" if no roles provided
//     };
//   } catch (error) {
//     const errorMessage =
//       error.response?.data?.error || error.message || "Login failed";
//     throw new Error(errorMessage);
//   }
// };

export const login = async (credentials) => {
  try {
    // console.log("Login API payload:", credentials);
    const response = await axios.post("/auth/login", credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { token, user, roles } = response.data;

    // Validate response
    if (!token) {
      throw new Error("Invalid response from server: No token received");
    }
    if (!user) {
      throw new Error("Invalid response from server: No user data received");
    }

    // Return structured data for useAuth
    return {
      token,
      user,
      roles: roles || ["carowner"], // Default to "carowner" if no roles provided
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || error.message || "Login failed";
    throw new Error(errorMessage);
  }
};

// Logout service
export const logout = async (token) => {
  if (!token) {
    return; // No token to logout, but localStorage will still be cleared in useAuth
  }

  try {
    await axios.post("/auth/logout", { token });
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "Logout failed on server";
    throw new Error(errorMessage);
  }
};