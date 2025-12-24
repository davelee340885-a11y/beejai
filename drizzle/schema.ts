import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json, decimal } from "drizzle-orm/mysql-core";

// ============================================
// 用戶表（系統內建）
// ============================================
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ============================================
// 學校表
// ============================================
export const schools = mysqlTable("schools", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  nameEn: varchar("nameEn", { length: 255 }),
  type: mysqlEnum("type", ["kindergarten", "primary", "secondary", "international"]).notNull(),
  district: varchar("district", { length: 50 }).notNull(),
  address: text("address"),
  phone: varchar("phone", { length: 50 }),
  fax: varchar("fax", { length: 50 }),
  email: varchar("email", { length: 255 }),
  website: varchar("website", { length: 500 }),
  imageUrl: varchar("imageUrl", { length: 500 }),
  
  // 學校分類
  category: mysqlEnum("category", ["government", "aided", "dss", "private", "international"]),
  gender: mysqlEnum("gender", ["coed", "boys", "girls"]),
  religion: varchar("religion", { length: 100 }),
  language: mysqlEnum("language", ["chinese", "english", "bilingual"]),
  
  // 課程和收生
  curriculum: varchar("curriculum", { length: 255 }),
  band: mysqlEnum("band", ["1", "2", "3"]),
  schoolNet: varchar("schoolNet", { length: 10 }),
  linkedSchool: varchar("linkedSchool", { length: 255 }),
  
  // 費用
  tuitionFeeMin: int("tuitionFeeMin"),
  tuitionFeeMax: int("tuitionFeeMax"),
  
  // 其他資訊
  studentCount: int("studentCount"),
  teacherCount: int("teacherCount"),
  classCount: int("classCount"),
  foundedYear: int("foundedYear"),
  description: text("description"),
  features: text("features"),
  
  // 排名和評分
  ranking: int("ranking"),
  rating: decimal("rating", { precision: 2, scale: 1 }),
  
  // 狀態
  isVerified: boolean("isVerified").default(false),
  isPopular: boolean("isPopular").default(false),
  viewCount: int("viewCount").default(0),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type School = typeof schools.$inferSelect;
export type InsertSchool = typeof schools.$inferInsert;

// ============================================
// 入學資訊表
// ============================================
export const admissionInfo = mysqlTable("admission_info", {
  id: int("id").autoincrement().primaryKey(),
  schoolId: int("schoolId").notNull(),
  academicYear: varchar("academicYear", { length: 20 }).notNull(),
  
  // 申請時間
  applicationOpenDate: timestamp("applicationOpenDate"),
  applicationDeadline: timestamp("applicationDeadline"),
  interviewDate: timestamp("interviewDate"),
  resultDate: timestamp("resultDate"),
  
  // 申請要求
  requirements: text("requirements"),
  documents: text("documents"),
  interviewInfo: text("interviewInfo"),
  
  // 招生人數
  intake: int("intake"),
  applicants: int("applicants"),
  
  // 聯絡方式
  contactPerson: varchar("contactPerson", { length: 100 }),
  contactPhone: varchar("contactPhone", { length: 50 }),
  contactEmail: varchar("contactEmail", { length: 255 }),
  
  // 來源和驗證
  sourceUrl: varchar("sourceUrl", { length: 500 }),
  isVerified: boolean("isVerified").default(false),
  lastScrapedAt: timestamp("lastScrapedAt"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AdmissionInfo = typeof admissionInfo.$inferSelect;
export type InsertAdmissionInfo = typeof admissionInfo.$inferInsert;

// ============================================
// 小朋友資料表
// ============================================
export const children = mysqlTable("children", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  birthDate: timestamp("birthDate"),
  gender: mysqlEnum("gender", ["male", "female"]),
  currentSchool: varchar("currentSchool", { length: 255 }),
  currentGrade: varchar("currentGrade", { length: 50 }),
  targetLevel: mysqlEnum("targetLevel", ["kindergarten", "primary", "secondary"]),
  interests: text("interests"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Child = typeof children.$inferSelect;
export type InsertChild = typeof children.$inferInsert;

// ============================================
// 心儀學校收藏表
// ============================================
export const favorites = mysqlTable("favorites", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  schoolId: int("schoolId").notNull(),
  childId: int("childId"),
  priority: int("priority").default(0),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Favorite = typeof favorites.$inferSelect;
export type InsertFavorite = typeof favorites.$inferInsert;

// ============================================
// 申請追蹤表
// ============================================
export const applications = mysqlTable("applications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  schoolId: int("schoolId").notNull(),
  childId: int("childId"),
  status: mysqlEnum("status", ["planning", "applied", "interview", "waitlist", "accepted", "rejected", "enrolled"]).default("planning"),
  applicationDate: timestamp("applicationDate"),
  interviewDate: timestamp("interviewDate"),
  resultDate: timestamp("resultDate"),
  notes: text("notes"),
  documents: text("documents"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Application = typeof applications.$inferSelect;
export type InsertApplication = typeof applications.$inferInsert;

// ============================================
// 訂閱計劃表
// ============================================
export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  plan: mysqlEnum("plan", ["free", "basic", "premium"]).default("free").notNull(),
  status: mysqlEnum("status", ["active", "cancelled", "expired"]).default("active").notNull(),
  startDate: timestamp("startDate").defaultNow().notNull(),
  endDate: timestamp("endDate"),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

// ============================================
// 通知設定表
// ============================================
export const notificationSettings = mysqlTable("notification_settings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  emailNotifications: boolean("emailNotifications").default(true),
  deadlineReminders: boolean("deadlineReminders").default(true),
  reminderDaysBefore: int("reminderDaysBefore").default(7),
  newInfoAlerts: boolean("newInfoAlerts").default(true),
  weeklyDigest: boolean("weeklyDigest").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NotificationSetting = typeof notificationSettings.$inferSelect;
export type InsertNotificationSetting = typeof notificationSettings.$inferInsert;
