import express from "express";
const router = express.Router();
 import memberController from "../controllers/member.controllers";

router.get("/", memberController.goHome);

 router.get("/Login", memberController.getLogin);

 router.get("/Signup", memberController.getSignup);

export default router;