import { Request, Response } from "express";
import { userService } from "./user.service";
import { pool } from "../../config/db";

const createUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const result = await userService.createUser(name, email)
        res.status(200).json({
            success: true,
            message: "Successfully created user",
            data: result.rows[0]
        })
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
    res.status(201).json({
        success: true, message: "Api is working"
    })
}
const fetchUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.fetchUser();
        res.status(200).json({
            success: true,
            message: "Successfully Users GET",
            data: result.rows
        })
    }

    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err
        })

    }
}
export const userContrllers = {
    createUser,
    fetchUser
}