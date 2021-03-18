const User = require("../../models/user");
const bcrypt = require("bcryptjs");

const createUserData = async (userInput) => {
  const user = await userWithEncodePassword(userInput);
  return user.save();
};

const userWithEncodePassword = async({ email, id, password });
