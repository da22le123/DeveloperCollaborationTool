import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import {
    handleCreateAction,
    handleGetActions,
} from "../controllers/actionController.js";

const actionsRouter = express.Router();

actionsRouter.post("/", verifyToken, handleCreateAction);
actionsRouter.get("/", verifyToken, handleGetActions);

export { actionsRouter };
