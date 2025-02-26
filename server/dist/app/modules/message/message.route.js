"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRoutes = void 0;
const express_1 = __importDefault(require("express"));
const message_controller_1 = require("./message.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get("/:room_id/messages", (0, auth_1.default)(), message_controller_1.MessageControllers.getMessages);
router.post("/:room_id/messages", (0, auth_1.default)(), message_controller_1.MessageControllers.createMessage);
exports.MessageRoutes = router;
