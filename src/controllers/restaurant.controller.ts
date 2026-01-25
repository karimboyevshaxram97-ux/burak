 import {Request, Response} from "express";
import {T} from "../libs/types/common"
import MemberService from "../models/Members.service";
import { MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/types/enums/member.enum";
import { LoginInput } from '../libs/types/member';
import MemberModel from "../schema/Member.model";



//EJS
//=======================================================================
const restaurantController: T = {};
restaurantController.goHome = (req: Request, res: Response) => {
    try {
        console.log("goHome: request Received");
        res.send('Home page');
        // SEND | JSON | REDIRECT | END | RENDER  
    } catch (err) {
        console.log('ERROR, goHome', err);
    }
}; 
//==========================================================================
restaurantController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("getLogin: request Received");
        res.send('Login page');
    } catch (err) {
        console.log('ERROR, getLogin', err);
    }
};

//===========================================================================
restaurantController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("getSignup: request Received");
        res.send('Sign-up page');
    } catch (err) {
        console.log('ERROR, getSignup', err);
    }
};
//=============================================================================

restaurantController.processLogin = async (req: Request, res: Response) => {
    try {
        console.log("processLogin");
        console.log("body:", req.body);
        const input: LoginInput = req.body; 

        const memberService = new MemberService();
        const result = await memberService.processLogin(input);

        res.send(result);
    } catch (err) {
        console.log('Error, processLogin', err); 
        res.send(err);
      
    }
};
//=============================================================================
restaurantController.processSignup = async (req: Request, res: Response) => {
    try {
        console.log("processSignup: request Received");

        const newMember: MemberInput = req.body;
        newMember.memberType = MemberType.RESTAURANT;
        console.log(req.body);

        const memberService = new MemberService();
        const result = await memberService.processSignup(newMember);

        res.send(result);
    } catch (err) {
        console.log('ERROR, processSignup', err);
        res.send(err);
    }
};
export default restaurantController;
 

  
