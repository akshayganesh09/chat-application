import http from "http";

import { Server } from "ws";
import { verifySocketToken } from "./websocketAuth";
import { addConnection, removeConnection, sendToUser } from "./connectionManager";
import { sendMessage } from "../../services/message.service";

export const initWebSocketServer = (server: http.Server) => {
  const wss = new Server({ server });

  wss.on("connection", (socket, request) => {
    const url = new URL(request.url!, `http://${request.headers.host}`);

    console.log("url: ", url);

    const token = url.searchParams.get("token");

    if (!token) {
      socket.close();
      return;
    }

    const userId = verifySocketToken(token);

    if (!userId) {
      socket.close();
      return;
    }

    addConnection(userId, socket);

    console.log(`User connected: ${userId}`);

    socket.on("message", async (data) => {
      try {
        const message = JSON.parse(data.toString());
        console.log("Message: ", message);

        if (message.type === "SEND_MESSAGE") {
          const { conversationId, receiverId, content } = message.payload;

          const savedMessage = await sendMessage(conversationId, receiverId, content);

          sendToUser(receiverId, { type: "NEW_MESSAGE", payload: savedMessage });
        }
      } catch (error) {
        console.error("WebSocket error:", error);
      }
    });

    socket.on("close", () => {
      removeConnection(userId);

      console.log(`User disconnected: ${userId}`);
    });
  });
};
