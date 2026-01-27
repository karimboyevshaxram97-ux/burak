
import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Members.service";
import { LoginInput, Member,  MemberInput } from "../libs/types/member";
import  Errors  from "../libs/types/errors"

const memberService = new MemberService();
const memberController: T = {};

//=================================================================
memberController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup");
    const input: MemberInput = req.body,
    result: Member = await memberService.Signup(input);
    // TODO: TOKEN AUTHENTIFICATION
    
    res.json({ member: result });
  } catch (err) {
    console.log("Error, signup:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
    // res.json({});
  }
};
//=================================================================
memberController.login = async (req: Request, res: Response) => {
  try {
    console.log("login");
    const input: LoginInput = req.body,
    result = await memberService.login(input);
    // TODO: TOKEN AUTHENTIFICATION
    res.json({ member: result });
  } catch (err) {
    console.log("Error,login:", err);
    res.json({messege:err})
    //res.json({});
  }
};

export default memberController;

