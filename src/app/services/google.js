import { axios } from "@/lib/axios";

export const loginWithGoogle = async (credentialResponse) => {
  console.log("Payload sent to Backend:", {
    token: credentialResponse.credential,
    deviceToken: credentialResponse.deviceToken,
  });

  const response = await axios.post("/auth/google", {
    token: credentialResponse.credential,
    deviceToken: credentialResponse.deviceToken, 
  });
  return response.data;
};