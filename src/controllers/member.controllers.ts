// member controllarni har doim object orqali yasaymasiz 

import { Request, Response } from "express";    // Expressdan so‘rov va javob turlarini chaqiramiz
import { T,} from "../libs/types/common";       // T tipi (controller shakli)ni chaqiramiz

const memberController: T = {};                // Bo‘sh controller obyektini yaratamiz

memberController.goHome = (req: Request, res: Response) => {                 // Bosh sahifa so‘rovi uchun funksiya
  try {
    res.send("Home Page");                                                  // Javob sifatida "Home Page" matnini yuboradi
  } catch (err) {
    console.log("Error, goHome:", err);                                    // Xatolik bo‘lsa, konsolga chiqaradi
  }
};

memberController.getLogin = (req: Request, res: Response) => {                // Login sahifasi uchun funksiya
  try {
    res.send("Login Page");                                                // Javob sifatida "Login Page" matnini yuboradi
  } catch (err) {
    console.log("Error, getLogin:", err);                                  // Xatolik bo‘lsa, konsolga chiqaradi
  }
};

memberController.getSignup = (req: Request, res: Response) => {             // Ro‘yxatdan o‘tish sahifasi uchun funksiya
  try {
    res.send("Signup Page");                                                // Javob sifatida "Signup Page" matnini yuboradi
  } catch (err) {
    console.log("Error, getSignup:", err);                                  // Xatolik bo‘lsa, konsolga chiqaradi
  }
};

export default memberController;                                    // Controller obyektini eksport qilamiz, boshqa fayllarda ishlatish uchun
