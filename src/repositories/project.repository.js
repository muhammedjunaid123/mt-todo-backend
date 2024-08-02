import { projectModel } from "../models/project.model.js";

const createNewProjectRepo = async (data) => {
  const { Title, userId } = data;
  const project = new projectModel({
    Title: Title,
    userId: userId,
  });
  return await project.save();
};
const updateProjectRepo = async (data) => {
  const { id, Title } = data;
  return await projectModel.findByIdAndUpdate(
    { _id: id },
    { $set: { Title: Title } },
    { upsert: true }
  );
};
const updateProjectTodoList = async (projectId, id) => {
  return await projectModel.findByIdAndUpdate(
    { _id: projectId },
    { $push: { ListTodos: id } }
  );
};
export { createNewProjectRepo, updateProjectRepo,updateProjectTodoList };
