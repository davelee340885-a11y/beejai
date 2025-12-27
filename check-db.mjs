import { drizzle } from "drizzle-orm/mysql2";

const dbUrl = process.env.DATABASE_URL || "";
const db = drizzle(dbUrl);

// 查詢第一間學校的所有欄位
const result = await db.execute("SELECT * FROM schools LIMIT 1");
if (result[0] && result[0][0]) {
  console.log("Database columns:", Object.keys(result[0][0]));
  console.log("\nSample data:");
  const sample = result[0][0];
  console.log("id:", sample.id);
  console.log("name:", sample.name);
  console.log("chineseName:", sample.chineseName);
  console.log("type:", sample.type);
  console.log("district:", sample.district);
  console.log("financingType:", sample.financingType);
  console.log("studentGender:", sample.studentGender);
  console.log("category:", sample.category);
  console.log("gender:", sample.gender);
}

// 查詢學校總數
const count = await db.execute("SELECT COUNT(*) as total FROM schools");
console.log("\nTotal schools:", count[0][0]);

process.exit(0);
