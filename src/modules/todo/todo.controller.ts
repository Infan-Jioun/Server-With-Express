import { Request, Response } from "express";
import { pool } from "../../config/db";
import todoService from "./todo.service";

const todoCreate = async (req: Request, res: Response) => {
    try {
        const result = await todoService.createTodo(req.body)
        // console.log(result);
        res.status(201).json({
            success: true,
            message: "TodoS Created ",
            data: result.rows[0]
        })
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const fetchTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoService.fetchTodo();
        res.status(201).json({
            success: true,
            massage: "Fetch Todos",
            data: result.rows
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err
        })
    }
}
export const todoController = {
    todoCreate,
    fetchTodo
}