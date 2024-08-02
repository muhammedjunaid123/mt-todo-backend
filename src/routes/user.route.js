import { Router } from "express";
import { userLogin, userRegister } from "../controllers/user.controller.js";

const route = Router();

route.route("/register").post(userRegister);
route.route("/login").post(userLogin);

export default route;
