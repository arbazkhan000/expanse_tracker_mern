import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { isValidEmail } from "../../utils/isValidEmail";

const Login = () => {
    const navigate = useNavigate();
    const [authState, setAuthState] = useState({
        email: "",
        password: "",
    });

    const { Login } = useAuth();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setAuthState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLoginForm = async (e) => {
        e.preventDefault();
        setError(null); // Reset error before validation

        if (!isValidEmail(authState.email)) {
            setError("Invalid email format");
            return;
        }

        if (authState.password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        setLoading(true);

        try {
            await Login(authState.email, authState.password); // Use context Login
            toast.success("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    "Login failed. Please try again."
            );

            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full px-4 py-8 md:px-10 bg-white">
            <h1 className="text-2xl md:text-3xl font-semibold mb-6">
                Expense Tracker
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                <form
                    onSubmit={handleLoginForm}
                    className="w-full md:w-1/2 p-5 rounded-md shadow-md bg-white"
                >
                    <div className="pb-5">
                        <h2 className="text-2xl md:text-3xl font-semibold">
                            Welcome Back!
                        </h2>
                        <p className="text-sm text-gray-600">
                            Please enter your details to log in
                        </p>
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
                        disabled={loading}
                        className={`w-full mt-5 p-2 rounded-md transition text-white ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-[#8C62F4] hover:bg-[#7a52d6]"
                        }`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className="text-sm mt-5 text-center">
                        Don't have an account?{" "}
                        <span
                            onClick={() => navigate("/register")}
                            className="text-[#8C62F4] cursor-pointer hover:underline"
                        >
                            Register
                        </span>
                    </p>
                </form>

                {/* Right image */}
                <div className="w-full md:w-1/2 hidden md:block">
                    <img
                        className="w-full h-auto object-contain"
                        src="https://imgs.search.brave.com/eMe9gGGQK-UuChvJqmcP4lCy9MNs-nLz6mIipFdyZDM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50aG91Z2h0c3Bv/dC5jb20vMzU3MDcv/MTcwMDczOTA4Ny1j/b2x1bW4tY2hhcnQu/anBnP2F1dG89Zm9y/bWF0"
                        alt="Login illustration"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
