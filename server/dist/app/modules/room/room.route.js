"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRoutes = void 0;
const express_1 = __importDefault(require("express"));
const room_controller_1 = require("./room.controller");
const multerUpload_1 = require("../../../helpars/multerUpload");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(), room_controller_1.RoomController.getRooms);
router.post("/", (0, auth_1.default)(), multerUpload_1.multerUpload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return room_controller_1.RoomController.createRoom(req, res, next);
}, room_controller_1.RoomController.createRoom);
router.patch("/:roomId", (0, auth_1.default)(), multerUpload_1.multerUpload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return room_controller_1.RoomController.editRoom(req, res, next);
}, room_controller_1.RoomController.editRoom);
router.delete("/:roomId", (0, auth_1.default)(), room_controller_1.RoomController.deleteRoom);
router.post("/:room_id/join", (0, auth_1.default)(), room_controller_1.RoomController.joinRoom);
router.get("/join", (0, auth_1.default)(), room_controller_1.RoomController.getJoinRoom);
exports.RoomRoutes = router;
