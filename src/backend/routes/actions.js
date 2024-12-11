import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import { handleCreateAction } from "../controllers/actionController.js";

const actionsRouter = express.Router();

actionsRouter.post("/", verifyToken, handleCreateAction);

export { actionsRouter };
