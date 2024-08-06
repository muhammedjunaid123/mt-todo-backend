import { todoModel } from "../models/todo.model.js";
import { apiError } from "../utils/apiError.js";
import { removeTodo, updateProjectTodoList } from "./project.repository.js";

const createTodoRepo = async (data) => {
  const { Description, projectId } = data;
  if (!Description | !projectId || Description == "" || projectId == "") {
    throw new apiError(400, "Invalid data");
  }
  const todo = new todoModel({
    Description: Description,
  });
  const result = await todo.save();
  await updateProjectTodoList(projectId, result._id);
  return result;
};
const updateTodoRepo = async (data) => {
  const { Description, Status, _id } = data;
  return await todoModel.findByIdAndUpdate(
    { _id: _id },
    { $set: { Description: Description, Status: Status } }
  );
};
const deleteTodoRepo = async (data) => {
  const { id, projectId } = data;
  await removeTodo(projectId, id);
  return await todoModel.deleteOne({ _id: id });
};

export { createTodoRepo, updateTodoRepo, deleteTodoRepo };
