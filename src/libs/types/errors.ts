export enum HttpCode {
  OK = 200,
  CREATED = 201,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

// HTTP status kodlariga mos keladigan xabarlar ro'yxati
export enum Message {
  SOMETHING_WENT_WRONG = "Something went wrong!",       // Noma'lum xatolik yuz berdi
  NO_DATA_FOUND = "No data is found!",                   // Ma'lumot topilmadi
  CREATE_FAILED = "Create is failed!",                   // Yaratish jarayoni muvaffaqiyatsiz tugadi
  UPDATE_FAILED = "Update is failed!",                   // Yangilash jarayoni muvaffaqiyatsiz tugadi
}

// Maxsus xatolik klassi, umumiy Error klassidan meros oladi
class Errors extends Error {
  public code: HttpCode;         // HTTP status kodi
  public message: Message;       // Xatolik haqida xabar

  // Konstruktor: yangi xatolik obyektini yaratadi
  constructor(statusCode: HttpCode, statusMessage: Message) {
    super();                     // Error klassining konstruktorini chaqiradi
    this.code = statusCode;     // Kodni belgilaydi
    this.message = statusMessage; // Xabarni belgilaydi
  }
}

// Bu klassni boshqa fayllarda ishlatish uchun eksport qilamiz
export default Errors;