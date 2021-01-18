import express from "express";
import bodyParser from "body-parser";

import * as homeController from "./controllers";
import * as userController from "./controllers/user";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( { extended: true }));


app.get("/", homeController.index);

// app.get("/signup", userController.getSignup);
// app.post("/signup", userController.postSignup);
// app.get("/login", userController.getLogin);
// app.post("/login", userController.postLogin);
// app.get("/logout", userController.logout);

app.get("/testLogin", userController.testGet);
app.post("/testLogin", userController.testPost);



export default app;