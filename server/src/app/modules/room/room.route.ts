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
  auth(),
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return RoomController.createRoom(req, res, next);
  },
  RoomController.createRoom
);

router.patch(
  "/:roomId",
  auth(),
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return RoomController.editRoom(req, res, next);
  },
  RoomController.editRoom
);

router.delete(
  "/:roomId",
  auth(),
  RoomController.deleteRoom
);

router.post(
  "/:room_id/join",
  auth(),
  RoomController.joinRoom
);

router.get(
  "/join",
  auth(),
  RoomController.getJoinRoom
);




export const RoomRoutes = router;
