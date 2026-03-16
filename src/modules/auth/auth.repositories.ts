import { db } from "../../config/database";

export const createUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const query = `INSERT INTO users (name, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, name, email`;

  const result = await db.query(query, [name, email, password]);
  return result.rows[0];
};

export const findUserByEmail = async (email: string) => {
  const query = `
    SELECT *
    FROM users
    WHERE email = $1
  `;

  const result = await db.query(query, [email]);

  return result.rows[0];
};

export const findUserById = async (id: string) => {
  const query = `
    SELECT id, name, email
    FROM users
    WHERE id = $1
  `;

  const result = await db.query(query, [id]);

  return result.rows[0];
};
