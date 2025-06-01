import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col   ">
            {/* Top Navbar */}
            <Navbar />

            {/* Sidebar + Outlet */}
            <div className="flex flex-1 ">
                {/* Sidebar */}
                <Sidebar />

                {/* Main content */}
                <main className="flex-1 w-full bg-gray-100 p-5 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Home;
