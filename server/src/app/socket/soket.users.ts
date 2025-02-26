import { Socket } from "socket.io";

interface ActiveUser {
  id: number;
  socketId: string;
}

// Active user list
export const activeUsers: ActiveUser[] = [];

// Find user function
export const getFindUser = (userId: number) => {
  return activeUsers.find((user) => user.id === userId);
};

export const users = (socket: Socket) => {
  socket.on("user", (id: number) => {
    activeUsers.forEach((user, index) => {
      if (user.id === id) {
        activeUsers.splice(index, 1);
      }
    });

    activeUsers.push({ id, socketId: socket.id });

    console.log(activeUsers);

    socket.emit("online", activeUsers);
    socket.broadcast.emit("online", activeUsers);
  });


  socket.on("disconnect", () => {
    const index = activeUsers.findIndex((user) => user.socketId === socket.id);
    if (index !== -1) {
      activeUsers.splice(index, 1);
      console.log(`User disconnected: ${socket.id}`);
      socket.broadcast.emit("online", activeUsers);
    }
  });
};
