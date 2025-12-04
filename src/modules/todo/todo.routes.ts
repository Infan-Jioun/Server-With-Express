import express from "express";
import { todoController } from "./todo.controller";
const router = express.Router();

router.post("/", todoController.todoCreate)
router.get("/", todoController.fetchTodo)
export const todoRoutes = router;