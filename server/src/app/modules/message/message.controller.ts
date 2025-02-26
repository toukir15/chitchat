import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { MessageServices } from "./message.service";
interface CustomRequest extends Request {
  user: {
    id: number;
  };
}

const getMessages = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageServices.getMessages(req.params.room_id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Message create successfully",
    data: result,
  });
});

const createMessage: RequestHandler<{ room_id: string }, any, any, any> = catchAsync(
  async (req, res) => {
    const customReq = req as CustomRequest;
    const result = await MessageServices.createMessage(
      req.body,
      req.params.room_id,
      customReq.user.id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Message created successfully",
      data: result,
    });
  }
);

export const MessageControllers = {
  createMessage,
  getMessages
};
