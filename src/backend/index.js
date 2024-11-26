import "dotenv/config";
import cors from "cors";
import express from "express";

import usersRoute from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", usersRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
