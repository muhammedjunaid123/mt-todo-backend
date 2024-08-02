import { Router } from "express";
import { createTodo, updateTodo } from "../controllers/todo.controller.js";

const route=Router()
route.route('/create').post(createTodo)
route.route('/update').patch(updateTodo)

export default route