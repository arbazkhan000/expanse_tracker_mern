import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import IncomeChart from "../../components/Income/IncomeChart";
import Loader from "../../components/Loader";
import axiosInstance from "../../service/axiosInstance";

const Income = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [incomes, setIncomes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const fetchAllIncome = async () => {
        try {
            const { data } = await axiosInstance.get("/income", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log("Fetched Income Data:", data);

            if (data && typeof data === "object" && Array.isArray(data.data)) {
                setIncomes(data.data);
            } else {
                setIncomes([]);
                toast.error("Received unexpected data format for expenses");
            }
            setError(null);
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Something went wrong"
            );
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllIncome();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/income/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            toast.success("Income deleted successfully");
            setIncomes((prev) => prev.filter((item) => item._id !== id));
        } catch (error) {
            toast.error("Failed to delete income");
            console.log(error.message);
        }
    };

    const handleAddExpense = (newExpense) => {
        const newIncome = {
            ...newExpense,
            _id: newExpense._id || Date.now(),
            icon: newExpense.icon || "💰",
        };
        setIncomes((prev) => [...prev, newIncome]);
        setModalOpen(false);
    };

    if (loading) return <Loader />;

    return (
        <div className="space-y-6">
            {/* Chart */}
            {incomes.length > 0 && (
                <div className="shadow">
                    <IncomeChart
                        data={incomes.map((item) => ({
                            name: item.category,
                            amount: item.amount,
                        }))}
                    />
                </div>
            )}

            {/* Error or Empty State */}
            <div className="p-4">
                {error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : incomes.length === 0 ? (
                    <div className="flex items-center justify-center flex-col py-8">
                        <p className="text-gray-600 text-lg font-medium">
                            No income records found
                        </p>
                        <p className="text-gray-500 mt-2">
                            Add your first income to get started
                        </p>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="my-6 flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 transition"
                        >
                            <IoMdAdd size={18} />
                            Add Income
                        </button>

                        <AddIncomeForm
                            isOpen={modalOpen}
                            onClose={() => setModalOpen(false)}
                            onSave={handleAddExpense}
                        />
                    </div>
                ) : (
                    <ul className="space-y-2">
                        {incomes.map((income) => (
                            <li
                                key={income._id}
                                className="bg-white shadow p-3 rounded-md flex justify-between items-center group"
                            >
                                <div>
                                    <p className="font-medium">
                                        {income.title || "Unknown title"}
                                    </p>
                                    <p className="font-sm text-gray-500">
                                        {income.source || "Unknown Source"}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {new Date(
                                            income.date
                                        ).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <span className="text-green-500 font-semibold">
                                        + ₹
                                        {Number(income.amount).toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>
                                    <MdDelete
                                        className="text-red-500 text-xl cursor-pointer hidden group-hover:block transition"
                                        onClick={() => handleDelete(income._id)}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Income;
