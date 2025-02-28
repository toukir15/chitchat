import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { RoomServices } from "./room.service";

export interface CustomRequest extends Request {
  user: {
    id: number;
  };
}

const createRoom = catchAsync(async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;
  const result = await RoomServices.createRoom(customReq);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room create successfully!",
    data: result,
  });
});

const editRoom = catchAsync(async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;
  const result = await RoomServices.editRoom(customReq, Number(req.params.roomId));
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room edited successfully!",
    data: result,
  });
});

const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;
  const result = await RoomServices.deleteRoom(customReq, Number(req.params.roomId));
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room deleted successfully!",
    data: result,
  });
});

const joinRoom: RequestHandler<{ room_id: string }, any, any, any> = catchAsync(
  async (req, res) => {
    const customReq = req as CustomRequest;
    const result = await RoomServices.joinRoom(req.params.room_id, customReq.user.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Room joined successfully!",
      data: result,
    });
  }
);

const getJoinRoom: RequestHandler<{ room_id: string }, any, any, any> = catchAsync(
  async (req, res) => {
    const customReq = req as CustomRequest;
    const result = await RoomServices.getJoinRoom(customReq.user.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Retive joined successfully!",
      data: result,
    });
  }
);

const getRooms = catchAsync(async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;
  const result = await RoomServices.getRooms(customReq.user.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room create successfully!",
    data: result,
  });
});

export const RoomController = {
  createRoom,
  getRooms,
  joinRoom,
  editRoom,
  deleteRoom,
  getJoinRoom
};
