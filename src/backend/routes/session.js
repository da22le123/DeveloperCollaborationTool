import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
    addUserToSession,
    startSession,
} from "../controllers/sessionController.js";
import { verifyLeader } from "../middlewares/verifyLeader.js";

const sessionsRouter = express.Router();

sessionsRouter.post("/", verifyToken, verifyLeader, startSession);
sessionsRouter.post(
    "/:session_id/members",
    verifyToken,
    verifyLeader,
    addUserToSession,
);

export { sessionsRouter };
