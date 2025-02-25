import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { MessageServices } from "./message.service";

const getMessages = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageServices.getMessages(req.params.room_id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Message create successfully",
    data: result,
  });
});

const createMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageServices.createMessage(req.body, req.params.room_id, req.user.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Message create successfully",
    data: result,
  });
});

export const MessageControllers = {
  createMessage,
  getMessages
};
