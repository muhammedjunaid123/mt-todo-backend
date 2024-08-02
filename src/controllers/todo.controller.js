import {
  createTodoRepo,
  updateTodoRepo,
} from "../repositories/todo.repository.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTodo = asyncHandler(async (req, res) => {
  const data = await createTodoRepo(req.body);
  if (data) {
    res.status(201).json(new apiResponse(201));
  }
});
const updateTodo = asyncHandler(async (req, res) => {
  const data = await updateTodoRepo(req.body);
  if (data) {
    res.status(200).json(new apiResponse(200));
  }
});
export { createTodo, updateTodo };