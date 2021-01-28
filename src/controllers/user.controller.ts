import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";
import { validate, ValidationError } from "class-validator";

interface DataStoredInToken {
  _email: string;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clientToken = req.cookies.user;
    const decoded = jwt.verify(
      clientToken,
      process.env.JWT_SECRET
    ) as DataStoredInToken;

    if (decoded) {
      res.locals.userID = decoded._email;
      next();
    } else {
      res.status(401).json({ error: "unauthorized" });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: User = new User();
    if (req.body) {
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.password = req.body.password;
    }
    const errors: ValidationError[] = await validate(user);
    if (errors.length > 0) {
      console.log("Validation Fail error : ", errors);
      next(errors);
    } else {
      user.save();
      res.json({
        state: 200,
        message: `Sign up Success ${user.firstName} !`,
      });
    }
  } catch (e) {
    console.error(e);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user: User = await getRepository(User).findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!user) {
      return res.status(404).json({ message: "Invalid Email or Password" });
    } else {
      const expiresIn = 60 * 60;
      const secret = process.env.JWT_SECRET;
      const dataStoredInToken: DataStoredInToken = {
        _email: user.email,
      };

      const token = jwt.sign(dataStoredInToken, secret, { expiresIn });

      res.cookie("user", token);
      res.status(201).json({
        result: "ok",
        token,
      });
    }
  } catch (e) {
    console.error(e);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("user", "").json({ logoutSuccess: true });
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users: User[] = await getRepository(User).find();
    res.json(users);
  } catch (e) {
    console.error(e);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const email = req.params.id;
    const user: User = await getRepository(User).findOne({ email: email });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (e) {
    console.error(e);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.params.id;
  const user = await getRepository(User).findOne({ email: email });

  if (user.email === res.locals.userID) {
    const merge: User = getRepository(User).merge(user, req.body);
    const errors: ValidationError[] = await validate(merge);
    if (errors.length > 0) {
      console.log("Validation Fail error : ", errors);
      next(errors);
    } else {
      getRepository(User).save(user);
      res.json({
        state: 200,
        message: `Update Success User Info : ${user.firstName} !`,
      });
    }
  } else {
    res.status(403).json({ message: "No Authrozation to update" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const email = req.params.id;
  const user = await getRepository(User).findOne({ email: email });

  if (user.email === res.locals.userID) {
    await getRepository(User).delete({ email: email });
    res.json("Delete Suceess.");
  } else {
    res.status(403).json({ message: "No Authrozation to update" });
  }
};
