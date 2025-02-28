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
exports.RoomServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createRoom = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = {
        name: req.body.roomData.name,
        roomImage: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path
    };
    const transaction = yield prisma_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const room = yield prisma.room.create({
            data
        });
        const roomUsers = [...req.body.roomUsers, req.user.id];
        // Create room users
        const roomUsersPromises = roomUsers.map((userId) => __awaiter(void 0, void 0, void 0, function* () {
            return prisma.roomUser.create({
                data: {
                    roomId: room.id,
                    userId
                }
            });
        }));
        yield Promise.all(roomUsersPromises);
        return room;
    }));
    return transaction;
});
const editRoom = (req, id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const editData = req.body;
    if (req.file) {
        editData.roomImage = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    }
    const result = yield prisma_1.default.room.update({
        where: {
            id: id
        },
        data: editData
    });
    return result;
});
const deleteRoom = (req, roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const transaction = yield prisma_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.roomUser.deleteMany({
            where: {
                roomId,
                userId,
            },
        });
        yield prisma.message.deleteMany({
            where: {
                roomId,
            },
        });
        yield prisma.room.delete({
            where: {
                id: roomId,
            },
        });
        return { success: true };
    }));
    return transaction;
});
const joinRoom = (roomId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.roomUser.create({
        data: { roomId: Number(roomId), userId: Number(userId) }
    });
    return result;
});
const getJoinRoom = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const roomUsers = yield prisma_1.default.roomUser.findMany({
        where: { userId },
        select: { roomId: true }
    });
    const joinedRoomIds = roomUsers.map((roomUser) => roomUser.roomId);
    const availableRooms = yield prisma_1.default.room.findMany({
        where: {
            id: {
                notIn: joinedRoomIds
            }
        }
    });
    return availableRooms;
});
const getRooms = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId)
        return;
    const findRoomUsers = yield prisma_1.default.roomUser.findMany({
        where: { userId }
    });
    const roomIds = findRoomUsers.map(room => room.roomId);
    const result = yield prisma_1.default.room.findMany({
        where: {
            id: { in: roomIds }
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    const findRoomUser = yield Promise.all(result.map((room) => __awaiter(void 0, void 0, void 0, function* () {
        const findUsers = yield prisma_1.default.roomUser.findMany({
            where: { roomId: room.id }
        });
        const users = findUsers.map(user => user.userId);
        return Object.assign(Object.assign({}, room), { users });
    })));
    return findRoomUser;
});
exports.RoomServices = {
    createRoom,
    getRooms,
    joinRoom,
    editRoom,
    deleteRoom,
    getJoinRoom
};
