import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Post } from "../entity/Post";


export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts: Post[] = await getRepository(Post).find();
        res.json(posts);
    } catch (e) {
        console.error(e);
    }
}

export const createPost = async (req: Request, res: Response) => {
    const post: Post = new Post();
    if (req.body) {
        post.title = req.body.title;
        post.content = req.body.content;
        post.userId = res.locals.userID;
    }
    try {
        post.save();
        res.json({
            state: 200,
            message: "Post Uploaded"
        });
    } catch (e) {
        console.error(e);
    }
}

export const getMyPost = async (req: Request, res: Response) => {

}

export const searchPost = async (req: Request, res: Response) => {

}

export const deletePost = async (req: Request, res: Response) => {

}