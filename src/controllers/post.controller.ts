import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Post } from "../entity/Post";
import { validate, ValidationError } from "class-validator";


export const createPost = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const post: Post = new Post();
        if (req.body) {
            post.title = await req.body.title;
            post.content = await req.body.content;
            post.userId = await res.locals.userID;
        }
        const errors: ValidationError[] = await validate(post);
        if (errors.length > 0) {
            console.log('Validation Fail error : ', errors);
            next(errors);
        } else {
            post.save();
            res.json({ 
                state: 200, 
                message: "Post Uploaded!",
            });
        }
    } catch (e) {
        console.error(e);
    }
}

export const getMyPost = async (req: Request, res: Response) => {
    try {
        const user_id: string = res.locals.userID;
        const post: Post[] = await getRepository(Post).find({ userId: user_id });
        res.json(post);
    } catch (e) {
        console.error(e);
    }
}

export const searchPost = async (req: Request, res: Response) => {
    const keyword: string = req.params.keyword;
    const search: any = req.query.search;

    if (keyword === 'title' || keyword === 'content') {
        const posts: Post[] = await getRepository(Post)
                                    .createQueryBuilder("post")
                                    .where("post." + keyword + " like :search", { search: "%" + search + "%" })
                                    .orderBy("post.post_id", "DESC")
                                    .getMany();
        res.json(posts);
    } else {
        res.status(404).json({ message: '/Keyword Missing' });
    }

}

export const deletePost = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const post = await getRepository(Post).findOne({post_id: id});

    console.log(post.userId);
    console.log(res.locals.userID);
    if (post.userId === res.locals.userID) {
        await getRepository(Post).delete({post_id: id});
        res.json('Delete Success.');
    } else {
        res.status(403).json({ message: 'No Authrozation to delete' });
    }
}

export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts: Post[] = await getRepository(Post).find();
        res.json(posts);
    } catch (e) {
        console.error(e);
    }
}

export const getPost = async (req: Request, res: Response) => {
    try {
        const id: number = +req.params.id;
        const post: Post = await getRepository(Post).findOne({post_id: id});
        res.json(post);
    } catch (e) {
        console.error(e);
    }
}

export const updatePost = async (req: Request, res: Response, next:NextFunction) => {
    const id = +req.params.id;
    const post = await getRepository(Post).findOne({post_id: id});

    if (post.userId === res.locals.userID) {
        const merge: Post = getRepository(Post).merge(post, req.body);
        const errors: ValidationError[] = await validate(merge);
        if (errors.length > 0) {
            console.log('Validation Fail error : ', errors);
            next(errors);
        } else {
            getRepository(Post).save(post);
            res.json({ 
                state: 200, 
                message: `Update Success Post Number : ${post.post_id} !`,
            });
        }
    } else {
        res.status(403).json({ message: 'No Authrozation to update' });
    }
}