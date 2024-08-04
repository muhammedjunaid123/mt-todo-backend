import { Router } from "express";
import {
  createNewProject,
  exportGist,
  getProject,
  updateProject,
  userProject,
} from "../controllers/project.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const route = Router();
route.use(verifyJWT);
route.route("/create").post(createNewProject);
route.route("/titleUpdate").patch(updateProject);
route.route("/getUserProject").get(userProject);
route.route('/getProject').get(getProject)
route.route('/exportToGist').get(exportGist)

export default route;
