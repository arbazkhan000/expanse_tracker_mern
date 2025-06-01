import express from "express";
import IncomeController from "../controller/income.controller.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";

const incomeRoutes = express.Router();

// add income route
incomeRoutes.post("/", AuthMiddleware, IncomeController.addIncome);

//  all income route
incomeRoutes.route("/").get(AuthMiddleware, IncomeController.getAllIncome);

// delete income route
incomeRoutes
    .route("/:id")
    .delete(AuthMiddleware, IncomeController.deleteIncome);

export default incomeRoutes;
