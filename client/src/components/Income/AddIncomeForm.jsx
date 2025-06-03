import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../service/axiosInstance";

const AddIncomeForm = ({ isOpen, onClose, onSave }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "",
        source: "",
        description: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Client-side validation for amount
        const parsedAmount = Number(formData.amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            setError("Amount must be a positive number.");
            setLoading(false);
            return;
        }

        try {
            const dataToSend = { ...formData, amount: parsedAmount };
            console.log("Sending data:", dataToSend);

            const response = await axiosInstance.post("/income", dataToSend, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            onSave(formData);
            setFormData({
                title: "",
                amount: "",
                category: "",
                source: "",
                description: "",
            });
            onClose();
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error in add expense", error.message);
            setError(error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                <h2 className="text-xl font-semibold text-violet-600 mb-4">
                    Add Income
                </h2>

                {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 border rounded p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">
                            Amount
                        </label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">
                            Category
                        </label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">
                           Source
                        </label>
                        <input
                            type="text"
                            name="source"
                            value={formData.source}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 border rounded p-2"
                        />
                    </div>

                    {/* Icon Selector */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Description
                        </label>

                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="e.g. 🧑‍💻 or 💼"
                            className="w-full mt-1 border rounded p-2"
                        />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-2 text-sm text-white rounded ${
                                loading
                                    ? "bg-violet-400 cursor-not-allowed"
                                    : "bg-violet-600 hover:bg-violet-700"
                            }`}
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddIncomeForm;
