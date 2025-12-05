import { Request, Response } from "express";
import bcrypt from "bcryptjs"
import { pool } from "../../config/db";
import jwt from "jsonwebtoken"
import config from "../../config";
const loginUser = async (email: string, password: string) => {
    console.log({ email });
    const result = await pool.query(
        `SELECT * FROM users WHERE email=$1`, [email]
    )
    if (result.rows.length === 0) {
        return null;
    }
    console.log({ result });
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    console.log({ match });
    if (!match) {
        return false;

    }

    const token = jwt.sign({ name: user.name, email: user.email, role: user.role }, config.jwtSecret as string, {
        expiresIn: "1hr"
    })
    console.log({ token, user });
    return { token, user }
}
export const authService = {
    loginUser
}