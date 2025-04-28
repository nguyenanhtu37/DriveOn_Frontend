import { axios } from "@/lib/axios";
import { setUser } from "../stores/view/user";

const handleSuccess = async (credentialResponse) => {
  const result = await axios.post("auth/google", {
    token: credentialResponse.credential,
  });

  console.log("result: ", result);
  setUser(result.user);
  localStorage.setItem("token", result.token);

  let roles = result.user.roles;

  // ✅ Điều hướng
  if (roles.some((userRole) => userRole.roleName === "admin")) {
    window.location.href("/admin");
  }
  if (roles.some((userRole) => userRole.roleName === "staff")) {
    window.location.href(`/garageManagement/${result.user.garageList[0]._id}`);
  } else {
    console.log("➡️ Redirecting to homepage...");
    window.location.href("/");
  }
};

export default handleSuccess;
