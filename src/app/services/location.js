import axios from "axios";

export const getProvinces = () => {
  const response = axios.get("https://open.oapi.vn/location/provinces?size=63");
  return response;
};

export const getDistricts = (provinceId) => {
  const response = axios.get(
    `https://open.oapi.vn/location/districts?province_id=${provinceId}`
  );
  return response;
};
