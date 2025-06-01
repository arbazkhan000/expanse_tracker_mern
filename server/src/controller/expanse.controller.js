import mongoose from "mongoose";
import xlsx from "xlsx";
import Expanse from "../model/expanse.schema.js";

const ExpanseController = {
    // add expence controller
    addExpanse: async (req, res) => {
        try {
            const { title, amount, category, description, date } = req.body;

            const userId = req.user._id;

            if (!title || !category || !amount || !description) {
                return res
                    .status(400)
                    .json({ message: "All fields are required" });
            }

            const expanse = new Expanse({
                title,
                amount,
                category,
                description,
                date: date || Date.now(),
                userId,
            });

            await expanse.save();
            res.status(201).json({
                message: "Expanse added successfully",
                data: expanse,
            });
        } catch (error) {
            console.error("Error adding expanse:", error);
            res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    },

    // get all expence controller
    getAllExpanse: async (req, res) => {
        try {
            const userId = req.user._id;
            const expanse = await Expanse.find({ userId }).sort({ date: -1 });

            //  total expanse calculation

            const totalExpanse = expanse.reduce((acc, expanse) => {
                return acc + expanse.amount;
            }, 0);

            res.status(200).json({
                success: true,
                data: expanse,
                total: totalExpanse,
            });
        } catch (error) {
            console.error("Error fetching expanse:", error);
            res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    },

    // delete expanse controller
    deleteExpanse: async (req, res) => {
        try {
            const { id } = req.params;
            const expanse = await Expanse.findByIdAndDelete(id);
            if (!expanse) {
                return res.status(404).json({ message: "Expanse not found" });
            }
            res.status(200).json({ message: "Expanse deleted successfully" });
        } catch (error) {
            console.error("Error deleting expanse:", error);
            res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    },

};

export default ExpanseController;
