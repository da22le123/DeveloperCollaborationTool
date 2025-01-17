import "dotenv/config";

import http from "node:http";
import { createServerApp } from "./server.js";
import { connectToDatabase } from "./database/database.js";
import { initializeSocket } from "./socket.js";
import bcrypt from "bcrypt";

const app = createServerApp();

// HTTP server creation
const server = http.createServer(app);

initializeSocket(server);

void (async () => {
    await connectToDatabase();
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    });
})();
