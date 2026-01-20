import express from "express";
const routerAdmin = express.Router();
 import restaurantController from "../controllers/restaurant.controller";

 /** RESTAURANT */
routerAdmin.get("/", restaurantController.goHome);
 
routerAdmin.get("/login", restaurantController.getLogin);
routerAdmin.post("/login", restaurantController.processLogin);

routerAdmin.get("/Signup", restaurantController.getSignup);
routerAdmin.post("/signup",restaurantController.processSignup);

/** PRODUCT */
/** USER */
export default routerAdmin;

