import express from "express";
import { handleNewUser } from "../controllers/usersController.js";
import { verifyIfAdmin } from "../middlewares/verifyAdmin.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const usersRouter = express.Router();

usersRouter.post("/", verifyToken, verifyIfAdmin, handleNewUser);

export { usersRouter };
