 import {Request, Response} from "express";
import {T} from "../libs/types/common"
import MemberService from "../models/Members.service";
import { AdminRequest, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/types/enums/member.enum";
import { LoginInput } from '../libs/types/member';
import MemberModel from "../schema/Member.model";
import { Message } from "../libs/types/errors";
import Errors from "../libs/types/errors"; 

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
         res.redirect("/admin")
    }
    };



//===========================================================================
restaurantController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("getSignup: request Received");
        res.render('signup');
    } catch (err) {
        console.log('ERROR, getSignup', err);
         res.redirect("/admin");
    }
        
    };

//==========================================================================
restaurantController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("getLogin: request Received");
        res.render('login');
    } catch (err) {
        console.log('ERROR, getLogin', err);
        res.redirect("/admin");
    }
};

//=============================================================================
restaurantController.processSignup = async (req: AdminRequest, res: Response) => {
    try {
        console.log("processSignup: request Received");

        const newMember: MemberInput = req.body;
        newMember.memberType = MemberType.RESTAURANT;
        console.log(req.body);
        
        const result = await memberService.Signup(newMember);

          // TODO:  SESSION AUTHENTIFICATION  

         req.session.member = result;
         req.session.save(function() {
        res.send(result);
    })
    
    } catch (err) {
        console.log('ERROR, processSignup', err);
        const message =
        err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
          res.send(
          `<script> alert("${message}"); window.location.replace('admin/signup') </script>`
);
    }
};
//=============================================================================

restaurantController.processLogin = async (req: AdminRequest, res: Response) => {
    try {
        console.log("processLogin");
        
        const input: LoginInput = req.body; 
        const result = await memberService.login(input);
       
       req.session.member = result;
         req.session.save(function() {
        res.send(result);
    })
    
    } catch (err) {
        console.log('Error, processLogin', err); 
        const message =
        err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
          res.send(
          `<script> alert("${message}"); window.location.replace('admin/login') </script>`
);
    }
};
      
//================================================================================

restaurantController.logout = async (req: AdminRequest, res: Response) => {
  try {
    console.log("logout");
    req.session.destroy(function () {
      res.redirect("/admin");
    });
  } catch (err) {
    console.log("Error, logout:", err);
    res.redirect("/admin");
  }
};

//================================================================================

restaurantController.checkAuthSession = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("checkAuthSession");
    if (req.session?.member) 
    res.send(`<script> alert ("${req.session.member.memberNick}") </script>`);
    else res.send(`<script>alert("${Message.NOT_AUTHENTICATED}") </script>`);
  } catch (err) {
    console.log("Error, checkAuthSession:", err);
    res.send(err);
  }
};

export default restaurantController;
 

  
