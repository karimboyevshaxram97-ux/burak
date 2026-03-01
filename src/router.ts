import express from "express";
import memberController from "./controllers/member.controllers";
 const router = express.Router();
 import uploader from "./libs/types/utils/uploadar"

/** Member **/
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

/** Product **/

/** Order **/

export default router;
