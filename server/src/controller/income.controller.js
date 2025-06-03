import Income from "../model/income.schema.js";

const IncomeController = {
    // get All Income in databse check
    getAllIncome: async (req, res) => {
        try {
            const userId = req.user._id;

            const income = await Income.find({ userId }).sort({
                createdAt: -1,
            });

            if (!income || income.length > 0) {
                return res.status(200).json({
                    success: true,
                    message: "No income found",
                   
                });
            }

            return res.status(200).json({
                success: true,
                message: "Income retrieved successfully",
                data: income,
            });
        } catch (error) {
            console.error("Error in getAllIncome:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    },

    // addIncome in databse create

    addIncome: async (req, res) => {
        try {
            const userId = req.user._id;

            const { title, amount, category, source, description } = req.body;

            if (!title || !amount || !category) {
                return res.status(400).json({
                    success: false,
                    message: "Please fill all required fields (Title, Amount, Category)",
                });
            }
            const income = await Income.create({
                userId,
                title,
                amount,
                category,
                source,
                description,
            });

            return res.status(201).json({
                success: true,
                message: "Income created successfully",
                data: income,
            });
        } catch (error) {
            console.error("Error in addIncome:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    },

    // delete Income in databse
    deleteIncome: async (req, res) => {
        try {
            const userId = req.user._id;
            const { id } = req.params;

            const income = await Income.findOneAndDelete({
                _id: id,
                userId,
            });
            if (!income) {
                return res.status(404).json({
                    success: false,
                    message: "Income not found",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Income deleted successfully",
            });
        } catch (error) {
            console.error("Error in deleteIncome:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    },
};

export default IncomeController;
