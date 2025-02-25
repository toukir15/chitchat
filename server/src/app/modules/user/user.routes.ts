import express, { NextFunction, Request, Response } from "express";
import { multerUpload } from "../../../helpars/multerUpload";
import { userController } from "./user.controller";
// import { userController } from "./user.controller";
// import auth from "../../middlewares/auth";
// import { UserRole } from "@prisma/client";
// import { userValidation } from "./user.validation";
// import { multerUpload } from "../../../helpars/multerUpload";

const router = express.Router();

router.get("/", userController.getUsers);

router.post(
  "/",
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return userController.createUser(req, res, next);
  }
);


export const userRoutes = router;
