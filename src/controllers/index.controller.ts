import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export const index = async (req: Request, res: Response) => {
  if (res.locals.userID) {
    const user: User = await getRepository(User).findOne({
      email: res.locals.userID,
    });
    res.send(`Hello ${user.firstName}, This is Index Home`);
  } else {
    res.send("No Account please login..");
  }
};
