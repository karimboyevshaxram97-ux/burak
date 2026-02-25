export const AUTH_TIMER =24;
export const MORGAN_FORMAT = ":method :url  :response-time  [:status]";

import mongoose from 'mongoose';       // Mongoose kutubxonasini import qilish

export const shapeIntoMongooseObjectId = (target: any) => {
  return typeof target === 'string'                          // Agar target string bo'lsa
    ? new mongoose.Types.ObjectId(target)                    // Uni ObjectId ga aylantirish
    : target;                                                // Aks holda o'zini qaytarish (ObjectId bo'lsa)
};