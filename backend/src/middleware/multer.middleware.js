// middleware/multer.middleware.js
import multer from "multer";
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => cb(null, true); // do not error on "no file"
export const upload = multer({ storage, fileFilter });
