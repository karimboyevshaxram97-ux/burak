import path from "path";
import multer from "multer";
import { v4  } from "uuid";

/** MULTER IMAGE UPLOADER **/
function getTargetImageStorage(address: any) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/${address}`);
    },
    filename: function (req, file, cb) {
      const extension = path.parse(file.originalname).ext;
      const random_name = v4() + extension;
      cb(null, random_name);
    },
  });
}

const makeUploader = (address: string) => {
  const storage = getTargetImageStorage(address);
  return multer({ storage: storage });
};

export default makeUploader;


/*
const product_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/products");
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const filename = uuidv4() + extension;
    cb(null, filename);
  },
});

export const uploadProductImage = multer({ storage: product_storage });
*/