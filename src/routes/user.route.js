import { Router } from "express";
import {  userRegister } from "../controllers/user.controller.js";

const route = Router();

route.route("/register").post(userRegister);

export default route;
