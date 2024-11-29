import express from "express";
import { handleLogin } from "../controllers/usersController.js";

const usersRouter = express.Router();

usersRouter.post("/tokens", handleLogin);

export { usersRouter };
