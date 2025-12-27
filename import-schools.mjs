#!/usr/bin/env node
/**
 * Import schools from EDB CSV data into BeeJAI database
 * Run with: tsx import-schools.mjs
 */

import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { drizzle } from 'drizzle-orm/mysql2';
import { schools } from './drizzle/schema.ts';

// Initialize database connection
const db = drizzle(process.env.DATABASE_URL);

// Read and parse CSV file
console.log('Reading CSV file...');
const csvContent = fs.readFileSync('./SCH_LOC_EDB.csv', 'utf-16le');
const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true,
  trim: true
});

console.log(`Found ${records.length} schools in CSV`);

// Map EDB data to our schema
const schoolsToInsert = [];
let skipped = 0;

for (const record of records) {
  const englishName = record['ENGLISH NAME']?.trim();
  const chineseName = record['中文名稱']?.trim();
  const schoolLevel = record['SCHOOL LEVEL']?.trim();
  const financeType = record['FINANCE TYPE']?.trim();
  
  // Skip if missing essential data
  if (!englishName || !schoolLevel) {
    skipped++;
    continue;
  }
  
  // Map school level
  let type = 'primary';
  if (schoolLevel === 'KINDERGARTEN') type = 'kindergarten';
  else if (schoolLevel === 'SECONDARY') type = 'secondary';
  else if (schoolLevel === 'PRIMARY') type = 'primary';
  else if (schoolLevel === 'INTERNATIONAL') type = 'international';
  else {
    skipped++;
    continue; // Skip unknown types
  }
  
  // Map finance type
  let financeCategory = 'aided';
  if (financeType === 'GOVERNMENT') financeCategory = 'government';
  else if (financeType === 'AIDED') financeCategory = 'aided';
  else if (financeType === 'DIRECT SUBSIDY SCHEME') financeCategory = 'dss';
  else if (financeType === 'PRIVATE') financeCategory = 'private';
  else if (financeType === 'INTERNATIONAL') financeCategory = 'international';
  
  // Map gender
  const gender = record['STUDENTS GENDER']?.trim();
  let genderType = 'coed';
  if (gender === 'BOYS') genderType = 'boys';
  else if (gender === 'GIRLS') genderType = 'girls';
  else if (gender === 'CO-ED') genderType = 'coed';
  
  // Map session
  const session = record['SESSION']?.trim();
  let sessionType = 'whole_day';
  if (session === 'WHOLE DAY') sessionType = 'whole_day';
  else if (session === 'AM' || session === 'PM') sessionType = 'half_day';
  
  // Map district
  const districtEn = record['DISTRICT']?.trim();
  const districtMap = {
    'CENTRAL & WESTERN': '中西區',
    'EASTERN': '東區',
    'SOUTHERN': '南區',
    'WAN CHAI': '灣仔區',
    'SHAM SHUI PO': '深水埗區',
    'KOWLOON CITY': '九龍城區',
    'KWUN TONG': '觀塘區',
    'WONG TAI SIN': '黃大仙區',
    'YAU TSIM MONG': '油尖旺區',
    'ISLANDS': '離島區',
    'KWAI TSING': '葵青區',
    'NORTH': '北區',
    'SAI KUNG': '西貢區',
    'SHA TIN': '沙田區',
    'TAI PO': '大埔區',
    'TSUEN WAN': '荃灣區',
    'TUEN MUN': '屯門區',
    'YUEN LONG': '元朗區'
  };
  const district = districtMap[districtEn] || districtEn;
  
  // Parse religion
  const religionEn = record['RELIGION']?.trim();
  let religion = null;
  if (religionEn && religionEn !== 'NOT APPLICABLE' && religionEn !== '') {
    const religionMap = {
      'CHRISTIANITY': '基督教',
      'CATHOLICISM': '天主教',
      'BUDDHISM': '佛教',
      'TAOISM': '道教',
      'ISLAM': '伊斯蘭教',
      'CONFUCIANISM': '孔教'
    };
    religion = religionMap[religionEn] || religionEn;
  }
  
  // Parse coordinates
  const longitude = parseFloat(record['LONGITUDE']) || null;
  const latitude = parseFloat(record['LATITUDE']) || null;
  
  schoolsToInsert.push({
    name: englishName,
    chineseName: chineseName || englishName,
    type,
    district,
    address: record['ENGLISH ADDRESS']?.trim() || '',
    chineseAddress: record['中文地址']?.trim() || '',
    phone: record['TELEPHONE']?.trim() || null,
    fax: record['FAX NUMBER']?.trim() || null,
    email: null, // Not in CSV
    website: record['WEBSITE']?.trim() || null,
    principalName: null, // Not in CSV
    foundedYear: null, // Not in CSV
    studentCount: null, // Not in CSV
    teacherCount: null, // Not in CSV
    classCount: null, // Not in CSV
    
    // Classification
    financeType: financeCategory,
    gender: genderType,
    religion,
    band: null, // Not in CSV
    curriculum: null, // Not in CSV
    teachingLanguage: null, // Not in CSV
    
    // Features
    hasScholarship: false,
    hasHostel: false,
    hasSchoolBus: false,
    hasAircon: false,
    hasLibrary: false,
    hasPlayground: false,
    
    // Fees
    tuitionFee: null,
    otherFees: null,
    
    // Application
    applicationDeadline: null,
    interviewDate: null,
    admissionRequirements: null,
    
    // Location
    latitude,
    longitude,
    
    // Session
    session: sessionType,
    
    // Metadata
    rating: 0,
    viewCount: 0,
    favoriteCount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

console.log(`Prepared ${schoolsToInsert.length} schools for import`);
console.log(`Skipped ${skipped} schools (missing data or invalid type)`);

// Count by type
const typeCount = {};
schoolsToInsert.forEach(s => {
  typeCount[s.type] = (typeCount[s.type] || 0) + 1;
});
console.log('\nSchools by type:');
Object.entries(typeCount).forEach(([type, count]) => {
  console.log(`  ${type}: ${count}`);
});

// Insert in batches
const batchSize = 100;
let inserted = 0;

console.log('\nStarting import...');
for (let i = 0; i < schoolsToInsert.length; i += batchSize) {
  const batch = schoolsToInsert.slice(i, i + batchSize);
  
  try {
    await db.insert(schools).values(batch);
    inserted += batch.length;
    console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}: ${inserted}/${schoolsToInsert.length}`);
  } catch (error) {
    console.error(`Error inserting batch ${Math.floor(i / batchSize) + 1}:`, error.message);
  }
}

console.log(`\n✓ Import complete! Inserted ${inserted} schools into database.`);
process.exit(0);
