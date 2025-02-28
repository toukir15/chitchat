import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { userService } from "./user.service";
import { CustomRequest } from "../room/room.controller";


const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUser(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Created successfuly!",
    data: result,
  });
});

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;
  const result = await userService.getUsers(customReq.user.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrive successfuly!",
    data: result,
  });
});


export const userController = {
  createUser,
  getUsers
};
