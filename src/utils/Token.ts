import jwt from "jsonwebtoken";
import  config  from "../config";
import { User } from "../entity/User";

export const newToken = (user: User) => {
  return jwt.sign({ id: user.id  }, config.secret, {
    expiresIn: 60 * 60 * 24,
  });
};

