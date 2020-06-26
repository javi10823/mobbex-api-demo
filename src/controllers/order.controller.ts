import { Request, Response } from "express";
import { Order } from "../entity/Order";

export const getOrders = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (e) {
    console.log("An error appeared", e);
    return res.status(404).json({ error: "Order not found" });
  }
};

export const getOneOrder = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const order = await Order.findOne(req.params.id);
    if (!order) return res.status(404).json({error:"The Order doesn't exists"})
    return res.status(200).json(order);
  } catch (e) {
    console.log("An error appear", e);
    return res.status(404).json({ error: "Order not found" });
  }
};

export const createOrder = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {total,payment,client,products} = req.body
  try {
     await Order.insert({
      total,
      payment,
      client,
      products
    });
    return res.status(200).json({ message: "Order saved "});
  } catch (e) {
    console.log("An error appeared", e);
    return res.status(404).json({ error: "An error appeared while trying to create a Order " });
  }
};

export const updateOrder = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await Order.update(req.params.id, req.body);
    const order = await Order.findOne(req.params.id)
    return res.status(200).json(order);
  } catch (e) {
    console.log("An error appeared", e);
    return res.status(404).json({ error: "Unmodified Order", e });
  }
};

export const deleteOrder= async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const results = await Order.delete(req.params.id);
    return res.status(200).json({message:"Order successfully removed", data: results});
  } catch (e) {
    console.log("An error appeared");
    return res.status(404).json({ error: "An error appeared while trying to delete the Order" });
  }
};
