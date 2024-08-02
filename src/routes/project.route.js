import { Router } from "express";
import { createNewProject, updateProject } from "../controllers/project.controller.js";
const route=Router()

route.route('/create').post(createNewProject)
route.route('/titleUpdate').patch(updateProject)

export default route