import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import  config  from "../config";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("No autenticado, no hay JWT");
    return res.json(401).json({ error });
  }
  const token = authHeader.split(" ")[1];
  let revisarToken;
  try {
    revisarToken = jwt.verify(token, config.secret);
  } catch (error) {
    return res.status(401).json({ error });
  }

  if (!revisarToken) {
    const error = new Error("No autenticado");
    throw error;
  }

  next();
};
