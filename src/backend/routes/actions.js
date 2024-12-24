import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import {
    handleCreateAction,
    handleGetActions,
    handleGetAction,
} from "../controllers/actionController.js";

const actionsRouter = express.Router();

actionsRouter.post("/", verifyToken, handleCreateAction);
actionsRouter.get("/:session_id", verifyToken, handleGetActions);
actionsRouter.get("/:session_id/:id", verifyToken, handleGetAction);

export { actionsRouter };
