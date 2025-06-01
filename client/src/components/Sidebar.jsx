import { useState } from "react";
import {
    LuHandCoins,
    LuLayoutDashboard,
    LuLogOut,
    LuWalletMinimal,
} from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SidebarData = [
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

const Sidebar = () => {
    const [active, setActive] = useState(1);
    const navigate = useNavigate();

    const { user, Logout } = useAuth();


    const handelActive = (id) => {
        setActive(id);
    };

    const handelLogout = () => {
        Logout();
        navigate("/login");
    };

    

    return (
        <div className="w-[20%] min-h-screen bg-white shadow-lg p-5 hidden md:block">
            {/* User Profile */}
            <div className="flex items-center justify-center flex-col mb-3">
               
                <span className="">welocme ,{user?.name}</span>
            </div>

            <ul className="gap-3 flex flex-col">
                {SidebarData.map((item) =>
                    item.title === "Logout" ? (
                        <li
                            key={item.id}
                            onClick={handelLogout}
                            className="flex items-center gap-3 p-3 rounded hover:bg-red-100 text-red-500 cursor-pointer"
                        >
                            <span>{item.icon}</span>
                            <span>{item.title}</span>
                        </li>
                    ) : (
                        <Link to={item.url} key={item.id}>
                            <li
                                onClick={() => handelActive(item.id)}
                                className={`flex items-center gap-3 p-3 rounded hover:bg-violet-100 hover:text-violet-500 cursor-pointer ${
                                    active === item.id
                                        ? "bg-violet-500 text-white"
                                        : ""
                                }`}
                            >
                                <span>{item.icon}</span>
                                <span>{item.title}</span>
                            </li>
                        </Link>
                    )
                )}
            </ul>
        </div>
    );
};

export default Sidebar;
