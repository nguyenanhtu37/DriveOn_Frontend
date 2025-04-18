import { axios } from "@/lib/axios";

export const loginWithGoogle = async (credentialResponse) => {
  const response = await axios.post("/auth/google", {
    token: credentialResponse.credential,
  });
  return response.data;
};
