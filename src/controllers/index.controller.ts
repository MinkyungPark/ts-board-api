import { Request, Response } from "express";

export const index = (req: Request, res: Response) => {
    res.send("This is API Home");
}