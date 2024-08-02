import {
  createNewProjectRepo,
  updateProjectRepo,
} from "../repositories/project.repository.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createNewProject = asyncHandler(async (req, res) => {
  const data = await createNewProjectRepo(req.body);
  if (data) {
    res.status(201).json(new apiResponse(201));
  }
});
const updateProject = asyncHandler(async (req, res) => {
  const data = await updateProjectRepo(req.body);
  if (data) {
    res.status(200).json(new apiResponse(200));
  }
});

export { createNewProject, updateProject };