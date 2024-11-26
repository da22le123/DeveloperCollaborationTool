import express from "express";
import {handleLogin} from "../controllers/usersController.js";

const router = express.Router();

router.post('/tokens', handleLogin);

export default router;