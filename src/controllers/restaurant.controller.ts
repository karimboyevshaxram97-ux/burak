 import {Request, Response, NextFunction} from "express";
import {T} from "../libs/types/common"
import MemberService from "../models/Members.service";
import { AdminRequest, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/types/enums/member.enum";
import { LoginInput } from '../libs/types/member';
import MemberModel from "../schema/Member.model";
import { HttpCode, Message } from "../libs/types/errors";
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
    }  catch (err) {
        console.log('ERROR, getLogin', err);
        res.redirect("/admin");
    }
};

//=============================================================================
restaurantController.processSignup = async (
  req: AdminRequest,
  res: Response) => {
  try {
        console.log("processSignup");             // Ro'yxatdan o'tish jarayoni boshlandi
        const file = req.file;                    // HTTP so'rovdan yuklangan faylni olish
        if (!file)                               // Agar fayl mavjud bo'lmasa
        throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);   // BAD_REQUEST xatolikni chiqarish
       
       const newMember: MemberInput = req.body;                          // Foydalanuvchidan kelgan ma'lumotlarni MemberInput tipida olish
       newMember.memberImage = file?.path.replace(/\\/g, "/");           // Fayl yo'lidagi '\' belgilarini '/' ga almashtirish (Windows yo'lini web formatga o'tkazish)
       newMember.memberType = MemberType.RESTAURANT;                     // Foydalanuvchini RESTAURANT turiga belgilash (doimiy qiymat)
       const result = await memberService.processSignup(newMember);      // memberService orqali ro'yxatdan o'tish jarayonini bajarish
         
       req.session.member = result;
         req.session.save(function() {
        res.redirect("/admin/product/all");     // Foydalanuvchini "/admin/product/all" sahifasiga yo'naltirish
    })
    
    } catch (err) {
        console.log('ERROR, processSignup', err);
        const message =
        err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
          res.send(
          `<script> alert("${message}"); window.location.replace('/admin/signup') </script>`
);
    }
};

//=============================================================================

restaurantController.processLogin = async (req: AdminRequest, res: Response) => {
    try {
        console.log("processLogin");
       //console.log("req.body:", req.body);
       // throw new Error("FORCED STOP!");

        const input: LoginInput = req.body; 
        const result = await memberService.login(input);
       
       req.session.member = result;
         req.session.save(function() {
        res.redirect("/admin/product/all"); // Foydalanuvchini "/admin/product/all" sahifasiga yo'naltirish
    })
    
    } catch (err) {
        console.log('Error, processLogin', err); 
        const message =
        err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
          res.send(
          `<script> alert("${message}"); window.location.replace('/admin/login') </script>`
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

//==================================================================================

restaurantController.getUsers = async (req: Request, res: Response) => {         // Foydalanuvchilar ro'yxatini olish
  try {                                                                       // Xatoliklarni ushlash uchun blok
    console.log("getUsers");                                                 // Konsolga log chiqarish
    const result = await memberService.getUsers();     //  memberService maqsadli object ........memberService orqali foydalanuvchilarni olish
   

    res.render("users", { users: result });                                 // "users" sahifasini render qilish
  } catch (err) {                                                           // Agar xatolik bo'lsa
    console.log("Error, getUsers:", err);                                     // Xatolikni konsolga chiqarish
    res.redirect("/admin/login");            //redirct majburiy xolatda......Login sahifasiga yo'naltirish
  }
};

//========================================================================
restaurantController.updateChosenUser = async(req: Request, res: Response) => {               // Tanlangan foydalanuvchini yangilash
  try {                                                                                 // Xatoliklarni ushlash uchun blok
    console.log("updateChosenUser");                                                    // Konsolga log chiqarish
    const result = await memberService.updateChosenUser(req.body);

    res.status(HttpCode.OK).json({data:result})
  } catch (err) {                                                                       // Agar xatolik bo'lsa
   console.log("Error, updateChosenUser:", err); // Xatolikni konsolga chiqarish
  if (err instanceof Errors) res.status(err.code).json(err); // Agar xatolik maxsus Errors turida bo‘lsa, kod va xabarni yuborish
  else res.status(Errors.standard.code).json(Errors.standard); // Aks holda umumiy xatolik javobini yuborish
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

//================================================================================

restaurantController.verifyRestaurant = (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
    if (req.session?.member?.memberType === MemberType.RESTAURANT) {
      req.member = req.session.member;
      next();
  } else {
    const message = Message.NOT_AUTHENTICATED;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/login'); </script>`
    );
  }
};

export default restaurantController;
 

  
