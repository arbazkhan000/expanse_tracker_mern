import jwt from "jsonwebtoken";
import User from "../model/user.schema.js";

export const AuthMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: " token is required !",
            });
        }

        // Verify token
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }

            // Find user by ID from decoded token
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Attach user to request object
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({
            message: "Authentication failed",
            error: true,
            success: false,
        });
    }
};


