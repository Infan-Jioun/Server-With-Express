import express, { Request, Response } from 'express';
import { pool } from '../../config/db';
import logger from '../../middlewere';
const router = express.Router();

router.post("/", logger, async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`, [name, email]
        )
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
});

router.get("/", logger, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM users;`
        )
        res.status(200).json({
            success: true,
            message: "user fetch successfully",
            data: result.rows
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.mesaage
        })
    }
})


export const userRoutes = router; 