// app/services/reset-password.js

import { axios } from "../../libs/axios";

/**
 * Sends a request to the backend to reset the user's password.
 *
 * @param {string} token - The reset token provided in the URL from the email link.
 * @param {string} password - The new password the user wants to set.
 * @returns The response data from the backend.
 */
export const resetPassword = async (token, password) => {
  try {
    const response = await axios.post("/auth/reset-password", {
      token,
      password,
    });
    return response.data;
  } catch (error) {
    // Provide a default error structure if the backend doesn't return one
    throw (
      error.response?.data || {
        message: "An error occurred during the reset password request.",
      }
    );
  }
};
