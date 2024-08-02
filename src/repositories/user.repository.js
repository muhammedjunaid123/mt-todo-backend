import { userModel } from "../models/user.model.js";

// this add user data to db
const userRegisterRepo = async (email, hashePassword) => {
  const user = new userModel({
    email: email,
    password: hashePassword,
  });
  return await user.save();
};

//this will find user data with email
const findUserEmailRepo = async (email) => {
  return await userModel.findOne({ email: email });
};

export { userRegisterRepo, findUserEmailRepo };
