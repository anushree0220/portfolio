import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://portfolio-backend-30mp.onrender.com/api/v1" || process.env.API_URL,
});

export const getUserData = () => {
  return axiosInstance
    .get("/get/user/65b3a22c01d900e96c4219ae")
    .then((response) => response.data);
};
