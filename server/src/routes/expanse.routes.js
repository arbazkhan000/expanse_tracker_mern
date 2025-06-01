import express from "express";
import ExpanseController from "../controller/expanse.controller.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";

const expanseRoutes = express.Router();

//  add expence route
expanseRoutes.post("/", AuthMiddleware, ExpanseController.addExpanse);

//  all expence route
expanseRoutes.get("/", AuthMiddleware, ExpanseController.getAllExpanse);

// delete expence route
expanseRoutes.delete("/:id", AuthMiddleware, ExpanseController.deleteExpanse);



export default expanseRoutes;
