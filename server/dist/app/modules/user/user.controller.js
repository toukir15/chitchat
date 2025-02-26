"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const user_service_1 = require("./user.service");
// const getUsers = catchAsync(async (req: Request, res: Response) => {
//   const result = await userService.getUsers();
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Retrive users successfuly!",
//     data: result,
//   });
// });
// const getAdmins = catchAsync(async (req: Request, res: Response) => {
//   const result = await userService.getAdmins();
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Retrive admins successfuly!",
//     data: result,
//   });
// });
// const getVendors = catchAsync(async (req: Request, res: Response) => {
//   const result = await userService.getVendors();
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Retrive vendors successfuly!",
//     data: result,
//   });
// });
// const getCustomers = catchAsync(async (req: Request, res: Response) => {
//   const result = await userService.getCustomers();
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Retrive customers successfuly!",
//     data: result,
//   });
// });
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.createUser(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Created successfuly!",
        data: result,
    });
}));
const getUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getUsers();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Users retrive successfuly!",
        data: result,
    });
}));
// const createCustomer = catchAsync(async (req: Request, res: Response) => {
//   const result = await userService.createCustomer(req);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Customer Created successfuly!",
//     data: result,
//   });
// });
// const updateStatus = catchAsync(async (req: Request, res: Response) => {
//   const userId = req.params.userId;
//   const newStatus = req.body.status;
//   console.log(newStatus)
//   const result = await userService.updateStatus(userId, newStatus);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Update user status successfuly!",
//     data: result,
//   });
// });
exports.userController = {
    createUser,
    getUsers
};
