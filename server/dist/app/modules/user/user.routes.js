"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multerUpload_1 = require("../../../helpars/multerUpload");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
// import { userController } from "./user.controller";
// import auth from "../../middlewares/auth";
// import { UserRole } from "@prisma/client";
// import { userValidation } from "./user.validation";
// import { multerUpload } from "../../../helpars/multerUpload";
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(), user_controller_1.userController.getUsers);
router.post("/", multerUpload_1.multerUpload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return user_controller_1.userController.createUser(req, res, next);
});
exports.userRoutes = router;
