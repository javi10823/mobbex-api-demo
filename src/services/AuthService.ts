import { Request, Response } from "express";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import { newToken } from "../utils/Token";

export const authService = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).send("Usuario no existe");
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ auth: false, token: null });
  }
  const token = newToken(user);
  res.status(200).json({ token: token });
};

