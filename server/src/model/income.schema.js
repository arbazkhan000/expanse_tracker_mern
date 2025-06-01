import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
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
        source: { type: String },
    },
    { timestamps: true }
);

const Income = mongoose.model("Income", incomeSchema);

export default Income;
