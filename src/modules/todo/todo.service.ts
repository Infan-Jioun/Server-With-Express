import { pool } from "../../config/db";

const createTodo = async (payload: Record<string, unknown>) => {
    const { user_id, title } = payload;
    const result = await pool.query(
        `INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`,
        [user_id, title]
    );
    return result
}
const fetchTodo = async () => {
    const result = await pool.query(
        `SELECT * FROM todos`
    )
    return result;
}
const singelTodo = async (id: string) => {
    const result = await pool.query(
        `SELECT * FROM todos WHERE id = $1 `, [id]
    )
    return result
}
const todoService = {
    createTodo,
    fetchTodo,
    singelTodo
}
export default todoService;