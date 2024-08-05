import { findUserEmailRepo } from "../repositories/user.repository.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new apiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.USER_SECRET);
    const user = await findUserEmailRepo(decodedToken);
    if (!user) {
      throw new apiError(401, "Invalid access token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new apiError(401, "Invalid access token");
  }
});
