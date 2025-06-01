import React from "react";

const Loader = () => {
    return (
        <div>
            <div className="flex gap-2 justify-center items-center py-4">
                <div className="w-4 h-4 rounded-full bg-[#EA7070] animate-bounce [animation-delay:0s]" />
                <div className="w-4 h-4 rounded-full bg-green-500 animate-bounce [animation-delay:0.2s]" />
                <div className="w-4 h-4 rounded-full bg-[#EA7070] animate-bounce [animation-delay:0.4s]" />
                <div className="w-4 h-4 rounded-full bg-green-500 animate-bounce [animation-delay:0.6s]" />
            </div>
        </div>
    );
};

export default Loader;
