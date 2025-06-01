import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdCard } from "react-icons/io";
import FinanceOverView from "../../components/FinanceOverView";
import Loader from "../../components/Loader";
import RecentTransactions from "../../components/RecentTransactions";
import UserInfoCard from "../../components/UserInfoCard";
import axiosInstance from "../../service/axiosInstance";

const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [totalBalance, setTotalBalance] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpanse] = useState(0);
    const [transactions, setTransactions] = useState([]);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.get("auth/dashboard", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });


            setTotalBalance(data?.totalBalance || 0);
            setTotalIncome(data?.totalIncome || 0);
            setTotalExpanse(data?.totalExpanse || 0);
            setTransactions(data?.recentTransactions || []);
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    "Dashboard data fetch failed. Please try again."
            );
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <>
            <div className="space-y-5 flex flex-col w-full my-5 bg-gray-100 overflow-y-auto">
                <UserInfoCard
                    icon={<IoMdCard size={30} />}
                    label={"Total Balance"}
                    value={totalBalance}
                    color={"bg-violet-500"}
                />
                <UserInfoCard
                    icon={<IoMdCard size={30} />}
                    label={"Total Income"}
                    value={totalIncome}
                    color={"bg-green-500"}
                />
                <UserInfoCard
                    icon={<IoMdCard size={30} />}
                    label={"Total Expense"}
                    value={totalExpense}
                    color={"bg-red-500"}
                />
            </div>

            <div className="flex flex-col w-full min-h-screen bg-gray-100  ">
                {/* Pass transaction data when you're ready */}

                {loading ? (
                    <Loader />
                ) : (
                    <RecentTransactions transactions={transactions} />
                )}
            </div>

            {/* Financila OverView */}
            {loading ? (
                <Loader />
            ) : (
                <FinanceOverView
                    totalExpense={totalExpense}
                    totalIncome={totalIncome}
                    balance={totalBalance}
                />
            )}
        </>
    );
};

export default Dashboard;
