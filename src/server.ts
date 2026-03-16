import app from "./app";
import http from "http";

import {env} from "./config/env";
import { initWebSocketServer } from "./modules/websocket/websocketServer";

const PORT = env.port;

const server = http.createServer(app);

initWebSocketServer(server);

server.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
});