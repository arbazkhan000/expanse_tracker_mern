import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import AddIncomeForm from "./AddIncomeForm";

const IncomeChart = ({ data }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleAddExpense = (newExpense) => {
        const formatted = {
            name: new Date(newExpense.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
            }), // e.g., "14 Feb"
            amount: Number(newExpense.amount),
        };

        //  setData((prev) => [...prev, formatted]);
        setModalOpen(false);
    };
    return (
        <div>
            <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-xl shadow-md">
                {/* Header & Create Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <div className="text-center md:text-left">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-violet-600">
                            Income Overview
                        </h2>
                        <p className="text-sm text-gray-600 mt-1 max-w-md">
                            Track your spending trends over time and gain
                            insights into where your money goes.
                        </p>
                    </div>

                    {/* Add Expense Button */}
                    <button
                        onClick={() => setModalOpen(true)}
                        className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 transition"
                    >
                        <IoMdAdd size={18} />
                        Add Income
                    </button>
                </div>

                {/* Modal Form */}
                <AddIncomeForm
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={handleAddExpense}
                />

                {/* Bar Chart */}
                <div className="w-full h-[300px] sm:h-[400px] md:h-[450px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="amount"
                                fill="#f87171"
                                name="Amount Spent"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default IncomeChart;
