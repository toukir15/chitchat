import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../config/cloudinary";

const removeExtension = (filename: string) => {
  return filename?.split(".").slice(0, -1).join(".");
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary, // ✅ এখানে `cloudinary.v2` পাস করো
  params: {
    public_id: (_req, file) =>
      Math.random().toString(36).substring(2) +
      "-" +
      Date.now() +
      "-" +
      file?.fieldname +
      "-" +
      removeExtension(file?.originalname),
  },
});
export const multerUpload = multer({ storage: storage });
