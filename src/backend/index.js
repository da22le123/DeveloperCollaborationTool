import "dotenv/config";
import cors from "cors";
import express from "express";
import {connectToDatabase} from "./database/database.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

void (async () => {
    await connectToDatabase()
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    });
})()
