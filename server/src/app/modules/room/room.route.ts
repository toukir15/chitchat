import express, { NextFunction, Request, Response } from "express";
import { RoomController } from "./room.controller";
import { multerUpload } from "../../../helpars/multerUpload";
import auth from "../../middlewares/auth";
const router = express.Router();

router.get(
  "/",
  auth(),
  RoomController.getRooms
);


router.post(
  "/",
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return RoomController.createRoom(req, res, next);
  },
  RoomController.createRoom
);

router.post(
  "/:room_id/join",
  auth(),
  RoomController.joinRoom
);


// router.delete(
//   "/:productId",
//   auth(UserRole.VENDOR, UserRole.ADMIN),
//   ProductController.deleteProduct
// );

export const RoomRoutes = router;
