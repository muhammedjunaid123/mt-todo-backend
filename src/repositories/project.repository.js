import mongoose from "mongoose";
import { projectModel } from "../models/project.model.js";

const createNewProjectRepo = async (data) => {
  const { Title } = data.body;
  const { _id } = data.user;
  const project = new projectModel({
    Title: Title,
    userId: _id,
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
const userProjectRepo = async (req) => {
  const { _id } = req.user;
  return await projectModel.find({ userId: _id });
};
const getProjectRepo = async (id) => {
  id = new mongoose.Types.ObjectId(id);

  const result = await projectModel.aggregate([
    {
      $match: { _id: id },
    },
    {
      $lookup: {
        from: "todos",
        localField: "ListTodos",
        foreignField: "_id",
        as: "ListTodos",
      },
    },
  ]);

  return result;
};
const removeTodo = async (projectId, todoId) => {
  const result = await projectModel.updateOne(
    { _id: projectId },
    { $pull: { ListTodos: todoId } }
  );
};
export {
  createNewProjectRepo,
  updateProjectRepo,
  updateProjectTodoList,
  userProjectRepo,
  getProjectRepo,
  removeTodo
};
