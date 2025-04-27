import { toast as reactToast } from "react-toastify";

export const toast = ({ title, description }) => {
  reactToast(`${title}: ${description}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};