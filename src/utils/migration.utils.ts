import fs from "fs";
import path from "path";

import { db } from "../config/database";

const runMigration = async () => {
  const migrationPath = path.join(__dirname, "../../migrations");

  const files = fs.readdirSync(migrationPath).sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationPath, file), "utf-8");

    await db.query(sql);
  }

  process.exit();
};

runMigration();
