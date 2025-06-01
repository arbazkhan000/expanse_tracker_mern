import React from "react";

const UserInfoCard = ({ icon, label, color, value, className }) => {
    return (
        <div
            className={`rounded w-full bg-white p-2 flex items-center shadow ${className}`}
        >
            <span
                className={`border p-2 text-white rounded-full ${color} mr-2`}
            >
                {icon}
            </span>
            <div className=" px-5 flex flex-col">
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-sm   text-black font-medium ">
                    {" "}
                    <span className="pr-2">₹</span>
                    {value}
                </p>
            </div>
        </div>
    );
};

export default UserInfoCard;
