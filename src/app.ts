import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
passport.use(passportMiddleware);


app.get("/", homeController.index);

/* /user api */
app.get("/user", userController.getUsers);
app.get("/user/:id", userController.getUser);
app.put("/user/:id", userController.updateUser);
app.delete("/user/:id", userController.deleteUser);
app.post("/user/login", userController.login);
app.get("/user/logout", userController.verifyToken, userController.logout);
app.post("/user/signup", userController.createUser);


/* /post api */
app.get("/post", postController.getPosts);
app.post("/post", userController.verifyToken, postController.createPost);
app.get("/post/:id", postController.getPost);
app.put("/post/:id", userController.verifyToken, postController.updatePost);
app.delete("/post/:id", postController.deletePost);
app.get("/post/mypost", userController.verifyToken, postController.getMyPost);
app.get("/post/search/:keyword", postController.searchPost);


export default app;