import http from "http";

import { Server } from "ws";
import { verifySocketToken } from "./websocketAuth";
import { addConnection, getAllConnectedUser, removeConnection, sendToUser } from "./connectionManager";
import { sendMessage } from "../../services/message.service";
import { updateLastSeen } from "../../repositories/user.repository";

export const initWebSocketServer = (server: http.Server) => {
  const wss = new Server({ server });

  // Socket Connection...
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

    // When User-A connects - sever broadcast to everyone User-A is online.
    broadCast({ type: "USER_ONLINE", payload: { userId } });

    // Socket Message...
    socket.on("message", async (data) => {
      try {
        const message = JSON.parse(data.toString());
        console.log("Message: ", message);

        // User typing...
        if (message.type === "TYPING_START") {
          const { receiverId } = message.payload;

          sendToUser(receiverId, { type: "USER_TYPING" });
        }

        // User typing...
        if (message.type === "TYPING_STOP") {
           const { receiverId } = message.payload;

          sendToUser(receiverId, { type: "USER_STOP_TYPING" });
        }

        // User sends message...
        if (message.type === "SEND_MESSAGE") {
          const { conversationId, receiverId, content } = message.payload;

          const savedMessage = await sendMessage(conversationId, receiverId, content);

          sendToUser(receiverId, { type: "NEW_MESSAGE", payload: savedMessage });
        }
      } catch (error) {
        console.error("WebSocket error:", error);
      }
    });

    // Socket Close...
    socket.on("close", async () => {
      removeConnection(userId);

      await updateLastSeen(userId);

      // When User-A disconnects - sever broadcast to everyone User-A is offline.
      broadCast({ type: "USER_ONLINE", payload: { userId } });

      console.log(`User disconnected: ${userId}`);
    });
  });
};

export const broadCast = (data: any) => {
  const users = getAllConnectedUser();

  users.forEach((userId) => {
    sendToUser(userId, data);
  })
};