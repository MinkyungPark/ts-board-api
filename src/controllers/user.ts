import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";


export const testGet = async (req: Request, res: Response) => {
    try {
        const users = await getRepository(User).find();
        console.log(users);
        res.json(users);
    } catch (e) {
        res.status(404).json({message: e.message});
        throw new Error(e);
    }
}

export const testPost = async (req: Request, res: Response) => {
    const users = await getRepository(User).find();

    const user = new User();
    // user.firstName
    // user.lastName
    // user.email
    try {
        user.save();
        res.json({ state: 200 });
    } catch (e) {
        res.status(404).json({message: e.message});
        throw new Error(e);
    }
}