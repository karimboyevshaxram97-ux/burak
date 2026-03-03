import { Request, Response } from "express";
import { T } from "../libs/types/common";
import Errors, {HttpCode, Message} from "../libs/types/errors";
import ProductService from "../models/Product.service";     // yo‘lni loyihangizga moslang
import { ProductInput, ProductInquiry } from "../libs/types/product";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import { ProductCollection } from "../libs/types/enums/product.enum";


const productService = new ProductService();
const productController: T = {};

/** SPA */ // Single Page Application uchun joy
productController.getProducts = async (req: Request, res: Response) => {
  try {
    console.log("getProducts");

    // Query parametrlardan qiymatlarni olish
    const { page, limit, order, productCollection, search } = req.query;

    // ProductInquiry obyektini tuzish
    const inquiry: ProductInquiry = {
      order: String(order),
      page: Number(page),
      limit: Number(limit),
    };

    if (productCollection) {
      inquiry.productCollection = productCollection as ProductCollection;
    }
    if (search) {
      inquiry.search = String(search);
    }

    // Servis orqali mahsulotlarni olish
    const result = await productService.getProducts(inquiry);

    // Javob qaytarish
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getProducts:", err);
    if (err instanceof Errors) {
      res.status(err.code).json(err);
    } else {
      res.status(Errors.standard.code).json(Errors.standard);
    }
  }
};

//=======================================================================

 productController.getProduct = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("getProduct");
    const { id } = req.params;

    const memberId = req.member?._id ?? null,
          result = await productService.getProduct(memberId, id);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getProduct:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

 //==============================================================


/** SSR */ // Server Side Rendering uchun joy

//=========================================================================
productController.getAllProducts = async (req: Request, res: Response) => {
  try {  
    console.log("getAllProducts");                                    // Konsolga funksiyaning chaqirilganini yozish
    
    const data = await productService.getAllProducts();               // Servisdan barcha mahsulotlarni olish
    
    res.render("products", { products: data });                        // "products" sahifasini render qilish va mahsulotlarni uzatish
  } catch (err) {
    console.log("Error, getAllProducts:", err);                       // Xatolikni konsolga chiqarish

    if (err instanceof Errors) res.status(err.code).json(err);           // Maxsus xatolik bo'lsa, status va JSON bilan javob
    else res.status(Errors.standard.code).json(Errors.standard);        // Aks holda standart xatolik javobi
  }
};
//========================================================================
productController.createNewProduct = async (req: AdminRequest, res: Response) => {
  try {
    console.log("createNewProduct");                   // Konsolda log chiqaradi
     console.log("req.files:", req.files);             // rasm haqida malumot
   
    
    if (!req.files?.length)                                 // Agar fayllar mavjud emas yoki bo'sh bo'lsa
    throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);      // CREATE_FAILED xatolikni chiqarish

    const data: ProductInput = req.body;                    // HTTP so'rovdan mahsulot ma'lumotlarini olish
    data.productImages = req.files?.map((ele) => {          // Fayllar mavjud bo'lsa, har birining path qiymatini olish
    return ele.path.replace(/\\/g, "/");                              // Faylning saqlangan joyini qaytarish
  });

   console.log("data:", data);                                // Yakuniy mahsulot ma'lumotlarini konsolga chiqarish

  await productService.createNewProduct(data);

   res.send(
   '<script> alert("Successful creation!"); window.location.replace("/admin/product/all") </script>'
   );
   } catch (err) {
    console.log("Error, createNewProduct:", err);                                             // Xatolikni konsolga chiqarish
    const message =
    err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;                        // Agar xatolik maxsus Errors turida bo‘lsa, uning xabarini oladi; aks holda umumiy xabarni tanlaydi
     res.send(
        `<script> alert("${message}"); window.location.replace('/admin/product/all') </script>` // Foydalanuvchiga alert ko‘rsatadi va uni 'admin/product/all' sahifasiga yo‘naltiradi
    );
  }
};

//=============================================================================
productController.updateChosenProduct = async (req: Request, res: Response) => {
  try { 
    console.log("updateChosenProduct");                                             // Konsolga funksiyaning chaqirilganini yozish
    const id = req.params.id;                                                      // URL'dan mahsulot ID'sini olish

    const result = await productService.updateChosenProduct(id, req.body);         // Servis orqali mahsulotni yangilash
 
    res.status(HttpCode.OK).json({data: result});
  } catch (err) {
    console.log("Error, updateChosenProduct:", err);                              // Xatolikni konsolga chiqarish
    if (err instanceof Errors) res.status(err.code).json(err);                    // Maxsus xatolik bo'lsa, status va JSON bilan javob
    else res.status(Errors.standard.code).json(Errors.standard);                  // Aks holda standart xatolik javobi
  }
};

export default productController;