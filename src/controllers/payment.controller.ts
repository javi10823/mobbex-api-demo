import { Request, Response } from "express";
import mobbexService from '../services/MobbexService';

export const payment = async (req:Request,res:Response)=>{
    try {
        const data = await mobbexService(req.body);
        console.log(data)
        return res.status(200).json({data:data!.payment})
    } catch (error) {
        console.log('Error in payment')
        return res.status(404).json({error})
    }
}
