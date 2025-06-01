import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const FinanceOverView = ({ totalExpense, totalIncome, balance }) => {

    const data = [
        { name: "Income", value: totalIncome },
        { name: "Expense", value: totalExpense },
        { name: "Balance", value: balance },
    ];

    const COLORS = ["#00C49F", "#EA7070", "#8E52FF"];

    return (
        <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">
                Finance Overview
            </h2>
            <div className="w-full h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default FinanceOverView;
