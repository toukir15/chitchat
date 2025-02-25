import prisma from "../../../shared/prisma";

const getMessages = async (roomId: string) => {
  console.log(roomId)
  const result = await prisma.message.findMany({
    where: {
      roomId: Number(roomId)
    },
    include: {
      user: true
    },
  });
  return result;
};


const createMessage = async (data: any, roomId: number, userId: string) => {
  const messageData = {
    text: data.text,
    roomId: Number(roomId),
    userId: Number(userId)
  }
  const result = await prisma.message.create({
    data: messageData
  });
  return result;
};


export const MessageServices = {
  createMessage,
  getMessages
};
