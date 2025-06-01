import React, { useState } from "react";
import { LuTrendingUp, LuTrendingDown } from "react-icons/lu";
import { formatDate } from "../utils/formatDate";
import Loader from "./Loader";

const RecentTransactions = ({ transactions }) => {
    const [loading, setLoading] = useState(false);

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between rounded bg-white p-4 shadow mb-2">
                <h2 className="text-lg font-semibold">Recent Transactions</h2>
            </div>

            {/* Transaction List */}
            <div className="mt-6">
                {transactions.length === 0 && !loading && (
                    <div>
                        <Loader />
                    </div>
                )}

                {transactions.map((transaction) => {
                    
                    const isIncome = transaction.type === "income";
                    const iconClass = isIncome
                        ? "text-green-600"
                        : "text-red-600";
                    const bgClass = isIncome ? "bg-green-100" : "bg-red-100";
                    const amountClass = isIncome
                        ? "text-green-600"
                        : "text-red-600";

                    return (
                        <div
                            key={transaction._id}
                            className="min-w-full flex items-center justify-between p-4 bg-white shadow mb-2 rounded"
                        >
                            <div className="w-full flex items-center space-x-4">
                                <div
                                    className={`flex items-center justify-center w-12 h-12 rounded-full ${bgClass}`}
                                >
                                    {isIncome ? (
                                        <LuTrendingUp
                                            className={iconClass}
                                            size={24}
                                        />
                                    ) : (
                                        <LuTrendingDown
                                            className={iconClass}
                                            size={24}
                                        />
                                    )}
                                </div>

                                <div className="flex items-center justify-between w-full">
                                    <div>
                                        <h3 className="text-lg">
                                            {transaction?.title ||
                                                transaction?.source ||
                                                "Unknown"}
                                        </h3>
                                        <h3 className="text-sm text-gray-500">
                                            {transaction?.description ||
                                                transaction?.source ||
                                                "Unknown"}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Date:{" "}
                                            {formatDate(
                                                transaction?.createdAt ||
                                                    new Date()
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <p
                                            className={`text-sm font-semibold ${amountClass}`}
                                        >
                                            {isIncome ? "+" : "-"}₹
                                            {transaction?.amount || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecentTransactions;
