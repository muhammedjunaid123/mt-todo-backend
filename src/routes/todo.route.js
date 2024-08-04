import { Router } from "express";
import { createTodo, deleteTodo, updateTodo } from "../controllers/todo.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const route=Router()
route.use(verifyJWT);
route.route('/create').post(createTodo)
route.route('/update').patch(updateTodo)
route.route('/remove').delete(deleteTodo)
export default route