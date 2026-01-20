import {ObjectId} from "mongoose";
import { MemberStatus, MemberType } from "./enums/member.enum";

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