import express from "express";
import { MessageControllers } from "./message.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/:room_id/messages", auth(), MessageControllers.getMessages);
router.post("/:room_id/messages", auth(), MessageControllers.createMessage);

export const MessageRoutes = router;
