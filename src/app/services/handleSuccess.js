import axios from 'axios';

const handleSuccess = async (credentialResponse) => {
  try {
    // Send the Google OAuth token to the backend for authentication
    const result = await axios.post('http://localhost:5000/api/auth/google', {
      token: credentialResponse.credential,
    });

    // Log the response data and full result for debugging
    console.log("result.data: ", JSON.stringify(result.data));
    console.log("result: ", result);

    // Check if the login was successful
    if (result.status === 200 && result.statusText === "OK") {
      alert("Login successful!");
      // Store the token in localStorage (if provided by backend)
      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
      }
      // Redirect to homepage after successful login
      window.location.href = '/';
    } else {
      alert(result.data.message || "Login failed");
    }
  } catch (error) {
    // Handle errors and display the backend's error message if available
    const data = error?.response?.data;
    alert(data?.message || "Login failed");
  }
};

export default handleSuccess;