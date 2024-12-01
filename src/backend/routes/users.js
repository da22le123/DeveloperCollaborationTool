import express from "express";
import {
    handleNewUser,
    getListOfAllUsers,
    handleModifyUser,
    handleGetUser,
} from "../controllers/usersController.js";
import { verifyIfAdmin } from "../middlewares/verifyAdmin.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getAvailableSessionsPerUser} from "../controllers/usersController.js";

const usersRouter = express.Router();

usersRouter.post("/", verifyToken, verifyIfAdmin, handleNewUser);
usersRouter.get("/", verifyToken, verifyIfAdmin, getListOfAllUsers);
usersRouter.patch("/:id", verifyToken, verifyIfAdmin, handleModifyUser);
usersRouter.get("/:id", verifyToken, verifyIfAdmin, handleGetUser);

usersRouter.get("/:userId/sessions", verifyToken, getAvailableSessionsPerUser);


export { usersRouter };
