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
const singelTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoService.singelTodo(req.params.id!);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                messgae: "Not found Todo",

            })

        }
        res.json(result.rows[0])
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.mesaage

        })
    }
}
const updateTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoService.updateTodo(req.body, req.params.id!);
        if (result.rows.length === 0) {
            res.status(400).json({
                success: false,
                message: "Not Found Todo"
            })

        } else {
            res.status(200).json({
                success: true,
                message: "Successfully update ",
                data: result.rows[0]
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
export const todoController = {
    todoCreate,
    fetchTodo,
    singelTodo,
    updateTodo
}