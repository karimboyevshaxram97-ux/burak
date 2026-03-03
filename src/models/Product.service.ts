import Errors, { HttpCode, Message } from "../libs/types/errors"; // Maxsus xatoliklar va HTTP kodlar
import { Product, ProductUpdateInput, ProductInput, ProductInquiry } from "../libs/types/product"; // Mahsulot tiplarini import qilish
import ProductModel from "../schema/Product.models"; // Mahsulot modeli (MongoDB)
import { shapeIntoMongooseObjectId } from "../libs/types/config";
import { ProductStatus } from "../libs/types/enums/product.enum";
import {ObjectId} from "mongoose"
import ViewService from "./View.service";
import { ViewInput } from "../libs/types/view";
import { ViewGroup } from "../libs/types/enums/View.enum";

class ProductService {
  private readonly productModel; // Mahsulot modelini saqlovchi xususiyat
  public viewService;

  constructor() {
    this.productModel = ProductModel; // Modelni konstruktor orqali tayinlash
    this.viewService = new ViewService();
  }

  /** SPA */ // Single Page Application uchun joy
 
  public async getProducts(inquiry: ProductInquiry): Promise<Product[]> {
  const match: any = { productStatus: ProductStatus.PROCESS };

  if (inquiry.productCollection) {
    match.productCollection = inquiry.productCollection;
  }
  if (inquiry.search) {
    match.productName = { $regex: new RegExp(inquiry.search, "i") };
  }

  const sort: any =
    inquiry.order === "productPrice"
      ? { [inquiry.order]: 1 }
      : { [inquiry.order]: -1 };

  const result = await this.productModel
    .aggregate([
      { $match: match },
      { $sort: sort },
      { $skip: (inquiry.page - 1) * inquiry.limit },
      { $limit: inquiry.limit },
    ])
    .exec();

  if (!result) {
    throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
  }

  return result;
}
//=======================================================

public async getProduct(
    memberId: ObjectId | null,
    id: string
): Promise<Product> {
    const productId = shapeIntoMongooseObjectId(id);

    let result = await this.productModel
        .findOne({
            _id: productId,
            productStatus: ProductStatus.PROCESS,
        })
        .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    // TODO: If authenticated users => first => view log creation
       if (memberId) {
         // Check Existence
         const input: ViewInput = {
           memberId: memberId,
           viewRefId: productId,
           viewGroup: ViewGroup.PRODUCT,
         };
         const existView = await this.viewService.checkViewExistence(input);

         console.log("exist:", existView);
         if (!existView) {
           // Insert View
           await this.viewService.insertMemberView(input);
         }

         // Increase Counts
         result = await this.productModel
           .findByIdAndUpdate(
             productId,
             { $inc: { productViews: +1 } },
             { new: true }
           )
           .exec();
       }

    return result;
}


//=========================================================
/** SSR */ // Server Side Rendering uchun joy
  //=======================================================
public async getAllProducts(): Promise<Product[]> {
    const result = await this.productModel.find().exec(); // Barcha mahsulotlarni bazadan olish
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND); // Agar hech narsa topilmasa, xatolik chiqarish
    return result; // Topilgan mahsulotlar ro‘yxatini qaytarish
}

  
//===================================================================================
  public async createNewProduct(input: ProductInput): Promise<Product> { // Yangi mahsulot yaratish funksiyasi
    try {
      return await this.productModel.create(input); // Mahsulotni bazaga yozish
    } catch (err) {
      console.error("Error, model:createNewProduct:", err); // Konsolga xatolik chiqarish
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED); // Xatolikni foydalanuvchiga yuborish
    }
  }
//===============================================================================
  public async updateChosenProduct(
  id: string,                                         // Mahsulot ID'si (string ko'rinishida)
  input: ProductUpdateInput                           // Yangilanish uchun mahsulot ma'lumotlari
): Promise<Product> {  
  id = shapeIntoMongooseObjectId(id);                 // String ID ni Mongoose ObjectId ga aylantirish

  const result = await this.productModel
    .findOneAndUpdate({ _id: id }, input, { new: true })    // ID bo'yicha yangilash, yangilangan hujjatni qaytarish
    .exec();                                                // So'rovni bajarish

  if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED); // Agar yangilash amalga oshmagan bo'lsa, xatolik chiqarish

  return result;                                        // Yangilangan mahsulotni qaytarish
}

}

export default ProductService; // Klassni eksport qilish