import { db } from "../config/database";

export const createConversation = async () => {
  try {
    console.log("Hello");
    const query = `INSERT INTO conversations DEFAULT VALUES RETURNING id`;
    const result = await db.query(query);
    console.log(result);

    return result.rows[0].id; // Returns the new UUID
  } catch (error) {
    console.error("DB ERROR:", error);
    throw error;
  }
};

export const createConversationParticipants = async (
  conversationId: string,
  userId: string,
) => {
  const query = `INSERT INTO conversation_participants(conversation_id, user_id) VALUES ($1, $2)`;
  await db.query(query, [conversationId, userId]);
};


// To be learn...
export const findExistingOneToOne = async (userAId: string, userBId: string) => {
  const query = `
    SELECT conversation_id
    FROM conversation_participants
    WHERE user_id IN ($1, $2)
    GROUP BY conversation_id
    HAVING COUNT(user_id) = 2
    AND conversation_id IN (
        SELECT conversation_id 
        FROM conversation_participants 
        GROUP BY conversation_id 
        HAVING COUNT(*) = 2
    );
  `;
  const result = await db.query(query, [userAId, userBId]);
  return result.rows.length > 0 ? result.rows[0].conversation_id : null;
};