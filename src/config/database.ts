import { Pool } from "pg";
import { env } from "../config/env";

export const db = new Pool({
    host: env.host,
    port: env.db_port,
    user: env.user,
    password: env.password,
    database: env.database
});

db.connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch((err) => console.error("DB connection error", err));