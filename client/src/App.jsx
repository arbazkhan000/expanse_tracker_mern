import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Expanse from "./pages/Dashboard/Expanse";

export const AuthRedirect = () => {
    const isAuthenticated = !!localStorage.getItem("token");

    return isAuthenticated ? (
        <Navigate to="/dashboard" />
    ) : (
        <Navigate to="/login" />
    );
};

function App() {
    return (
        <Routes>
            <Route path="/" element={<AuthRedirect />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Layout Route */}
            <Route path="/" element={<Home />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="income" element={<Income />} />
                <Route path="expanse" element={<Expanse />} />
            </Route>

            
            
            
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default App;
