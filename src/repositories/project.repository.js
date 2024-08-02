import { projectModel } from "../models/project.model.js";

const createNewProjectRepo = async (data) => {
  const { Title, userId } = data;
  const project = new projectModel({
    Title: Title,
    userId: userId,
  });
  return await project.save();
};

export { createNewProjectRepo };
