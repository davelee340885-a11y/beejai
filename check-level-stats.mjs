import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { schools } from './drizzle/schema.ts';
import { sql } from 'drizzle-orm';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

const levelStats = await db.select({
  level: schools.level,
  count: sql`count(*)`.as('count')
}).from(schools).groupBy(schools.level);

console.log('學校級別統計：');
levelStats.forEach(stat => {
  console.log(`${stat.level}: ${stat.count} 間`);
});

// 查看前 5 間幼稚園
const kindergartens = await db.select().from(schools).where(sql`${schools.level} = 'kindergarten'`).limit(5);
console.log('\n前 5 間幼稚園：');
kindergartens.forEach(s => console.log(`- ${s.name} (${s.nameEn})`));

// 查看前 5 間中學
const secondary = await db.select().from(schools).where(sql`${schools.level} = 'secondary'`).limit(5);
console.log('\n前 5 間中學：');
secondary.forEach(s => console.log(`- ${s.name} (${s.nameEn})`));

await connection.end();
