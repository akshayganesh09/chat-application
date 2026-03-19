CREATE EXTENSION IF NOT EXISTS "pgcrypto";

ALTER TABLE conversations
ALTER COLUMN id SET DEFAULT gen_random_uuid();