import { Request, Response } from "express";
import { Category } from "../entity/Category";

export const getCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (e) {
    console.log("An error appeared", e);
    return res.status(404).json({ error: "Category not found" });
  }
};

export const getOneCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const category = await Category.findOne(req.params.id);
    if (!category) return res.status(404).json({error:"The Category doesn't exists"})
    return res.status(200).json(category);
  } catch (e) {
    console.log("An error appear", e);
    return res.status(404).json({ error: "Category not found" });
  }
};

export const createCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {name,description} = req.body
  try {
    const categoryExist = await Category.findOne({name: req.body.name})
    if (categoryExist) return res.status(404).json({error:"The Category already exists"})
     await Category.insert({
      name,
      description,
    });
    return res.status(200).json({ message: "Category saved "});
  } catch (e) {
    console.log("An error appeared", e);
    return res.status(404).json({ error: "An error appeared while trying to create a Category " });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await Category.update(req.params.id, req.body);
    const category = await Category.findOne(req.params.id)
    return res.status(200).json(category);
  } catch (e) {
    console.log("An error appeared", e);
    return res.status(404).json({ error: "Unmodified Category", e });
  }
};

export const deleteCategory= async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const results = await Category.delete(req.params.id);
    return res.status(200).json({message:"Category successfully removed", data: results});
  } catch (e) {
    console.log("An error appeared");
    return res.status(404).json({ error: "An error appeared while trying to delete the Category" });
  }
};
