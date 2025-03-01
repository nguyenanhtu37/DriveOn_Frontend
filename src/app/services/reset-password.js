// app/services/reset-password.js
import { axios } from "../../lib/axios";

/**
 * Requests a password reset email to be sent to the user.
 *
 * @param {string} email - The user's email address
 * @returns {Promise<Object>} The response data from the backend
 */
export const requestPasswordReset = async (email) => {
  try {
    const response = await axios.post("/auth/request-password-reset", { email });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to send password reset email",
      }
    );
  }
};

/**
 * Resets the user's password using a token.
 *
 * @param {string} token - The reset token provided in the URL from the email link
 * @param {string} password - The new password the user wants to set
 * @returns {Promise<Object>} The response data from the backend
 */
export const resetPassword = async (token, password) => {
  try {
    const response = await axios.post("/auth/reset-password", {
      token,
      password,
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to reset password",
      }
    );
  }
};