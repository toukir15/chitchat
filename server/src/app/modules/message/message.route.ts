import express from "express";
import { MessageControllers } from "./message.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/:room_id/messages", auth(), MessageControllers.getMessages);
router.post("/:room_id/messages", auth(), MessageControllers.createMessage);
router.patch("/:message_id", auth(), MessageControllers.editMessage);
router.delete("/:message_id", auth(), MessageControllers.deleteMessage);

export const MessageRoutes = router;
