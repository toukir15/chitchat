import prisma from "../../../shared/prisma";
import { CustomRequest } from "./room.controller";

const createRoom = async (req: CustomRequest) => {
  const data: { name: string, roomImage: any } = {
    name: req.body.roomData.name,
    roomImage: req.file?.path
  }

  const transaction = await prisma.$transaction(async (prisma) => {
    const room = await prisma.room.create({
      data
    });

    const roomUsers = [...req.body.roomUsers, req.user.id]

    // Create room users
    const roomUsersPromises = roomUsers.map(async (userId: any) => {
      return prisma.roomUser.create({
        data: {
          roomId: room.id,
          userId
        }
      });
    });

    await Promise.all(roomUsersPromises);

    return room;
  });

  return transaction;
};

const editRoom = async (req: CustomRequest, id: number) => {
  const editData = req.body;
  if (req.file) {
    editData.roomImage = req.file?.path;
  }
  const result = await prisma.room.update({
    where: {
      id: id
    },
    data: editData
  });
  return result;
};

const deleteRoom = async (req: CustomRequest, roomId: number) => {
  const userId = req.user.id;

  const transaction = await prisma.$transaction(async (prisma) => {
    await prisma.roomUser.deleteMany({
      where: {
        roomId,
        userId,
      },
    });

    await prisma.message.deleteMany({
      where: {
        roomId,
      },
    });

    await prisma.room.delete({
      where: {
        id: roomId,
      },
    });

    return { success: true };
  });

  return transaction;
};


const joinRoom = async (roomId: string, userId: number) => {
  const result = await prisma.roomUser.create({
    data: { roomId: Number(roomId), userId: Number(userId) }
  })
  return result
};

const getJoinRoom = async (userId: number) => {
  const roomUsers = await prisma.roomUser.findMany({
    where: { userId },
    select: { roomId: true }
  });

  const joinedRoomIds = roomUsers.map((roomUser) => roomUser.roomId);

  const availableRooms = await prisma.room.findMany({
    where: {
      id: {
        notIn: joinedRoomIds
      }
    }
  });

  return availableRooms;
};


const getRooms = async (userId: number) => {
  if (!userId) return;

  const findRoomUsers = await prisma.roomUser.findMany({
    where: { userId }
  });

  const roomIds = findRoomUsers.map(room => room.roomId);

  const result = await prisma.room.findMany({
    where: {
      id: { in: roomIds }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  const findRoomUser = await Promise.all(
    result.map(async (room) => {
      const findUsers = await prisma.roomUser.findMany({
        where: { roomId: room.id }
      });
      const users = findUsers.map(user => user.userId);
      return { ...room, users };
    })
  );

  return findRoomUser;
};

export const RoomServices = {
  createRoom,
  getRooms,
  joinRoom,
  editRoom,
  deleteRoom,
  getJoinRoom
};
