import React, { useEffect, useState } from "react";
import notFoundImage from "../assets/not_found.svg";

const ErrorPage = () => {
    const [timer, setTimer] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev === 1) {
                    clearInterval(interval);
                    window.location.href = "/login";
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-screen flex items-center justify-center flex-col">
            <img
                src={notFoundImage}
                alt="Not Found"
                className="md:h-[500px] object-cover"
            />
            <p className="mt-4 text-lg font-medium text-gray-700">
                You will be redirected in {timer} seconds...
            </p>
        </div>
    );
};

export default ErrorPage;
