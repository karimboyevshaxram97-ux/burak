import OrderItemModel from "../schema/OrderItem.model";
import OrderModel from "../schema/Order.model";
import { Member } from "../libs/types/member";
import { Order, OrderInquiry, OrderItemInput, OrderUpdateInput } from "../libs/types/order";
import { shapeIntoMongooseObjectId } from "../libs/types/config";
import Errors, { HttpCode, Message } from "../libs/types/errors";
import {ObjectId} from "mongoose";
import { OrderStatus } from "../libs/types/enums/order.enum";
import MemberService from "./Members.service";

class OrderService {
  private readonly orderModel;  // Order collection bilan ishlaydigan Mongoose model
  private readonly orderItemModel;  // OrderItem collection (buyurtma ichidagi mahsulotlar) modeli
  private readonly memberService;   // Member bilan bog‘liq biznes logika servisi

  constructor() {
    this.orderModel = OrderModel;       // OrderModel ni class ichida ishlatish uchun biriktirib qo‘yadi
    this.orderItemModel = OrderItemModel;  // OrderItemModel ni biriktiradi
    this.memberService = new MemberService();  // MemberService dan yangi obyekt yaratadi (composition)
  }
//==========================================================
  public async createOrder(
    member: Member,
    input: OrderItemInput[]
  ): Promise<Order> {
    const memberId = shapeIntoMongooseObjectId(member._id);
    const amount = input.reduce((accumulator: number, item: OrderItemInput) => {
      return accumulator + item.itemPrice * item.itemQuantity;
    }, 0);
    const delivery = amount < 100 ? 5 : 0;
 
     
    try {
  const newOrder: Order = await this.orderModel.create({
    orderTotal: amount + delivery,
    orderDelivery: delivery,
    memberId: memberId,
  });
       
      const orderId = newOrder._id;
      console.log("orderId:", newOrder._id);
      await this.recordOrderItem(orderId, input);
      
      return newOrder;
    } catch (err) {
     console.log("Error, model:createOrder:", err);
     throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

    }
}


//====================================================================
private async recordOrderItem(
  orderId: ObjectId,                 // Qaysi orderga tegishli ekanligini bildiruvchi ID
  input: OrderItemInput[]            // Buyurtma ichidagi mahsulotlar ro‘yxati
): Promise<void> {                   // Hech narsa qaytarmaydi (faqat yozish operatsiyasi)

  const promisedList = input.map(async (item: OrderItemInput) => {
    // Har bir mahsulot uchun async funksiya (Promise) yaratiladi

    item.orderId = orderId; 
    // Mahsulotga orderId biriktiriladi (relationship o‘rnatiladi)

    item.productId = shapeIntoMongooseObjectId(item.productId); 
    // productId MongoDB ObjectId formatga o‘tkaziladi

    await this.orderItemModel.create(item); 
    // Har bir mahsulot OrderItem collection ga yoziladi

    return "INSERTED"; 
    // Har bir muvaffaqiyatli yozish uchun status qaytariladi
  });

  const orderItemsState = await Promise.all(promisedList);
  // Barcha Promise lar parallel bajariladi va hammasi tugaguncha kutadi

  console.log("orderItemsState:", orderItemsState);
  // Natijani log qiladi (masalan: ["INSERTED", "INSERTED"])
}

//=======================================================================
public async getMyOrders(
    member: Member,
    inquiry: OrderInquiry
): Promise<Order[]> {
    const memberId = shapeIntoMongooseObjectId(member._id);
    const matches = { memberId: memberId, orderStatus: inquiry.orderStatus }; // shu memberga tegishli  shu statusdagi orderlar

    const result = await this.orderModel
        .aggregate([                     //Bu MongoDB aggregation pipeline ishlatadi.
            { $match: matches },          //Faqat kerakli orderlarni filtrlaydi.
            { $sort: { updateAt: -1 } },   //Eng oxirgi yangilangan order tepada chiqadi.
            { $skip: (inquiry.page - 1) * inquiry.limit },  //  Pagination uchun. page = 2  limit = 5
            { $limit: inquiry.limit },  //Nechta order qaytarilishini belgilaydi.
            {
                $lookup: {
                    from: "orderItems",    //orderItems collection bilan join qiladi.
                    localField: "_id",      //id → orderId bilan bog‘laydi.
                    foreignField: "orderId",  //Natija orderItems array sifatida qo‘shiladi.
                    as: "orderItems",
                },
            },
            {
                $lookup: {
                    from: "products",                   //Endi product ma’lumotlarini ham olib keladi.
                    localField: "orderItems.productId",   //orderItems ichidagi productId orqali.
                    foreignField: "_id",
                    as: "productData",      //Natija productData array bo‘ladi.-
                },
            },
        ])
        .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
 }
//==============================================================================
 public async updateOrder(
  member: Member,
  input: OrderUpdateInput
): Promise<Order> {
  const memberId = shapeIntoMongooseObjectId(member._id),
        orderId = shapeIntoMongooseObjectId(input.orderId),
        orderStatus = input.orderStatus;

  const result = await this.orderModel  //
    .findOneAndUpdate(
      {
        memberId: memberId,   //Bu xavfsizlik uchun muhim.
        _id: orderId,         //Boshqa user boshqa orderni update qila olmaydi.
      },
      { orderStatus: orderStatus },  //  Faqat orderStatus maydoni o‘zgartiriladi.
      { new: true }                  //new: true → yangilangan hujjatni qaytaradi.
    )
    .exec();

  if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

  if (orderStatus === OrderStatus.PROCESS) {
    await this.memberService.addUserPoint(member, 1);
  }
  /** Agar order statusi PROCESS bo‘lsa:
   * Foydalanuvchiga 1 point qo‘shiladi.
   * addUserPoint() chaqiriladi. */

  return result;
}

}

export default OrderService;