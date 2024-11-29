import "dotenv/config";
import cors from "cors";
import express from "express";
import "express-async-errors";

import { usersRouter } from "./routes/users.js";
import { connectToDatabase } from "./database/database.js";

const app = express();

app.use(express.json());
app.use(cors());

const errorHandling = (err, req, res, next) => {
    if (err.name === "ValidationError") {
        return res.status(400).json({
            error: "Validation error",
            errors: err.errors,
        });
    }
    res.status(500).json({ error: "Something went wrong!" });
};

app.use("/", usersRouter);
app.use(errorHandling);

void (async () => {
    await connectToDatabase();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    });
})();
