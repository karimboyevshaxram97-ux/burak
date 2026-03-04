import express from "express";
import memberController from "./controllers/member.controllers";
 const router = express.Router();
 import uploader from "./libs/types/utils/uploadar"
 import productController  from "./controllers/product.controller";
import orderController from "./controllers/order.controller";

/** Member **/
router.get("/member/restaurant", memberController.getRestaurant);
router.post("/member/login", memberController.login);
router.post("/member/signup", memberController.signup);
router.post(
    "/member/logout",
     memberController.verifyAuth,
      memberController.logout);
router.get(
    "/member/detail",
     memberController.verifyAuth,
    memberController.getMemberDetail
    );

 router.post("/member/update",
    memberController.verifyAuth,
    uploader("members").single("memberImages"),
    memberController.updateMember
 );

 router.get("/member/top-users", memberController.getTopUsers);

/** Product **/
router.get("/product/all", productController.getProducts);
router.get("/product/:id",
    memberController.retrieveAuth,
    productController.getProduct,
   );
/** Order **/

router.post("/order/create",
    memberController.verifyAuth,
    orderController.createOrder
   );

export default router;
