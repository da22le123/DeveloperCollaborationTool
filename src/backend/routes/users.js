import express from "express";
import {
    handleNewUser,
    getListOfAllUsers,
    handleModifyUser,
} from "../controllers/usersController.js";
import { verifyIfAdmin } from "../middlewares/verifyAdmin.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const usersRouter = express.Router();

usersRouter.post("/", verifyToken, verifyIfAdmin, handleNewUser);
usersRouter.get("/", verifyToken, verifyIfAdmin, getListOfAllUsers);
usersRouter.patch("/:id", verifyToken, verifyIfAdmin, handleModifyUser);

export { usersRouter };
