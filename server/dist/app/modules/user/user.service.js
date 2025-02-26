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
exports.userService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 12);
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        profilePhoto: req.file.path
    };
    const result = prisma_1.default.user.create({
        data: userData
    });
    return result;
});
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany();
    return result;
});
// const createVendor = async (req: Request) => {
//   const file = req.file as IFile;
//   const hashedPassword: string = await bcrypt.hash(req.body.password, 12);
//   const userData = {
//     name: req.body.name,
//     email: req.body.email,
//     profilePhoto: file?.path
//   };
//   const ShopData: any = {
//     name: req.body.shopName,
//     description: req.body.description,
//   }
//   const role = req.body.role.toUpperCase();
//   const result = await prisma.$transaction(async (transactionClient) => {
//     await transactionClient.user.create({
//       data: { ...userData, password: hashedPassword, role },
//     });
//     const createVendorData = await transactionClient.vendor.create({
//       data: userData,
//     });
//     const createShop = await transactionClient.shop.create({
//       data: { ...ShopData, vendorId: createVendorData.id }
//     })
//     const updateVendor = await transactionClient.vendor.update({
//       where: { id: createVendorData.id },
//       data: { shopId: createShop.id },
//     })
//     return updateVendor;
//   });
//   return result;
// };
// const createCustomer = async (req: Request) => {
//   const file = req.file as IFile;
//   const hashedPassword: string = await bcrypt.hash(req.body.password, 12);
//   const userData = {
//     name: req.body.name,
//     email: req.body.email,
//     profilePhoto: file?.path
//   };
//   const result = await prisma.$transaction(async (transactionClient) => {
//     await transactionClient.user.create({
//       data: { ...userData, role: UserRole.CUSTOMER, password: hashedPassword },
//     });
//     const createCustomerData = await transactionClient.customer.create({
//       data: userData,
//     });
//     return createCustomerData;
//   });
//   console.log(result)
//   return result;
// };
// const getAdmins = async () => {
//   // Fetch users excluding ADMIN
//   const users = await prisma.admin.findMany();
//   // Custom sort logic for status
//   const sortedUsers = users.sort((a, b) => {
//     const statusOrder = ["ACTIVE", "BLOCKED", "DELETED"];
//     return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
//   });
//   return sortedUsers;
// };
// const getVendors = async () => {
//   // Fetch users excluding ADMIN
//   const users = await prisma.vendor.findMany();
//   // Custom sort logic for status
//   const sortedUsers = users.sort((a, b) => {
//     const statusOrder = ["ACTIVE", "BLOCKED", "DELETED"];
//     return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
//   });
//   return sortedUsers;
// };
// const getCustomers = async () => {
//   // Fetch users excluding ADMIN
//   const users = await prisma.user.findMany();
//   // Custom sort logic for status
//   const sortedUsers = users.sort((a, b) => {
//     const statusOrder = ["ACTIVE", "BLOCKED", "DELETED"];
//     return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
//   });
//   return sortedUsers;
// };
// const updateStatus = async (id: string, newStatus: UserStatus) => {
//   await prisma.user.findFirstOrThrow({
//     where: {
//       id: id,
//     },
//   });
//   // If user exists, proceed to update
//   const result = await prisma.user.update({
//     where: {
//       id: id,
//     },
//     data: {
//       status: newStatus,
//     },
//   });
//   return result;
// };
exports.userService = {
    createUser,
    getUsers
};
