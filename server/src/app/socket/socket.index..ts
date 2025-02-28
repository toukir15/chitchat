import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { activeUsers, getFindUser, users } from "./soket.users";

let io: SocketIOServer;

export function initializeSocket(server: HTTPServer): SocketIOServer {
  io = new SocketIOServer(server, {
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
    users(socket);

    socket.on("message", ({ roomId, userId }) => {
      const filterUsers = activeUsers.filter((user) => user.id != userId)
      filterUsers.map(user => {
        socket.to(user?.socketId as string).emit("message", roomId);
      })
    });


    socket.on("conversation", (data) => {
      const findUser = getFindUser(data.receiverId);
      socket.to(findUser?.socketId as string).emit("conversation", data);
    });

    socket.on("room", () => {
      activeUsers.map(user => {
        socket.to(user?.socketId as string).emit("room");
      })
    });

    socket.on("updateMessage", (id) => {
      activeUsers.map(user => {
        socket.to(user?.socketId as string).emit("updateMessage", id);
      })
    });

    socket.on("typing", (data) => {
      const filterUsers = activeUsers.filter((user) => user.id != data.userId)
      filterUsers.map(user => {
        socket.to(user?.socketId as string).emit("typing", data);
      })
    });
  });

  return io;
}
