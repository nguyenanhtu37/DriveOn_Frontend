import { axios } from "@/lib/axios";

export const getProfile = async () => {
  const response = await axios.get("/user/view-personal-profile");
  return response.data;
};

export const changePassword = async (data) => {
  const response = await axios.post("/user/change-password", data);
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await axios.put("/user/update-personal-profile", data);
  return response.data;
};

//admin

export const getAllUser = async (page) => {
  const response = await axios.get("/user/view-all-users", {
    params: {
      page: page,
    },
  });
  return response.data;
};

export const enableUser = async (userId) => {
  const response = await axios.put(`/user/enable-user/${userId}`);
  return response.data;
};

export const disableUser = async (userId) => {
  const response = await axios.put(`/user/disable-user/${userId}`);
  return response.data;
};
