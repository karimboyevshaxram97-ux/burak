 import {Request, Response} from "express";
import {T} from "../libs/types/common"
import MemberService from "../models/Members.service";
import { MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/types/enums/member.enum";
//EJS

const restaurantController: T = {};
restaurantController.goHome = (req: Request, res: Response) => {
    try {
        console.log("goHome: request Received");
        res.send('Home page');
    } catch (err) {
        console.log('ERROR, goHome', err);
    }
};

restaurantController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("getLogin: request Received");
        res.send('Login page');
    } catch (err) {
        console.log('ERROR, getLogin', err);
    }
};

restaurantController.processLogin = (req: Request, res: Response) => {
    try {
        console.log("processLogin: request Received");
        res.send('processLogin page DONE');
    } catch (err) {
        console.log('ERROR, processLogin', err);
    }
};

restaurantController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("getSignup: request Received");
        res.send('Sign-up page');
    } catch (err) {
        console.log('ERROR, getSignup', err);
    }
};

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
 
 /*
 import { Request, Response } from "express";    
import { T } from "../libs/types/common";  
import MemberService from "../models/Members.service";
import { MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/types/enums/member.enum";


const restaurantController: T = {};        

restaurantController.goHome = (req: Request, res: Response) => {       
  try {
    console.log("gohome");
    res.send("Home Page");  
    //send | json | redirect | end | render                                               
  } catch (err) {
    console.log("Error, goHome:", err);                          
  }
};

restaurantController.getLogin = (req: Request, res: Response) => { 
  try {
    console.log("getLogin");
    res.send("Login Page");                                                
  } catch (err) {
    console.log("Error, getLogin:", err);                        
  }
};

restaurantController.getSignup = (req: Request, res: Response) => {          
  try {
    console.log("getSignup");
    res.send("Signup Page");                                                
  } catch (err) {
    console.log("Error, getSignup:", err);                        
  }
};

restaurantController.processLogin = (req: Request, res: Response) => {
  try {
    console.log("processLogin");
    res.send("DONE");
  } catch (err) {
    console.log("Error, processLogin:", err);
  }
};

restaurantController.processSignup = async (req: Request, res: Response) => {
  try {
    console.log("processSignup");
    console.log("body:",req.body);

     const newMember: MemberInput = req.body;
     newMember.memberType = MemberType.RESTAURANT

    const memberService = new MemberService();
     const result = await memberService.processSignup(newMember);
    res.send(result);
  } catch (err) {
    console.log("Error, processSignup:", err);
  }
};

export default restaurantController;                              
*/