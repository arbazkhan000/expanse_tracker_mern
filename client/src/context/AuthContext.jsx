import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../service/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // holds user object
    const [loading, setLoading] = useState(true); // loading state while fetching
    const [formState, setFormState] = useState({
        fullName: "",
        email: "",
        password: "",
        profileImage: "",
    });

    // useEffect(() => {
    //     const fetchProfile = async () => {
    //         try {
    //             const token = localStorage.getItem("token");

    //             const { data } = await axiosInstance.get("/auth/profile", {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });

    //             if (data.success) {
    //                 setUser(data.user);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching profile", error);
    //             setUser(null);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchProfile();
    // }, []);

    const register = async (name, email, password, profileImage) => {
        setLoading(true);

        try {
            const { data } = await axiosInstance.post("/auth/register", {
                name,
                email,
                password,
                profileImage, // send image as URL
            });

            if (data.success) {
                setUser(data.user);
                localStorage.setItem("token", data.token);
                localStorage.setItem("name", data.user.name);
            } else {
                setUser(null);
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Registration failed"
            );
            setUser(null);
        } finally {
            setLoading(false);
        }
    };
    

    const Login = async (email, password) => {
        setLoading(true);

        try {
            const { data } = await axiosInstance.post("/auth/login", {
                email,
                password,
            });

            if (data.success) {
                setUser(data.user);
                localStorage.setItem("token", data.token);
                localStorage.setItem("name", data.user.name);
            } else {
                console.error("Login failed:", data.message);
                setUser(null);
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    "Login failed. Please try again."
            );
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const Logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("name");
    };

    return (
        <AuthContext.Provider
            value={{ user, setUser, loading, Login, Logout, register }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
