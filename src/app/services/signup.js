import { axios } from "/src/lib/axios.js";

export const signup = async (credentials) => {
  try {
    console.log("Sending signup request with data:", credentials);
    const response = await axios.post("/auth/signup", credentials);
    console.log("Signup response:", response.data);
    if (!response.data || typeof response.data !== "object") {
      throw new Error("Invalid response format from server: Expected an object");
    }
    if (!response.data.message || typeof response.data.message !== "string") {
      throw new Error("Invalid response from server: Expected a message string");
    }
    return response.data; // Expect { message: "Verification email sent" }
  } catch (error) {
    console.error("Signup request failed:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      code: error.code,
    });
    if (error.code === "ERR_NETWORK") {
      throw new Error("Signup failed: Unable to connect to the server. Please check your network or server status.");
    }
    if (error.response) {
      throw new Error(
        error.response.data?.message ||
        `Signup failed: Server responded with status ${error.response.status}`
      );
    }
    throw new Error("Signup failed: An unexpected error occurred");
  }
};