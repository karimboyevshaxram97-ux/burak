import express from "express";
import path from "path";
import router from "./views/router"
import routerAdmin from "./views/router-admin";
import morgan from "morgan";

/** 1-ENTRANCE kirish kodlari**/
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan(`MORGAN_FORMAT`));

/** 2-SESSIONS **/

/** 3-VIEWS **/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** 4-ROUTERS **/
app.use("/admin",routerAdmin);     // SSR: backendda frontendni qurib oliosh va biz bunda EJS framworkdan foydalanamiz
app.use("/", router);             // SPA: REACT ( bizning 1-maqsadimiz burak backand serverni loyixamizga react  spa sifatida ishlatamiz)

export default app;