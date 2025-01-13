import baseAxios from "axios";

const token = localStorage.getItem("token");

const axios = baseAxios.create({
  timeout: 10000, // Thời gian timeout (ms)
  headers: {
    Authorization: `Bearer ${token}`, // Token xác thực
    "Content-Type": "application/json", // Loại dữ liệu gửi đi
  },
});

export { axios };
