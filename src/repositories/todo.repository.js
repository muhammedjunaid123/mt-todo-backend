import { todoModel } from "../models/todo.model.js";
import { updateProjectTodoList } from "./project.repository.js";

const createTodoRepo = async (data) => {
  const { Description, projectId } = data;
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

export { createTodoRepo,updateTodoRepo };
