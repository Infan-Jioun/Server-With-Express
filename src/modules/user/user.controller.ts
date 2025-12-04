import { Request, Response } from "express";
import { userService } from "./user.service";
import { pool } from "../../config/db";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.createUser(req.body)
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
const fetchSingelUser = async (req: Request, res: Response) => {
    // console.log(req.params.id);
    // res.send({ messsge: "Successfully Api Work" })
    try {
        const result = await userService.fetchSingelUser(req.params.id!)
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User Not Found "
            })
        } else {
            res.status(201).json({
                success: true,
                message: "User find successfully",
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
const putUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const result = await userService.putUser(name, email, req.params.id as string)
        // console.log(result);
        if (result.rows.length === 0) {
            res.status(400).json({
                success: false,
                message: "Do not Update"
            })

        } else {
            res.status(201).json({
                success: true,
                message: `Succesfully ${name} and ${email} update `,
                data: result.rows[0]
            })
        }
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
// console.log(putUser);
const deletedUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.deletedUser(req.params.id as string)

        if (result.rowCount === 0) {
            res.status(400).json({
                success: false,
                message: "User not found"
            })
        } else {
            res.status(201).json({
                success: true,
                message: `User Deleted Successfully`,
                data: null
            })
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

}


export const userControllers = {
    createUser,
    fetchUser,
    fetchSingelUser,
    putUser,
    deletedUser
}