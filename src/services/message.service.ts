import { sendToUser } from "../modules/websocket/connectionManager";
import { createMessage, getConversationParticipants } from "../repositories/message.repository";

export const sendMessage = async (
  conversationId: string,
  senderId: string,
  content: string,
) => {
  const message = await createMessage(conversationId, senderId, content);

  const participants = await getConversationParticipants(conversationId);

  participants.forEach((participant: { user_id: string }) => {
    if (participant.user_id !== senderId) {
      sendToUser(participant.user_id, {
        type: "NEW_MESSAGE",
        payload: message
      });
    }
  });

  return message;
};
