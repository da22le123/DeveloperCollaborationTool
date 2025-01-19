import express from "express";
import {
    handleNewUser,
    getListOfAllUsers,
    handleModifyUser,
    handleGetUser,
    deleteUser,
    handleChangeUserPassword,
} from "../controllers/usersController.js";
import { verifyIfAdmin } from "../middlewares/verifyAdmin.js";
import { verifyLeader } from "../middlewares/verifyLeader.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getAvailableSessionsPerUser } from "../controllers/usersController.js";

const usersRouter = express.Router();

usersRouter.post("/", verifyToken, verifyIfAdmin, handleNewUser);
usersRouter.get("/", verifyToken, verifyIfAdmin, getListOfAllUsers);
usersRouter.get("/sessions", verifyToken, getAvailableSessionsPerUser);
usersRouter.patch("/:id", verifyToken, verifyIfAdmin, handleModifyUser);
usersRouter.get("/:id", verifyToken, verifyIfAdmin, handleGetUser);
usersRouter.delete("/:id", verifyToken, verifyIfAdmin, deleteUser);
usersRouter.put("/:id/password", verifyToken, handleChangeUserPassword);

export { usersRouter };
