import { Request, Response } from "express";
import { authService } from "./auth.service";

const createUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const result = await authService.loginUser(email, password)
        res.status(200).json({
            success: true,
            message: "Successfully Create user",
            data: result
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.mesaage
        })
    }
}
export const authController = {
    createUser   
}