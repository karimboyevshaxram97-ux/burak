import Errors, { HttpCode, Message } from "../libs/types/errors"; // Maxsus xatoliklar va HTTP kodlar
import { Product, ProductUpdateInput, ProductInput } from "../libs/types/product"; // Mahsulot tiplarini import qilish
import ProductModel from "../schema/Product.models"; // Mahsulot modeli (MongoDB)
import { shapeIntoMongooseObjectId } from "../libs/types/config";

class ProductService {
  private readonly productModel; // Mahsulot modelini saqlovchi xususiyat

  constructor() {
    this.productModel = ProductModel; // Modelni konstruktor orqali tayinlash
  }

  /** SPA */ // Single Page Application uchun joy
  /** SSR */ // Server Side Rendering uchun joy


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