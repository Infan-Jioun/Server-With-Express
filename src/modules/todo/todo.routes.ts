import express from "express";
import { todoController } from "./todo.controller";
const router = express.Router();

router.post("/", todoController.todoCreate)
router.get("/", todoController.fetchTodo)
router.get("/:id", todoController.singelTodo)
router.put("/:id", todoController.updateTodo)
export const todoRoutes = router;