import path from "path";
import dotenv from "dotenv";
dotenv.config({path: path.resolve(__dirname, "../.env")});
import errorHandler from "errorhandler";
import { createConnection } from "typeorm";

import app from "./app";

if (process.env.NODE_ENV === "development") {
    app.use(errorHandler());
}

createConnection().then(connection => {
    console.log("   **** db connection Success ****");
    app.listen(app.get("port"), () => {
        console.log("   App is running port %d in %s mode",
        app.get("port"), app.get("env"));
    });
}).catch((error) => {
    console.log(error);
});