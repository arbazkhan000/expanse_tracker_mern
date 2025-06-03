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
        setLoading(true);
        try {
            const { data } = await axiosInstance.get("/income", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            console.log("Fetched income data:", data);

            if (data && Array.isArray(data.data)) {
                setIncomes(data.data);
            } else if (data && data.data === null) {
                setIncomes([]);
                console.warn("API returned null data, treated as empty");
            } else {
                setIncomes([]);
                console.error("Income API format issue:", data);
            }

            setError(null);
        } catch (error) {
            console.error("Fetch income error:", error);
            
            setError(error.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            toast.error("Please log in to view your income records");
        } else {
            fetchAllIncome();
        }
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
            console.error("Delete income error:", error);
            toast.error("Failed to delete income");
        }
    };

    const handleAddIncome = (newIncome) => {
        const incomeToAdd = {
            ...newIncome,
            _id: newIncome._id || Date.now(),
            icon: newIncome.icon || "💰",
        };
        setIncomes((prev) => [...prev, incomeToAdd]);
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
                            name: item.category || "Unknown",
                            amount: Number(item.amount) || 0,
                        }))}
                    />
                </div>
            )}

            {/* Error or Empty */}
            <div className="p-4">
                {error ? (
                    <div>
                        {" "}
                        <p className="text-red-500">Error: {error}</p>
                    </div>
                ) : incomes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8">
                        <p className="text-lg font-medium text-gray-600">
                            No income records found
                        </p>
                        <p className="mt-2 text-gray-500">
                            Add your first income to get started
                        </p>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="my-6 flex items-center gap-2 rounded bg-violet-600 px-4 py-2 text-white hover:bg-violet-700 transition"
                        >
                            <IoMdAdd size={18} />
                            Add Income
                        </button>
                    </div>
                ) : (
                    <ul className="space-y-2">
                        {incomes.map((income) => (
                            <li
                                key={income._id}
                                className="group flex items-center justify-between rounded-md bg-white p-3 shadow"
                            >
                                <div>
                                    <p className="font-medium">
                                        {income.title || "Untitled"}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {income.source || "Unknown Source"}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(
                                            income.date
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="font-semibold text-green-500">
                                        + ₹
                                        {Number(income.amount).toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>
                                    <MdDelete
                                        className="hidden cursor-pointer text-xl text-red-500 transition group-hover:block"
                                        onClick={() => handleDelete(income._id)}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Modal Form */}
            <AddIncomeForm
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleAddIncome}
            />
        </div>
    );
};

export default Income;
