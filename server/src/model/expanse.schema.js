import mongoose from "mongoose";


const expenseSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: { type: String, required: true },
        amount: { type: Number, required: true },
        category: { type: String, required: true },
        date: { type: Date, default: Date.now },
        description: { type: String },
    },
    { timestamps: true }
);

const Expanse = mongoose.model("Expanse", expenseSchema);

export default Expanse;
