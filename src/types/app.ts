import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import initDB from "../config/db";
import logger from "../middlewere/middlewere";
import { userRoutes } from "../modules/user/user.routes";
import { todoRoutes } from "../modules/todo/todo.routes";
import { authRoutes } from "../modules/auth/auth.routes";

dotenv.config({ path: path.join(process.cwd(), ".env") })
const app = express()
// parser or Middlewere
app.use(express.json())
// initialize database
initDB();
// routes AND controllers
app.get('/', logger, (req: Request, res: Response) => {
    res.send('Next Level Express Server with TypeScript!')
})
app.use("/users", userRoutes)
/// TODO API USE
app.use("/todos", logger, todoRoutes)
app.use("/auth", authRoutes)
// middlwere
// create  notfound route   
app.use((req, res) => {
    res.status(404).json({
        success: false,
        mesaage: "Route Not found ",
        path: req.path
    })
})

export default app;