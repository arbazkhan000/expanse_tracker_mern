import axios from "axios";

const axiosInstance = axios.create({
    baseURL:
        process.env.NODE_ENV === "production"
            ? "https://expanse-tracker-mern-backend.vercel.app/api"
            : "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default axiosInstance;
