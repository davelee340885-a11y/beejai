import { drizzle } from "drizzle-orm/mysql2";
const db = drizzle(process.env.DATABASE_URL || "");

const result = await db.execute("SELECT id, name, category, gender, type, district FROM schools LIMIT 5");
console.log("Schools with category and gender:");
result[0].forEach((school) => {
  console.log(`ID: ${school.id}, Name: ${school.name}`);
  console.log(`  Category: ${school.category}, Gender: ${school.gender}`);
  console.log(`  Type: ${school.type}, District: ${school.district}`);
  console.log("");
});

process.exit(0);
