import { Request } from "express";
import prisma from "../../../shared/prisma";

const createRoom = async (req: Request) => {

  const data: { name: string, roomImage: any } = {
    name: req.body.roomData.name,
    roomImage: req.file?.path
  }

  const transaction = await prisma.$transaction(async (prisma) => {
    const room = await prisma.room.create({
      data
    });

    // Create room users
    const roomUsersPromises = req.body.roomUsers.map(async (userId: any) => {
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

const joinRoom = async (roomId: string, userId: number) => {
  await prisma.roomUser.findFirstOrThrow({
    where: {
      AND: [
        { roomId: Number(roomId) },
        { userId: Number(userId) }
      ]
    }
  });

  const result = await prisma.roomUser.create({
    data: { roomId: Number(roomId), userId: Number(userId) }
  })
  return result
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
  joinRoom
};
