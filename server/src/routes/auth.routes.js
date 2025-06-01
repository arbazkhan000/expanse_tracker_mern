import express from "express";
import AuthController from "../controller/auth.controller.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";

const authRoutes = express.Router();

//public routes
authRoutes.post(
    "/register",
    AuthController.register
);
authRoutes.post("/login", AuthController.login);

authRoutes.get("/profile", AuthMiddleware, AuthController.viewUserProfile);

// user dashboard

authRoutes.get("/dashboard", AuthMiddleware, AuthController.userDashboard);

export default authRoutes;
