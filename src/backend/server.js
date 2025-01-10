import "express-async-errors";
import express from "express";
import cors from "cors";
import { usersRouter } from "./routes/users.js";
import { authRouter } from "./routes/auth.js";
import { sessionsRouter } from "./routes/session.js";
import { actionsRouter } from "./routes/actions.js";

/**
 * Handle any error coming from the Express application.
 * @param {any} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function errorHandler(err, req, res, next) {
    console.error(err);
    if (err.name === "ValidationError") {
        return res.status(400).json({
            error: "Validation error",
            errors: err.errors,
        });
    }

    res.status(500).json({ error: "Something went wrong!" });
}

export function createServerApp() {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use("/users", usersRouter);
    app.use("/tokens", authRouter);
    app.use("/sessions", sessionsRouter);
    app.use("/actions", actionsRouter);

    app.use(errorHandler);

    return app;
}
