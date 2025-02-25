import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { RoomServices } from "./room.service";

// const getProducts = catchAsync(async (req: CustomRequest, res: Response) => {
//   const filters = pick(req.query, ["searchTerm", "category", "brand", "price", "shopId"]);
//   const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
//   const result = await ProductService.getProducts(filters, options);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Retrive products successfully",
//     meta: result.meta,
//     data: result.data,
//   });
// });

const createRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.createRoom(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room create successfully!",
    data: result,
  });
});

const joinRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.joinRoom(req.params.room_id, req.user.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room create successfully!",
    data: result,
  });
});

const getRooms = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.getRooms(req.user.id);
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
  joinRoom
};
