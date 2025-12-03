import { Request, Response } from "express";
import { userService } from "./user.service";

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
export const userContrllers = {
    createUser
}