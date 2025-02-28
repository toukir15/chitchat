"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocket = initializeSocket;
const socket_io_1 = require("socket.io");
const soket_users_1 = require("./soket.users");
let io;
function initializeSocket(server) {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: [
                "http://localhost:3000"
            ],
            methods: ["GET", "POST"],
            credentials: true
        },
        pingTimeout: 60000,
        transports: ['websocket', 'polling']
    });
    io.on("connection", (socket) => {
        console.log("New connection");
        (0, soket_users_1.users)(socket);
        socket.on("message", ({ roomId, userId }) => {
            const filterUsers = soket_users_1.activeUsers.filter((user) => user.id != userId);
            filterUsers.map(user => {
                socket.to(user === null || user === void 0 ? void 0 : user.socketId).emit("message", roomId);
            });
        });
        socket.on("conversation", (data) => {
            const findUser = (0, soket_users_1.getFindUser)(data.receiverId);
            socket.to(findUser === null || findUser === void 0 ? void 0 : findUser.socketId).emit("conversation", data);
        });
        socket.on("room", () => {
            soket_users_1.activeUsers.map(user => {
                socket.to(user === null || user === void 0 ? void 0 : user.socketId).emit("room");
            });
        });
        socket.on("updateMessage", (id) => {
            soket_users_1.activeUsers.map(user => {
                socket.to(user === null || user === void 0 ? void 0 : user.socketId).emit("updateMessage", id);
            });
        });
        socket.on("typing", (data) => {
            const filterUsers = soket_users_1.activeUsers.filter((user) => user.id != data.userId);
            filterUsers.map(user => {
                socket.to(user === null || user === void 0 ? void 0 : user.socketId).emit("typing", data);
            });
        });
    });
    return io;
}
