import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validateAndStartSession } from "../controllers/sessionController.js";
import { verifyLeader } from "../middlewares/verifyLeader.js";

const sessionsRouter = express.Router();

sessionsRouter.post("/", verifyToken, verifyLeader, validateAndStartSession);

export { sessionsRouter };
