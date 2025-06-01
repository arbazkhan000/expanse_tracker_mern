import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { isValidEmail } from "../../utils/isValidEmail";

const Register = () => {
    const [profilePreview, setProfilePreview] = useState(null);
    const [profileFile, setProfileFile] = useState(null);

    const [authState, setAuthState] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { register } = useAuth();

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setAuthState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleRegisterForm = async (e) => {
        e.preventDefault();
        setError(null);

        if (!isValidEmail(authState.email)) {
            toast.error("Invalid email format");
            setError("Invalid email format");
            return;
        }

        if (authState.password.length < 8) {
            toast.error("Password must be at least 8 characters long");
            setError("Password must be at least 8 characters long");
            return;
        }

       
        try {
            await register(
                authState.name,
                authState.email,
                authState.password,
            );

            navigate("/login");
        } catch (err) {
            console.error("Registration error:", err);
            const errorMsg =
                err.response?.data?.message ||
                "Registration failed. Please try again.";
            setError(errorMsg);
        }
    };

    return (
        <div className="min-h-screen w-full px-4 py-8 md:px-10 bg-white">
            <h1 className="text-2xl md:text-3xl font-semibold mb-6">
                Expense Tracker
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                <form
                    onSubmit={handleRegisterForm}
                    className="w-full md:w-1/2 p-5 rounded-md shadow-md bg-white"
                >
                    <div className="pb-5">
                        <h2 className="text-2xl md:text-3xl font-semibold">
                            Create an Account!
                        </h2>
                        <p className="text-sm text-gray-600">
                            Join us today by entering your details below
                        </p>
                    </div>

                    <div className="flex items-center space-x-5">
                        <div className="flex flex-col space-y-2 py-2 w-full">
                            <label className="text-sm" htmlFor="name">
                                Name
                            </label>
                            <input
                                value={authState.name}
                                onChange={changeHandler}
                                name="name"
                                className="bg-[#EEF3F9] w-full p-2 rounded-md outline-none"
                                id="name"
                                type="text"
                                placeholder="John ..."
                                required
                            />
                        </div>

                        <div className="flex flex-col space-y-2 py-2 w-full">
                            <label className="text-sm" htmlFor="email">
                                Email
                            </label>
                            <input
                                value={authState.email}
                                onChange={changeHandler}
                                name="email"
                                className="bg-[#EEF3F9] w-full p-2 rounded-md outline-none"
                                id="email"
                                type="email"
                                placeholder="Enter your email here..."
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2 py-2 w-full">
                        <label className="text-sm" htmlFor="password">
                            Password
                        </label>
                        <input
                            value={authState.password}
                            onChange={changeHandler}
                            name="password"
                            className="bg-[#EEF3F9] w-full p-2 rounded-md outline-none"
                            id="password"
                            type="password"
                            placeholder="Min 8 characters..."
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500 mt-1">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full mt-5 bg-[#8C62F4] text-white p-2 rounded-md hover:bg-[#7a52d6] transition"
                    >
                        Register
                    </button>

                    <p className="text-sm mt-5 text-center">
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="text-[#8C62F4] cursor-pointer hover:underline"
                        >
                            Login
                        </span>
                    </p>
                </form>

                <div className="w-full md:w-1/2 hidden md:block">
                    <img
                        className="w-full h-auto object-contain"
                        src="https://imgs.search.brave.com/eMe9gGGQK-UuChvJqmcP4lCy9MNs-nLz6mIipFdyZDM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50aG91Z2h0c3Bv/dC5jb20vMzU3MDcv/MTcwMDczOTA4Ny1j/b2x1bW4tY2hhcnQu/anBnP2F1dG89Zm9y/bWF0"
                        alt="Register illustration"
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;
