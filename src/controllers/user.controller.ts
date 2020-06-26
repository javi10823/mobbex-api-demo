import { Request, Response } from "express";
import { User } from "../entity/User";
import bcrypt from 'bcrypt'

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (e) {
    console.log("An error appear when trying to get the users", e);
    return res.status(404).json({ error: "An error appear when trying to get the users" });
  }
};

export const getOneUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await User.findOne(req.params.id);
    if (!user) return res.status(404).json({error:"User already exist"})
    return res.status(200).json(user);
  } catch (e) {
    console.log("Ocurrio un error al buscar el usuario", e);
    return res.status(404).json({ error: "User not found" });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {email,name,lastname,password,phone,address} = req.body
  try {
    const userExist = await User.findOne({email: req.body.email})
    if (userExist) return res.status(404).json({error:"User already exist"})
    const passwordHashed =  await bcrypt.hash(password, 10)
     await User.insert({
      email,
      name,
      lastname,
      password:passwordHashed,
      phone,
      address
    });
    return res.status(200).json({ message: "User saved succesfully"});
  } catch (e) {
    console.log("An error appear when trying to create an user", e);
    return res.status(404).json({ error: "An error appear when trying to create an user" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await User.update(req.params.id, req.body);
    const user = await User.findOne(req.params.id, {select:['email', "name"]})
    return res.status(200).json(user);
  } catch (e) {
    console.log("An error appear", e);
    return res.status(404).json({ error: "Unmodified User ", e });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const results = await User.delete(req.params.id);
    return res.status(200).json({message:"User deleted succesfully", data: results});
  } catch (e) {
    console.log("An error appear when trying to delete an user");
    return res.status(404).json({ error: "An error appear when trying to delete an user" });
  }
};
