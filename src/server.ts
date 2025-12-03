import express, { NextFunction, Request, Response } from "express";
import { Pool } from "pg"
import dotenv from "dotenv";

import path from "path";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middlewere";
import { userRoutes } from "./modules/user/user.routes";
dotenv.config({ path: path.join(process.cwd(), ".env") })
const app = express()
const port = config.port;


// parser or Middlewere 
app.use(express.json())
// app.use(express.urlencoded())


// initialize database
initDB();
// routes AND controllers
app.get('/', logger, (req: Request, res: Response) => {
    res.send('Next Level Express Server with TypeScript!')
})

app.use("/users", userRoutes)

// USERS CRUD
// app.post("/users", async (req: Request, res: Response) => {
//     const { name, email } = req.body;
//     console.log(name);
//     try {
//         const result = await pool.query(
//             `INSERT INTO users(name , email) VALUES($1, $2) RETURNING *`,
//             [name, email]
//         )
//         // console.log(result.rows[0]);

//         res.status(201).json({
//             success: true,
//             message: "Data insrted successfully",
//             data: result.rows[0]
//         })
//     } catch (err: any) {
//         res.status(500).json({
//             success: false,
//             message: err.message
//         })
//     }
//     res.status(201).json({
//         success: true, message: "Api is Working"
//     })
// })
// app.use("/users", userRoutes)
// Get method use for all users loaded  
app.get("/users", userRoutes)
// Get use for only specific user laod or query 
app.get("/users/:id", async (req: Request, res: Response) => {
    // console.log(req.params.id);
    // res.send({ messsge: "Successfully Api Work" })
    try {
        const result = await pool.query(
            `SELECT * FROM users WHERE id = $1`, [req.params.id]
        )
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



})
app.put("/users/:id", async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const result = await pool.query(
            `UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,
            [name, email, req.params.id]
        )
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
})
// deleted method 
app.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `DELETE FROM users WHERE id = $1`, [req.params.id]
        )
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

})

/// TODO API USE
app.post("/todos", async (req: Request, res: Response) => {
    const { user_id, title } = req.body;
    // console.log(user_id, title);
    try {
        const result = await pool.query(
            `INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`, [user_id, title]
        )
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
})

app.get("/todos", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT * FROM todos`
        )
        res.status(201).json({
            success: true,
            massage: "Fetch Todos",
            data: result.rows
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

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


