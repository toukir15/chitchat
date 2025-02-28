import prisma from "../../../shared/prisma";

const getMessages = async (roomId: string) => {
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


const createMessage = async (data: any, roomId: string, userId: number) => {
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

const editMessage = async (messageId: number, data: { text: string }) => {
  const result = await prisma.message.update({
    where: {
      id: messageId
    },
    data
  });
  return result;
};

const deleteMessage = async (id: number) => {
  const result = await prisma.message.delete({
    where: {
      id
    },
  });
  return result;
};


export const MessageServices = {
  createMessage,
  getMessages,
  editMessage,
  deleteMessage
};
