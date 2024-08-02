import {
  userRegisterRepo,
  findUserEmailRepo,
} from "../repositories/user.repository.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";

//this will register the user to db
const userRegister = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userData = await findUserEmailRepo(email);
  if (userData) {
    throw new apiError(409, "email already used");
  }
  const salt = await bcrypt.genSalt(12);
  const hashePassword = await bcrypt.hash(password, salt);
  const result = await userRegisterRepo(email, hashePassword);
  if (result) {
    res.status(201).json(new apiResponse(201));
  }
});

export { userRegister };
