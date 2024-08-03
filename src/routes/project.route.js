import { Router } from "express";
import {
  createNewProject,
  updateProject,
} from "../controllers/project.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
const route = Router();
route.use(verifyJWT);
route.route("/create").post(createNewProject);
route.route("/titleUpdate").patch(updateProject);

export default route;
