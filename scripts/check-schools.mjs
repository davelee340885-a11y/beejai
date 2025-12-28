import mysql from "mysql2/promise";

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const [schools] = await connection.execute(
  "SELECT id, name, nameEn, type, district FROM schools LIMIT 10"
);

console.log("Schools found:", schools.length);
schools.forEach((s) => {
  console.log(`${s.id}. ${s.name} (${s.nameEn}) - ${s.type} - ${s.district}`);
});

await connection.end();
