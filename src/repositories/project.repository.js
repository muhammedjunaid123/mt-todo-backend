import mongoose from "mongoose";
import { projectModel } from "../models/project.model.js";
import { apiError } from "../utils/apiError.js";

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
  if (id==null) {
    throw new apiError(400, "Project ID is required");
  }
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
    {
      $addFields: {
        ListTodos: {
          $sortArray: {
            input: "$ListTodos",
            sortBy: { Status: 1 },
          },
        },
      },
    },
  ]);
  return result;
};
const removeTodo = async (projectId, todoId) => {
  return await projectModel.updateOne(
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
  removeTodo,
};
