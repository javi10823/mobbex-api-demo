import { Request, Response } from "express";
import { Product } from "../entity/Product";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (e) {
    console.log("An error appeared", e);
    return res.status(404).json({ error: "Product not found" });
  }
};

export const getOneProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await Product.findOne(req.params.id);
    if (!user) return res.status(404).json({error:"The product doesn't exists"})
    return res.status(200).json(user);
  } catch (e) {
    console.log("An error appear", e);
    return res.status(404).json({ error: "Product not found" });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {name,price,description,category} = req.body
  try {
    const productExist = await Product.findOne({name: req.body.name})
    if (productExist) return res.status(404).json({error:"The product already exists"})
     await Product.insert({
      name,
      price,
      description,
      category
    });
    return res.status(200).json({ message: "Product saved "});
  } catch (e) {
    console.log("An error appeared", e);
    return res.status(404).json({ error: "An error appeared while trying to create a product " });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await Product.update(req.params.id, req.body);
    const product = await Product.findOne(req.params.id)
    return res.status(200).json(product);
  } catch (e) {
    console.log("An error appeared", e);
    return res.status(404).json({ error: "Unmodified Product", e });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const results = await Product.delete(req.params.id);
    return res.status(200).json({message:"Product successfully removed", data: results});
  } catch (e) {
    console.log("An error appeared");
    return res.status(404).json({ error: "An error appeared while trying to delete the product" });
  }
};
