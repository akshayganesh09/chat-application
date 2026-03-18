import { db } from "../config/database";

export const updateLastSeen = async (userId: string) => {
  const query = `
    UPDATE users SET last_seen = now() WHERE id = $1
    `;

    await db.query(query, [userId]);
};
