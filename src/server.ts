import express, { NextFunction, Request, Response } from "express";
import { Pool } from "pg"
import dotenv from "dotenv";

import path from "path";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middlewere";
import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
dotenv.config({ path: path.join(process.cwd(), ".env") })
const app = express()
const port = config.port;
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

// middlwere
// create  notfound route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        mesaage: "Route Not found ",
        path: req.path
    })
})
app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})
