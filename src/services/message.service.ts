import { createMessage } from "../repositories/message.repository";

export const sendMessage = async (
  conversationId: string,
  senderId: string,
  content: string,
) => {
  const message = await createMessage(conversationId, senderId, content);

  return message;
};
