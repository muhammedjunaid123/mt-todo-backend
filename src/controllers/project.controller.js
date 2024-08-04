import {
  createNewProjectRepo,
  getProjectRepo,
  updateProjectRepo,
  userProjectRepo,
} from "../repositories/project.repository.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createNewProject = asyncHandler(async (req, res) => {
  const data = await createNewProjectRepo(req);
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
const userProject = asyncHandler(async (req, res) => {
  const data = await userProjectRepo(req);
  if (data) {
    res.status(200).json(new apiResponse(200, data));
  }
});
const getProject = asyncHandler(async (req, res) => {
  const data = await getProjectRepo(req.query["id"]);
  if(data){
    res.status(200).json(new apiResponse(200, data));
  }
});

export { createNewProject, updateProject, userProject, getProject };
