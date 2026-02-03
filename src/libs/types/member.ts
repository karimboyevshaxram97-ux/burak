import {ObjectId} from "mongoose";
import {MemberStatus, MemberType } from "./enums/member.enum";
import { Session } from "express-session";
import { Request } from "express";
export interface Member { 
  _id: ObjectId; 

  
  memberType: MemberType;           // A'zoning turi (masalan: admin, user)
  memberStatus: MemberStatus;       // A'zoning holati (masalan: active, inactive)
  memberNick: string;               // Taxallus (nickname)
  memberPhone: string;              // Telefon raqami
  memberPassword?: string;          // Parol (ixtiyoriy)
  memberAddress?: string;           // Manzil (ixtiyoriy)
  memberDesc?: string;              // Tavsif (ixtiyoriy)
  memberImage?: string;             // Profil rasmi URL (ixtiyoriy)
  memberPoints: number;             // Reyting yoki ball
  createdAt: Date;                  // Yaratilgan sana
  updatedAt: Date;                  // Yangilangan sana
}

export interface MemberInput {
  memberType?: MemberType;         // A'zoning turi (masalan: admin, user) - ixtiyoriy
  memberStatus?: MemberStatus;     // A'zoning holati (masalan: active, inactive) - ixtiyoriy
  memberNick: string;              // A'zoning taxallusi - majburiy
  memberPhone: string;             // Telefon raqami - majburiy
  memberPassword: string;          // Parol - majburiy
  memberAddress?: string;          // Manzil - ixtiyoriy
  memberDesc?: string;             // Qo‘shimcha tavsif - ixtiyoriy
  memberImage?: string;            // Profil rasmi URL - ixtiyoriy
  memberPoints?: number;           // Ballar yoki reyting - ixtiyoriy
}

 export interface LoginInput {
  memberNick: string;
  memberPassword: string;
 }

export interface MemberUpdateInput {
  _id: ObjectId;                           // Memberning noyob ID raqami (majburiy)
  memberStatus?: MemberStatus;             // Memberning holati (ixtiyoriy)
  memberNick?: string;                     // Foydalanuvchi nomi (ixtiyoriy)
  memberPhone?: string;                     // Telefon raqami (ixtiyoriy)
  memberPassword?: string;                   // Parol (ixtiyoriy)
  memberAddress?: string;                     // Manzil (ixtiyoriy)
  memberDesc?: string;                        // Qo‘shimcha tavsif (ixtiyoriy)
  memberImage?: string;                        // Rasm URL manzili (ixtiyoriy)
}

 export interface AdminRequest extends Request {
  member: Member;
  session: Session & { member: Member};
  file: Express.Multer.File;
  files: Express.Multer.File[];
 }