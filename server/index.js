import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./src/db/db.js";
import path from "path";

dotenv.config();

const app = express();

// Middleware
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

// Routes

import authRoutes from "./src/routes/auth.routes.js";
import expanseRoutes from "./src/routes/expanse.routes.js";
import incomeRoutes from "./src/routes/income.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expanse", expanseRoutes);

app.get("/", (req, res) => {
    res.json({
        message: `Welcome to the expanse tracker api`,
        success: true,
    });
});

const ServerStart = async () => {
    const port = process.env.PORT || process.env.DEFAULT_PORT;

    try {
        await connectDB();

        await app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error.message);
        process.exit(1);
    }
};

ServerStart();
