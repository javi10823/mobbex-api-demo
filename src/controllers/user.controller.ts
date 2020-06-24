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
    console.log("Ocurrio un error al buscar usuarios", e);
    return res.status(404).json({ error: "Usuarios no encontrados" });
  }
};

export const getOneUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await User.findOne(req.params.id);
    if (!user) return res.status(404).json({error:"el usuario no existe"})
    return res.status(200).json(user);
  } catch (e) {
    console.log("Ocurrio un error al buscar el usuario", e);
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {email,name,lastname,password} = req.body
  try {
    const userExist = await User.findOne({email: req.body.email})
    if (userExist) return res.status(404).json({error:"El usuario ya existe"})
    const passwordHashed =  await bcrypt.hash(password, 10)
     await User.insert({
      email,
      name,
      lastname,
      password:passwordHashed
    });
    return res.status(200).json({ message: "Usuario creado con exito"});
  } catch (e) {
    console.log("Ocurrio un error al crear usuario", e);
    return res.status(404).json({ error: "Error al crear usuario" });
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
    console.log("Ocurrio un error al buscar usuarios", e);
    return res.status(404).json({ error: "Usuarios no modificado", e });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const results = await User.delete(req.params.id);
    return res.status(200).json({message:"Usuario eliminado con exito", data: results});
  } catch (e) {
    console.log("Ocurrio un error al intentar eliminar usuario");
    return res.status(404).json({ error: "Error al eliminar" });
  }
};
