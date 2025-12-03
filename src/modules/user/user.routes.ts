import express, { Request, Response } from 'express';
import { pool } from '../../config/db';
import logger from '../../middlewere';
import { userContrllers } from './user.controller';
const router = express.Router();
// app.use("/users", userRoutes)
// routes -> controller -> service
router.post("/", logger, userContrllers.createUser)

router.put("/id", logger, async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const result = await pool.query(
            `UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`
        )
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
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.mesaage
        })
    }
})

export const userRoutes = router; 