import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://portfolio-backend-30mp.onrender.com/api/v1" || process.env.API_URL,
});

export const getUserData = () => {
  return axiosInstance
    .get("/get/user/66058909b1677a89d8beba44")
    .then((response) => response.data);
};
