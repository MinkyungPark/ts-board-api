import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import passport from "passport";
import passportMiddleware from "./config/passport";

import * as homeController from "./controllers/index.controller";
import * as userController from "./controllers/user.controller";

const app = express();

app.set("port", process.env.PORT || 3000);

/* middleware set up */
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true }));
app.use(passport.initialize());
passport.use(passportMiddleware);


app.get("/", homeController.index);

/* /user api */
app.get("/user", userController.getUsers);
app.get("/user/:id", userController.getUser);
app.put("/user/:id", userController.updateUser);
app.delete("/user/:id", userController.deleteUser);
app.post("/user/signup/", userController.createUser);
app.post("/user/signin", userController.login);
app.get("/user/logout", userController.logout);


/* /post api */


export default app;