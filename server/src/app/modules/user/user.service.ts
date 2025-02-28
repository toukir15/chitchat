import { Request } from "express";
import prisma from "../../../shared/prisma";
import bcrypt from "bcrypt";

interface MulterRequest extends Request {
  file?: any;
}

const createUser = async (req: MulterRequest) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    profilePhoto: req.file.path
  }
  const result = prisma.user.create({
    data: userData
  })
  return result
};

const getUsers = async (id: number) => {
  const result = await prisma.user.findMany({
    where: {
      NOT: {
        id
      }
    }
  });
  return result;
};

export const userService = {
  createUser,
  getUsers
};
