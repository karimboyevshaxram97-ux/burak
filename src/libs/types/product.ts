import { ObjectId } from "mongoose"; // MongoDBdagi ObjectId tipini import qilish
import {
  ProductCollection, // Mahsulot kolleksiyasi enum
  ProductSize,       // Mahsulot o'lchami enum
  ProductStatus,     // Mahsulot holati enum
} from "../types/enums/product.enum";   // Mahsulotga oid enumlar

// Mahsulotni to'liq ifodalovchi interfeys (odatda bazadan olingan)
export interface Product {
  _id: ObjectId;                          // Mahsulotning noyob ID raqami
  productStatus: ProductStatus;          // Mahsulot holati
  productCollection: ProductCollection;  // Mahsulot kolleksiyasi
  productName: string;                   // Mahsulot nomi
  productPrice: number;                  // Mahsulot narxi
  productLeftCount: number;             // Qolgan mahsulot soni
  productSize: ProductSize;              // Mahsulot o'lchami
  productVolume: number;                 // Mahsulot hajmi
  productDesc?: string;                  // Mahsulot tavsifi (ixtiyoriy)
  productImages: string[];               // Mahsulot rasmlari
  productViews: number;                  // Mahsulot ko'rilganlar soni
  createdAt: Date;
  updatedAt: Date;
}


export interface ProductInquiry {
  order: string;                 // majburiy, tartib (masalan: "asc" yoki "desc")
  page: number;                  // majburiy, sahifa raqami
  limit: number;                 // majburiy, har sahifada nechta element
  productCollection?: ProductCollection; // ixtiyoriy, mahsulot to‘plami
  search?: string;               // ixtiyoriy, qidiruv so‘zi
}


// Mahsulot yaratish uchun ishlatiladigan interfeys (odatda formadan keladi)
export interface ProductInput {
  productStatus?: ProductStatus;         // Mahsulot holati (ixtiyoriy)
  productCollection: ProductCollection;  // Mahsulot kolleksiyasi
  productName: string;                   // Mahsulot nomi
  productPrice: number;                  // Mahsulot narxi
  productLeftCount: number;             // Qolgan mahsulot soni
  productSize?: ProductSize;             // Mahsulot o'lchami (ixtiyoriy)
  productVolume?: number;                // Mahsulot hajmi (ixtiyoriy)
  productDesc?: string;                  // Mahsulot tavsifi (ixtiyoriy)
  productImages?: string[];              // Mahsulot rasmlari (ixtiyoriy)
  productViews?: number;                 // Mahsulot ko'rilganlar soni (ixtiyoriy)
}

export interface ProductUpdateInput {
  _id: ObjectId;                          // Mahsulotning noyob ID raqami (majburiy)
  productStatus?: ProductStatus;         // Mahsulot holati (ixtiyoriy)
  productCollection?: ProductCollection; // Mahsulot kolleksiyasi (ixtiyoriy)
  productName?: string;                  // Mahsulot nomi (ixtiyoriy)
  productPrice?: number;                 // Mahsulot narxi (ixtiyoriy)
  productLeftCount?: number;             // Qolgan mahsulot soni (ixtiyoriy)
  productSize?: ProductSize;             // Mahsulot o'lchami (ixtiyoriy)
  productVolume?: number;                // Mahsulot hajmi (ixtiyoriy)
  productDesc?: string;                  // Mahsulot tavsifi (ixtiyoriy)
  productImages?: string[];              // Mahsulot rasmlari (ixtiyoriy)
  productViews?: number;                 // Mahsulot ko'rilganlar soni (ixtiyoriy)
}