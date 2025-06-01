import { useState } from "react";
import {
    LuHandCoins,
    LuLayoutDashboard,
    LuLogOut,
    LuWalletMinimal,
} from "react-icons/lu";
import { MdMenu } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const menudata = [
    {
        id: 1,
        url: "/dashboard",
        icon: <LuLayoutDashboard />,
        title: "Dashboard",
    },
    {
        id: 2,
        url: "/income",
        icon: <LuWalletMinimal />,
        title: "Income",
    },
    {
        id: 3,
        url: "/expanse",
        icon: <LuHandCoins />,
        title: "Expense",
    },
    {
        id: 4,
        icon: <LuLogOut />,
        title: "Logout",
    },
];

const Navbar = () => {
    const [active, setActive] = useState(1);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const { user, Logout } = useAuth();

    const toggleBtn = () => {
        setOpen(!open);
    };

    const handleActive = (id) => {
        setActive(id);
        setOpen(false);
    };

    const handleLogout = () => {
        Logout();
        navigate("/login");
    };

    return (
        <div className="p-3 px-7 border flex items-center justify-between bg-white relative">
            {/* logo */}
            <h1 className="text-xl md:text-3xl font-bold">Expense Tracker</h1>

            {/* mobile menu button */}
            <span className="block md:hidden">
                <MdMenu onClick={toggleBtn} size={30} />
            </span>

            {/* mobile menu */}
            {open && (
                <div className="absolute top-16 right-4 bg-white shadow-xl rounded-lg p-5 w-64 z-50">
                    {/* profile */}
                    <div className="flex flex-col items-center mb-4">
                        
                        <span className="text-sm text-gray-600">
                            Welcome, {user?.name || "User"}
                        </span>
                    </div>

                    {/* menu items */}
                    <ul className="flex flex-col gap-2">
                        {menudata.map((item) => {
                            if (item.title === "Logout") {
                                return (
                                    <li
                                        key={item.id}
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 p-3 rounded hover:bg-red-100 text-red-500 cursor-pointer"
                                    >
                                        <span>{item.icon}</span>
                                        <span>{item.title}</span>
                                    </li>
                                );
                            }

                            return (
                                <li key={item.id}>
                                    <Link
                                        to={item.url}
                                        onClick={() => handleActive(item.id)}
                                        className={`flex items-center gap-3 p-3 rounded hover:bg-violet-100 hover:text-violet-500 ${
                                            active === item.id
                                                ? "bg-violet-500 text-white"
                                                : ""
                                        }`}
                                    >
                                        <span>{item.icon}</span>
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
