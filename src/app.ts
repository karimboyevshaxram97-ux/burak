import express from "express";
import path from "path";
import router from "./views/router";
import routerAdmin from "./views/router-admin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/types/config";

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan(MORGAN_FORMAT));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/admin", routerAdmin);
app.use("/", router);

export default app;
