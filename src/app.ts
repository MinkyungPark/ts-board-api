import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import passportMiddleware from "./config/passport";

import * as homeController from "./controllers/index.controller";
import * as userController from "./controllers/user.controller";
import * as postController from "./controllers/post.controller";

const app = express();

app.set("port", process.env.PORT || 3000);

/* middleware set up */
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
passport.use(passportMiddleware);

app.get("/", homeController.index);

/* /user api */
app.get("/user", userController.getUsers);
app.post("/user/login", userController.login);
app.get("/user/logout", userController.verifyToken, userController.logout);
app.post("/user/signup", userController.createUser);
app.get("/user/:id", userController.getUser);
app.put("/user/:id", userController.verifyToken, userController.updateUser);
app.delete("/user/:id", userController.verifyToken, userController.deleteUser);

/* /post api */
app.get("/post", postController.getPosts);
app.get("/post/mypost", userController.verifyToken, postController.getMyPost);
app.post("/post", userController.verifyToken, postController.createPost);
app.get("/post/search/:keyword", postController.searchPost);
app.get("/post/:id", postController.getPost);
app.put("/post/:id", userController.verifyToken, postController.updatePost);
app.delete("/post/:id", userController.verifyToken, postController.deletePost);

export default app;
