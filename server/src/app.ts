import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";

const app: Application = express();
app.use(cors({
  origin: ['https://chitchatclient-lusye7wj0-toukirdeveloperbdgmailcoms-projects.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cron.schedule('* * * * *', () => {
//     try {
//         AppointmentService.cancelUnpaidAppointments();
//     }
//     catch (err) {
//         console.error(err);
//     }
// });

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Chat App Server..",
  });
});

app.use("/api/v1", router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});

export default app;
