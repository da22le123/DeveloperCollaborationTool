import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
    addUserToSession,
    changeSessionStatus,
    getListOfUsersAndInviteStatuses,
    startSession,
} from "../controllers/sessionController.js";
import { verifyLeader } from "../middlewares/verifyLeader.js";
import { handleGetSessionLastState } from "../controllers/actionController.js";

const sessionsRouter = express.Router();

sessionsRouter.post("/", verifyToken, verifyLeader, startSession);
sessionsRouter.post(
    "/:session_id/members",
    verifyToken,
    verifyLeader,
    addUserToSession,
);

sessionsRouter.patch(
    "/:session_id/status",
    verifyToken,
    verifyLeader,
    changeSessionStatus,
);
sessionsRouter.get(
    "/:session_id/users",
    verifyToken,
    verifyLeader,
    getListOfUsersAndInviteStatuses,
);

sessionsRouter.get(
    "/:session_id/state",
    verifyToken,
    handleGetSessionLastState,
);

export { sessionsRouter };
