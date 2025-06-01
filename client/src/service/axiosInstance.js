import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://expanse-tracker-mern-backend.vercel.app/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default axiosInstance;
