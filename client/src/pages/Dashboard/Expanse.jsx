import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import AddExpenseForm from "../../components/Expanse/AddExpenseForm";
import ExpenseChart from "../../components/Expanse/ExpenseChart";
import Loader from "../../components/Loader";
import axiosInstance from "../../service/axiosInstance";

const Expanse = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expenses, setExpenses] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);

    const fetchAllExpenses = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.get("/expanse", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (data && typeof data === 'object' && Array.isArray(data.data)) {
                setExpenses(data.data);
            } else {
                console.error("Fetched data is not in expected format:", data);
                setExpenses([]);
                toast.error("Received unexpected data format for expenses");
            }
            setError(null);
        } catch (error) {
            console.error("Fetch expenses error:", error);
            toast.error(
                error?.response?.data?.message || "Failed to load expenses"
            );
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllExpenses();
    }, [fetchAllExpenses]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this expense?")) {
            return;
        }

        try {
            await axiosInstance.delete(`/expanse/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            toast.success("Expense deleted successfully");
            setExpenses((prev) => prev.filter((item) => item._id !== id));
        } catch (error) {
            console.error("Delete expense error:", error);
            toast.error(
                error?.response?.data?.message || "Failed to delete expense"
            );
        }
    };

    const handleEdit = (expense) => {
        setSelectedExpense(expense);
        setModalOpen(true);
    };

    const handleAddExpense = (newExpense) => {
        if (selectedExpense) {
            // Update existing expense
            setExpenses((prev) =>
                prev.map((item) =>
                    item._id === selectedExpense._id ? newExpense : item
                )
            );
        } else {
            // Add new expense
            setExpenses((prev) => [newExpense, ...prev]);
        }
        setModalOpen(false);
        setSelectedExpense(null);
    };

    if (loading) return <Loader />;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
                <button
                    onClick={() => {
                        setSelectedExpense(null);
                        setModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 transition"
                >
                    <IoMdAdd size={18} />
                    Add Expense
                </button>
            </div>

            {expenses.length > 0 && (
                <div className="shadow mb-8">
                    <ExpenseChart
                        data={expenses.map((item) => ({
                            name: item.category,
                            amount: item.amount,
                        }))}
                    />
                </div>
            )}

            <div className="p-4">
                {error ? (
                    <div className="bg-red-50 p-4 rounded-md">
                        <p className="text-red-500 font-medium">
                            Error loading expenses
                        </p>
                        <p className="text-red-400 mt-1">{error}</p>
                        <button
                            onClick={fetchAllExpenses}
                            className="mt-2 text-sm bg-red-100 text-red-600 px-3 py-1 rounded"
                        >
                            Retry
                        </button>
                    </div>
                ) : expenses.length === 0 ? (
                    <div className="flex items-center justify-center flex-col py-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-600 text-lg font-medium">
                            No expense records found
                        </p>
                        <p className="text-gray-500 mt-2">
                            Add your first expense to get started
                        </p>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="my-6 flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 transition"
                        >
                            <IoMdAdd size={18} />
                            Add Expense
                        </button>
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {expenses
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            ?.map((e) => (
                                <li
                                    key={e._id}
                                    className="bg-white cursor-pointer shadow p-4 rounded-md flex justify-between items-center hover:shadow-md transition"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <p className="font-medium">
                                                {e.title}
                                            </p>
                                            {e.description && (
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {e.description}
                                                </p>
                                            )}
                                            <p className="text-sm text-gray-500">
                                                {new Date(
                                                    e.date
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <span className="text-[#EA7070] font-semibold whitespace-nowrap">
                                            - ₹
                                            {Number(e.amount).toLocaleString(
                                                "en-IN"
                                            )}
                                        </span>
                                        <div className="flex space-x-2">
                                            <MdEdit
                                                className="text-gray-500 text-xl cursor-pointer hover:text-violet-600 transition"
                                                onClick={() => handleEdit(e)}
                                            />
                                            <MdDelete
                                                className="text-[#EA7070] text-xl cursor-pointer hover:text-red-700 transition"
                                                onClick={() =>
                                                    handleDelete(e._id)
                                                }
                                            />
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                )}
            </div>

            <AddExpenseForm
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedExpense(null);
                }}
                onSave={handleAddExpense}
                expense={selectedExpense}
            />
        </div>
    );
};

export default Expanse;
