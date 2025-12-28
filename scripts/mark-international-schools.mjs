#!/usr/bin/env node

/**
 * 識別和標記國際學校的腳本
 * 通過檢查學校名稱中是否包含 "International" 關鍵字
 */

import mysql from 'mysql2/promise';

// 從環境變數讀取數據庫連接信息
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL 環境變數未設置');
  process.exit(1);
}

// 解析 DATABASE_URL
// 格式: mysql://user:password@host:port/database
const urlMatch = DATABASE_URL.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(\w+)/);
if (!urlMatch) {
  console.error('❌ DATABASE_URL 格式不正確');
  process.exit(1);
}

const [, user, password, host, port, database] = urlMatch;

async function markInternationalSchools() {
  let connection;
  
  try {
    // 連接到數據庫
    connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
      port: parseInt(port),
      ssl: { rejectUnauthorized: false },  // 使用 SSL/TLS 安全連接
    });

    console.log('✓ 已連接到數據庫');

    // 1. 查詢所有學校
    const [schools] = await connection.query('SELECT id, name, nameEn FROM schools');
    console.log(`\n📊 總共有 ${schools.length} 間學校`);

    // 2. 識別國際學校
    const internationalSchools = schools.filter(school => {
      const nameEn = school.nameEn || '';
      return nameEn.toLowerCase().includes('international');
    });

    console.log(`\n🌍 找到 ${internationalSchools.length} 間國際學校：`);
    internationalSchools.forEach((school, index) => {
      console.log(`  ${index + 1}. ${school.name} (${school.nameEn})`);
    });

    // 3. 更新數據庫
    if (internationalSchools.length > 0) {
      const ids = internationalSchools.map(s => s.id);
      const placeholders = ids.map(() => '?').join(',');
      
      const [result] = await connection.query(
        `UPDATE schools SET isInternational = true WHERE id IN (${placeholders})`,
        ids
      );

      console.log(`\n✅ 已標記 ${result.affectedRows} 間國際學校為 isInternational = true`);
    } else {
      console.log('\n⚠️ 沒有找到國際學校');
    }

    // 4. 驗證結果
    const [verifyResult] = await connection.query(
      'SELECT COUNT(*) as count FROM schools WHERE isInternational = true'
    );
    console.log(`\n📈 驗證：數據庫中現在有 ${verifyResult[0].count} 間國際學校`);

    // 5. 顯示更新後的國際學校列表
    const [updatedSchools] = await connection.query(
      'SELECT id, name, nameEn, type, category FROM schools WHERE isInternational = true LIMIT 10'
    );
    console.log('\n📋 前 10 間國際學校：');
    updatedSchools.forEach((school, index) => {
      console.log(`  ${index + 1}. ${school.name} (${school.nameEn}) - Type: ${school.type}, Category: ${school.category}`);
    });

  } catch (error) {
    console.error('❌ 錯誤:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n✓ 已關閉數據庫連接');
    }
  }
}

// 執行腳本
markInternationalSchools();
