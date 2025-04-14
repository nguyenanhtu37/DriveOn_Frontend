import { getLocation } from "@/app/stores/view/user";

export const openGoogleMap = (destination) => {
  const location = getLocation();

  const url = `https://www.google.com/maps/dir/?api=1&origin=${location[0]},${location[1]}&destination=${destination[1]},${destination[0]}`;
  window.open(url, "_blank");
};
