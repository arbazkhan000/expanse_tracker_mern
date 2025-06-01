import bcrypt from "bcryptjs";
import User from "../model/user.schema.js";

import jwt from "jsonwebtoken";
import Expanse from "../model/expanse.schema.js";
import Income from "../model/income.schema.js";

const TokenGenerater = async (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
    });
};

const AuthController = {
    // Create User (Register)
    register: async (req, res) => {
        const { name, email, password } = req.body;

        try {
            // Validate input
            if (!name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required",
                });
            }

            // Check if the user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Email already registered",
                });
            }

            // Create new user
            const newUser = await User.create({
                name,
                email,
                password,
            });

            // token send
            const token = await TokenGenerater({
                id: newUser._id,
            });

            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                user: newUser,
                token: token,
            });
        } catch (error) {
            console.error("Error in register user:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    },

    // User Login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Validate input
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required",
                });
            }

            // Check if the user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials",
                });
            }

            // Verify password
            const isMatchPassword = await bcrypt.compare(
                password,
                user.password
            );
            if (!isMatchPassword) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials",
                });
            }

            // Generate token
            const token = await TokenGenerater({
                id: user._id,
            });

            return res.json({
                success: true,
                message: `Login successful ${user.name} welcome back`,
                user: user,
                token,
            });
        } catch (error) {
            console.error("Error in user login:", error);
            return res.status(500).json({
                success: false,
                message: "Login failed",
                error: error.message,
            });
        }
    },

    // Get User Profile
    viewUserProfile: async (req, res) => {
        try {
            const user = await User.findById(req.user);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            return res.status(200).json({
                success: true,
                message: "User profile retrieved successfully",
                user: user,
            });
        } catch (error) {
            console.error("Error in retrieving user profile:", error);
            return res.status(500).json({
                success: false,
                message: "Profile retrieval failed",
                error: error.message,
            });
        }
    },

    userDashboard: async (req, res) => {
        try {
            const user = await User.findById(req.user);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            // Get all incomes and expenses for totals
            const incomes = await Income.find({ userId: user._id });
            const expanses = await Expanse.find({ userId: user._id });

            const totalIncome = incomes.reduce(
                (acc, income) => acc + income.amount,
                0
            );
            const totalExpanse = expanses.reduce(
                (acc, exp) => acc + exp.amount,
                0
            );

            // Calculate total balance
            const totalBalance = totalIncome - totalExpanse;

            // Get last 10 transactions (income + expanse), sorted by date descending
            const allTransactions = [
                ...incomes.map((i) => ({ ...i._doc, type: "income" })),
                ...expanses.map((e) => ({ ...e._doc, type: "expanse" })),
            ];
            allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
            const recentTransactions = allTransactions.slice(0, 10);

            return res.status(200).json({
                success: true,
                message: "User dashboard retrieved successfully",
                totalIncome,
                totalExpanse,
                totalBalance,

                recentTransactions,
            });
        } catch (error) {
            console.error("Error in user dashboard:", error);
            return res.status(500).json({
                success: false,
                message: "Dashboard retrieval failed",
                error: error.message,
            });
        }
    },
};

export default AuthController;
