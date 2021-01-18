import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import passport from "passport";


export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await getRepository(User).find();
        console.log(users);
        res.json(users);
    } catch (e) {
        res.status(404).json({message: e.message});
        throw new Error(e);
    }
}

export const getUser = async (req: Request, res: Response) => {}

export const updateUser = async (req: Request, res: Response) => {}

export const deleteUser = async (req: Request, res: Response) => {}

export const createUser = async (req: Request, res: Response) => {
    const users = await getRepository(User).find();

    const user = new User();
    if (req.query) {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;
    }

    try {
        user.save();
        res.json({ 
            state: 200, 
            message: `Sign up Success ${user.firstName} !` 
        });
        console.log(user);
    } catch (e) {
        res.status(404).json({message: e.message});
        throw new Error(e);
    }
}

export const login = async (req: Request, res: Response) => {
    if (req.user) {
        return res.send("User Exist, you need Logout first")
    }
}

export const logout = async (req: Request, res: Response) => {
    // req.logout();
    res.redirect("/login");
}