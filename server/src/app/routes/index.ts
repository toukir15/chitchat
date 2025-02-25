import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { RoomRoutes } from "../modules/room/room.route";
import { MessageRoutes } from "../modules/message/message.route";
import { userRoutes } from "../modules/user/user.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/room",
    route: RoomRoutes,
  },
  {
    path: "/message",
    route: MessageRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
