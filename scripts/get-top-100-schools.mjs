import mysql from "mysql2/promise";
import fs from "fs/promises";

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const [schools] = await connection.execute(
  "SELECT id, name, nameEn, type, district, website FROM schools ORDER BY id ASC LIMIT 100"
);

console.log(`Found ${schools.length} schools\n`);

// 保存為 JSON 文件
await fs.writeFile(
  "/home/ubuntu/beejai/research/top-100-schools.json",
  JSON.stringify(schools, null, 2)
);

console.log("First 20 schools:");
schools.slice(0, 20).forEach((s, i) => {
  console.log(`${i + 1}. ${s.name}`);
});

console.log(`\n... and ${schools.length - 20} more schools`);
console.log("Full list saved to: /home/ubuntu/beejai/research/top-100-schools.json");

await connection.end();
