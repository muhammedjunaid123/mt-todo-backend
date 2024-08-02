import { Router } from "express";
import { createNewProject } from "../controllers/project.controller.js";
const route=Router()

route.route('/create').post(createNewProject)

export default route