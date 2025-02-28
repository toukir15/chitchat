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
exports.MessageServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getMessages = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.message.findMany({
        where: {
            roomId: Number(roomId)
        },
        include: {
            user: true
        },
    });
    return result;
});
const createMessage = (data, roomId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const messageData = {
        text: data.text,
        roomId: Number(roomId),
        userId: Number(userId)
    };
    const result = yield prisma_1.default.message.create({
        data: messageData
    });
    return result;
});
const editMessage = (messageId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.message.update({
        where: {
            id: messageId
        },
        data
    });
    return result;
});
const deleteMessage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.message.delete({
        where: {
            id
        },
    });
    return result;
});
exports.MessageServices = {
    createMessage,
    getMessages,
    editMessage,
    deleteMessage
};
