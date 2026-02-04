import express from "express";
const routerAdmin = express.Router();
 import restaurantController from "./controllers/restaurant.controller";
 import productController from "./controllers/product.controller";
import  makeUploader  from "./libs/types/utils/uploadar";


 /** RESTAURANT */
routerAdmin.get("/", restaurantController.goHome);
 routerAdmin
.get("/login", restaurantController.getLogin)
.post("/login", restaurantController.processLogin);

routerAdmin
.get("/signup", restaurantController.getSignup)
.post("/signup",
      makeUploader("members").single("memberImage"),
     restaurantController.processSignup);

routerAdmin.get("/logout",restaurantController.logout);
routerAdmin.get("/check-me",restaurantController.checkAuthSession);


/** PRODUCT */
routerAdmin.get("/product/all",                        // GET so‘rovi: barcha mahsulotlarni olish
      restaurantController.verifyRestaurant,           // Middleware: restoran egasi ekanligini tekshiradi
       productController.getAllProducts                // Controller: mahsulotlar sahifasini render qiladi
    );

 routerAdmin.post("/product/create",                       // POST so‘rovi: yangi mahsulot yaratish
    restaurantController.verifyRestaurant,                // Middleware: restoran egasi ekanligini tekshiradi
     makeUploader("products").array("productImages", 5),    // Middleware: 5 tagacha rasm yuklash
     productController.createNewProduct                      // Controller: yangi mahsulotni yaratadi
    );
routerAdmin.post("/product/:id",                            // POST so‘rovi: ma’lum ID bo‘yicha mahsulotni yangilash
      restaurantController.verifyRestaurant,                  // Middleware: restoran egasi ekanligini tekshiradi
      productController.updateChosenProduct               // Controller: mahsulotni yangilash
    );

/** USER */

routerAdmin.get("/user/all", restaurantController.verifyRestaurant, restaurantController.getUsers)


export default routerAdmin;

