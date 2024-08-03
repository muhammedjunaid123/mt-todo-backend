import { Router } from "express";
import { createTodo, updateTodo } from "../controllers/todo.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const route=Router()
route.use(verifyJWT);
route.route('/create').post(createTodo)
route.route('/update').patch(updateTodo)

export default route