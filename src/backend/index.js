import "dotenv/config";

import http from "node:http";
import { createServerApp } from "./server.js";
import {
    connectToDatabase,
    createDefaultAdminUser,
} from "./database/database.js";
import { initializeSocket } from "./socket.js";

const app = createServerApp();

// HTTP server creation
const server = http.createServer(app);

initializeSocket(server);

async function startServer() {
    await connectToDatabase();

    // Create a default administrator account if there is none.
    await createDefaultAdminUser();

    const port = process.env.PORT || 3000;
    server.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
}

startServer();
