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

const editMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageServices.editMessage(Number(req.params.message_id), req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Message edited successfully",
    data: result,
  });
});

const deleteMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageServices.deleteMessage(Number(req.params.message_id));
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Message delete successfully",
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
  getMessages,
  editMessage,
  deleteMessage
};
