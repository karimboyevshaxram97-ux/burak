
import { error } from "console"; // Konsol xatoliklari uchun
import { MemberStatus, MemberType } from "../libs/types/enums/member.enum"; // MemberType enum
import Errors, { HttpCode, Message } from "../libs/types/errors"; // Maxsus xatoliklar va kodlar
import { LoginInput, Member, MemberInput, MemberUpdateInput } from "../libs/types/member"; // Tiplar
import MemberModel from "../schema/Member.model"; // MongoDB modeli
import * as bcrypt from "bcryptjs"; // Parolni xeshlash kutubxonasi      //import { LoginInput,  Member, MemberInput } from "../libs/types/member";
import { shapeIntoMongooseObjectId } from "../libs/types/config";


class MemberService {
  private readonly memberModel;

  constructor() {
    this.memberModel = MemberModel;                                            // Modelni tayinlash
  }

  /**
   * SPA - Ro'yxatdan o'tish
   */

  public async getRestaurant(): Promise<Member> {
    const result = await this.memberModel
      .findOne({ memberType: MemberType.RESTAURANT })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async Signup(input: MemberInput): Promise<Member> {
    const salt = await bcrypt.genSalt();                                                  // Tuz yaratish
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);               // Parolni xeshlash

    try {
      const result = await this.memberModel.create(input);                                    // Yangi member yaratish
      result.memberPassword = "";                                                             // Parolni javobdan olib tashlash
      return result.toJSON();                                                                  // JSON formatda qaytarish
    } catch (err) {
      console.error("Error, model:signup", err);                                                 // Konsolga xatolik chiqarish
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);                            // Xatolikni otish
    }
  }

  /**
   * SPA - Tizimga kirish
   */
  public async login(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne({ memberNick: input.memberNick,
        memberStatus: {$ne: MemberStatus.DELETE},
      },
         { memberNick: 1, memberPassword: 1, memberStatus: 1 }
        )
      .exec();                                                                                 // So'rovni bajarish

    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);                      // Agar topilmasa xatolik

    const isMatch = await bcrypt.compare(input.memberPassword, member.memberPassword);             // Parollarni solishtirish
    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);                       // Parol noto'g'ri bo'lsa
    }

    return await this.memberModel.findById(member._id).lean().exec();                             // To'liq memberni qaytarish
  }
      
      
    public async getMemberDetail(member: Member): Promise<Member> {
     const memberId = shapeIntoMongooseObjectId(member._id);
     const result = await this.memberModel
        .findOne({ _id: memberId, memberStatus: MemberStatus.ACTIVE })
        .exec();
      if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

      return result;
    }

    public async updateMember(
        member: Member,
        input: MemberUpdateInput
      ): Promise<Member> {
        const memberId = shapeIntoMongooseObjectId(member._id);
        const result = await this.memberModel
          .findOneAndUpdate({ _id: memberId }, input, { new: true })
                .exec();
        if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

        return result;
    }

     public async getTopUsers(): Promise<Member[]> {
        const result = await this.memberModel
          .find({
            memberStatus: MemberStatus.ACTIVE,
            memberPoints: { $gte: 1 },
          })
          .sort({ memberPoints: -1 })
          .limit(4)
          .exec();
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

        return result;
      }


  /**1 
   * SSR - Ro'yxatdan o'tish
   */
  public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
      .findOne({ memberType: MemberType.RESTAURANT })                                           // RESTAURANT turidagi memberni qidirish
      .exec();                                                                                  // So'rovni bajarish

   // if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);                   // Agar mavjud bo'lsa xatolik

    const salt = await bcrypt.genSalt();                                                          // Tuz yaratish
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);                        // Parolni xeshlash

    try {
      const result = await this.memberModel.create(input);                                      // Yangi member yaratish
      result.memberPassword = "";                                                                // Parolni olib tashlash
      return result;                                                                              // Memberni qaytarish
    } catch (err) {
      console.log(err);                                                                           // Konsolga xatolik chiqarish
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);                            // Xatolikni otish
    }
  }

  /**
   * SSR - Tizimga kirish
   */
  public async processLogin(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne({ memberNick: input.memberNick }, { memberNick: 1, memberPassword: 1 })      // Nickname orqali qidirish
      .exec(); // So'rovni bajarish

    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);             // Agar topilmasa xatolik

    const isMatch = await bcrypt.compare(input.memberPassword, member.memberPassword);       // Parollarni solishtirish
    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);                     // Parol noto'g'ri bo'lsa
    }  

    return await this.memberModel.findById(member._id).exec();                        // To'liq memberni qaytarish
  }


public async getUsers(): Promise<Member[]> {            // USER turidagi barcha memberlarni olish
  const result = await this.memberModel                // MongoDB modelidan so'rov yuborish
    .find({ memberType: MemberType.USER })              // Faqat USER turidagi memberlarni qidirish
    .exec();                                           // So'rovni bajarish

 

  return result;                                                                    // Topilgan memberlar ro'yxatini qaytarish
}

public async updateChosenUser(input: MemberUpdateInput): Promise<Member> {                // Tanlangan foydalanuvchini yangilash funksiyasi
  input._id = shapeIntoMongooseObjectId(input._id);                                       // _id ni Mongoose formatiga o‘zgartirish
  const result = await this.memberModel                                                    // MongoDB modelidan foydalanish
    .findByIdAndUpdate({ _id: input._id }, input, { new: true })                          // _id bo‘yicha yangilash va yangilangan hujjatni qaytarish
    .exec();                                                                               // So‘rovni bajarish

  if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);                 // Agar yangilash amalga oshmasa, xatolik chiqarish

  return result;                                                                              // Yangilangan foydalanuvchini qaytarish
}



}

export default MemberService;

