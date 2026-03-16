import { db } from "../config/database";

export const createMessage = async (
  conversationId: string,
  senderId: string,
  content: string,
) => {
  const query = `
    INSERT INTO messages (conversation_id, sender_id, content)
    VALUES ($1, $2, $3)
    RETURNING *
    `;

  const result = await db.query(query, [conversationId, senderId, content]);

  return result.rows[0];
};
