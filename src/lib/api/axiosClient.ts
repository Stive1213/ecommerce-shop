import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export default axiosClient;
