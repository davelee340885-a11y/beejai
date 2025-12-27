import { drizzle } from "drizzle-orm/mysql2";
const db = drizzle(process.env.DATABASE_URL || "");

const result = await db.execute("SELECT id, name, nameEn FROM schools WHERE id = 2");
console.log("School with ID=2:", result[0][0]);

const result2 = await db.execute("SELECT id, name, nameEn FROM schools WHERE name LIKE '%仁愛堂劉皇發夫人小學%'");
console.log("\n仁愛堂劉皇發夫人小學:", result2[0][0]);

process.exit(0);
