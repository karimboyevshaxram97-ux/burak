 import {Request, Response} from "express";
import {T} from "../libs/types/common"
import MemberService from "../models/Members.service";
import { MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/types/enums/member.enum";
import { LoginInput } from '../libs/types/member';
import MemberModel from "../schema/Member.model";

const memberService = new MemberService();

//EJS

const restaurantController: T = {};
restaurantController.goHome = (req: Request, res: Response) => {
    try {
        console.log("goHome: request Received");
        res.render('home');
        // SEND | JSON | REDIRECT | END | RENDER  
    } catch (err) {
        console.log('ERROR, goHome', err);
    }
}; 

//===========================================================================
restaurantController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("getSignup: request Received");
        res.render('signup');
    } catch (err) {
        console.log('ERROR, getSignup', err);
    }
};
//==========================================================================
restaurantController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("getLogin: request Received");
        res.render('login');
    } catch (err) {
        console.log('ERROR, getLogin', err);
    }
};

//=============================================================================
restaurantController.processSignup = async (req: Request, res: Response) => {
    try {
        console.log("processSignup: request Received");

        const newMember: MemberInput = req.body;
        newMember.memberType = MemberType.RESTAURANT;
        console.log(req.body);
           // TODO:  SESSION AUTHENTIFICATION
        const result = await memberService.Signup(newMember);

        res.send(result);
    } catch (err) {
        console.log('ERROR, processSignup', err);
        res.send(err);
    }
};
//=============================================================================

restaurantController.processLogin = async (req: Request, res: Response) => {
    try {
        console.log("processLogin");
        
        const input: LoginInput = req.body; 
        const result = await memberService.login(input);
       //TODO SESSION AUTHENTIFICATION
        res.send(result);
    } catch (err) {
        console.log('Error, processLogin', err); 
        res.send(err);
      
    }
};

export default restaurantController;
 

  
