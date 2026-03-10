import { ExtendedRequest } from "../libs/types/member";
import { T } from "../libs/types/common";
import { Response } from "express";
import Errors, { HttpCode } from "../libs/types/errors";
import OrderService from  "../models/Order.service";
import { OrderInquiry, OrderUpdateInput } from "../libs/types/order";
import { OrderStatus } from "../libs/types/enums/order.enum";


const orderService = new OrderService();

const orderController: T = {};

//=========================================================================
orderController.createOrder = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("createOrder");
    const result = await orderService.createOrder(req.member, req.body);

    res.status(HttpCode.CREATED).json({});
  } catch (err) {
    console.log("Error, createOrder:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};


  //==========================================================================
    orderController.getMyOrders = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("getMyOrders");
    const { page, limit, orderStatus } = req.query; //Frontenddan kelgan query parametrlar olinadi.
    const inquiry: OrderInquiry = {      //Bu pagination + filter uchun ishlatiladi.
      page: Number(page),           //page va limit numberga o‘tkaziladi.
      limit: Number(limit),
      orderStatus: orderStatus as OrderStatus,  //orderStatus enum typega cast qilinadi.
    };
    console.log("inquiry:", inquiry);
    const result = await orderService.getMyOrders(req.member, inquiry);
     // req.member → login bo‘lgan user.  inquiry → filter parametrlari.

    res.status(HttpCode.CREATED).json(result);
  } catch (err) {
    console.log("Error, getMyOrders:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
  
  //============================================================================

   orderController.updateOrder = async (req: ExtendedRequest, res: Response) => {
     try {
       console.log("updateOrder");
       const input: OrderUpdateInput = req.body;  //Frontend yuborgan ma’lumot olinadi.
       const result = await orderService.updateOrder(req.member, input);
       /**Asosiy biznes logika service ichida bajariladi.

       req.member → kim yangilayotganini bilish uchun.
       input → qanday o‘zgarish qilish kerak.
       await → DB operatsiyasi tugaguncha kutadi. */

       res.status(HttpCode.CREATED).json(result);
     } catch (err) {
       console.log("Error, updateOrder:", err);
       if (err instanceof Errors) {
         res.status(err.code).json(err);
       } else {
         res.status(Errors.standard.code).json(Errors.standard);
       }
     }
};

export default orderController;