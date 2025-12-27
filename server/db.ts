import { eq, and, like, or, desc, asc, sql, inArray, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users, 
  schools, School, InsertSchool,
  admissionInfo, AdmissionInfo, InsertAdmissionInfo,
  children, Child, InsertChild,
  favorites, Favorite, InsertFavorite,
  applications, Application, InsertApplication,
  subscriptions, Subscription, InsertSubscription,
  notificationSettings, NotificationSetting, InsertNotificationSetting
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============================================
// 用戶相關
// ============================================
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============================================
// 學校相關
// ============================================
export interface SchoolFilters {
  type?: "kindergarten" | "primary" | "secondary" | "international";
  district?: string;
  category?: "government" | "aided" | "dss" | "private" | "international";
  gender?: "coed" | "boys" | "girls";
  language?: "chinese" | "english" | "bilingual";
  band?: "1" | "2" | "3";
  tuitionMin?: number;
  tuitionMax?: number;
  search?: string;
  isPopular?: boolean;
}

export async function getSchools(filters: SchoolFilters = {}, page = 1, limit = 20) {
  const db = await getDb();
  if (!db) return { schools: [], total: 0 };

  const conditions = [];
  
  if (filters.type) conditions.push(eq(schools.type, filters.type));
  if (filters.district) conditions.push(eq(schools.district, filters.district));
  if (filters.category) conditions.push(eq(schools.category, filters.category));
  if (filters.gender) conditions.push(eq(schools.gender, filters.gender));
  if (filters.language) conditions.push(eq(schools.language, filters.language));
  if (filters.band) conditions.push(eq(schools.band, filters.band));
  if (filters.tuitionMin) conditions.push(gte(schools.tuitionFeeMin, filters.tuitionMin));
  if (filters.tuitionMax) conditions.push(lte(schools.tuitionFeeMax, filters.tuitionMax));
  if (filters.isPopular) conditions.push(eq(schools.isPopular, true));
  if (filters.search) {
    conditions.push(
      or(
        like(schools.name, `%${filters.search}%`),
        like(schools.nameEn, `%${filters.search}%`)
      )
    );
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
  
  const [schoolList, countResult] = await Promise.all([
    db.select()
      .from(schools)
      .where(whereClause)
      .orderBy(desc(schools.isPopular), desc(schools.viewCount))
      .limit(limit)
      .offset((page - 1) * limit),
    db.select({ count: sql<number>`count(*)` })
      .from(schools)
      .where(whereClause)
  ]);

  return {
    schools: schoolList,
    total: countResult[0]?.count || 0,
    page,
    pageSize: limit
  };
}

export async function getSchoolById(id: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(schools).where(eq(schools.id, id)).limit(1);
  return result[0] || null;
}

export async function getPopularSchools(type?: string, limit = 10) {
  const db = await getDb();
  if (!db) return [];

  // 使用 rating 排序而不是依賴 isPopular 標記
  const conditions = [];
  if (type) conditions.push(eq(schools.type, type as any));

  const query = db.select()
    .from(schools)
    .orderBy(desc(schools.rating), desc(schools.viewCount))
    .limit(limit);
    
  if (conditions.length > 0) {
    return query.where(and(...conditions));
  }
  
  return query;
}

export async function getSchoolsByDistrict(district: string, limit = 20) {
  const db = await getDb();
  if (!db) return [];

  return db.select()
    .from(schools)
    .where(eq(schools.district, district))
    .orderBy(desc(schools.isPopular), desc(schools.viewCount))
    .limit(limit);
}

export async function incrementSchoolViewCount(id: number) {
  const db = await getDb();
  if (!db) return;

  await db.update(schools)
    .set({ viewCount: sql`${schools.viewCount} + 1` })
    .where(eq(schools.id, id));
}

export async function createSchool(school: InsertSchool) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(schools).values(school);
  return result[0].insertId;
}

// ============================================
// 入學資訊相關
// ============================================
export async function getAdmissionInfo(schoolId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select()
    .from(admissionInfo)
    .where(eq(admissionInfo.schoolId, schoolId))
    .orderBy(desc(admissionInfo.academicYear));
}

export async function getUpcomingDeadlines(limit = 10) {
  const db = await getDb();
  if (!db) return [];

  const now = new Date();
  
  return db.select({
    admission: admissionInfo,
    school: schools
  })
    .from(admissionInfo)
    .innerJoin(schools, eq(admissionInfo.schoolId, schools.id))
    .where(gte(admissionInfo.applicationDeadline, now))
    .orderBy(asc(admissionInfo.applicationDeadline))
    .limit(limit);
}

export async function getLatestAdmissionNews(limit = 10) {
  const db = await getDb();
  if (!db) return [];

  return db.select({
    admission: admissionInfo,
    school: schools
  })
    .from(admissionInfo)
    .innerJoin(schools, eq(admissionInfo.schoolId, schools.id))
    .orderBy(desc(admissionInfo.updatedAt))
    .limit(limit);
}

// ============================================
// 小朋友資料相關
// ============================================
export async function getChildrenByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(children).where(eq(children.userId, userId));
}

export async function createChild(child: InsertChild) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(children).values(child);
  return result[0].insertId;
}

export async function updateChild(id: number, userId: number, data: Partial<InsertChild>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(children)
    .set(data)
    .where(and(eq(children.id, id), eq(children.userId, userId)));
}

export async function deleteChild(id: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(children)
    .where(and(eq(children.id, id), eq(children.userId, userId)));
}

// ============================================
// 心儀學校收藏相關
// ============================================
export async function getFavoritesByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select({
    favorite: favorites,
    school: schools
  })
    .from(favorites)
    .innerJoin(schools, eq(favorites.schoolId, schools.id))
    .where(eq(favorites.userId, userId))
    .orderBy(desc(favorites.priority), desc(favorites.createdAt));
}

export async function addFavorite(favorite: InsertFavorite) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(favorites).values(favorite);
  return result[0].insertId;
}

export async function removeFavorite(userId: number, schoolId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(favorites)
    .where(and(eq(favorites.userId, userId), eq(favorites.schoolId, schoolId)));
}

export async function isFavorite(userId: number, schoolId: number) {
  const db = await getDb();
  if (!db) return false;

  const result = await db.select()
    .from(favorites)
    .where(and(eq(favorites.userId, userId), eq(favorites.schoolId, schoolId)))
    .limit(1);
  
  return result.length > 0;
}

// ============================================
// 申請追蹤相關
// ============================================
export async function getApplicationsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select({
    application: applications,
    school: schools
  })
    .from(applications)
    .innerJoin(schools, eq(applications.schoolId, schools.id))
    .where(eq(applications.userId, userId))
    .orderBy(desc(applications.updatedAt));
}

export async function createApplication(application: InsertApplication) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(applications).values(application);
  return result[0].insertId;
}

export async function updateApplication(id: number, userId: number, data: Partial<InsertApplication>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(applications)
    .set(data)
    .where(and(eq(applications.id, id), eq(applications.userId, userId)));
}

// ============================================
// 訂閱相關
// ============================================
export async function getSubscriptionByUserId(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1);
  
  return result[0] || null;
}

export async function createOrUpdateSubscription(subscription: InsertSubscription) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(subscriptions)
    .values(subscription)
    .onDuplicateKeyUpdate({
      set: {
        plan: subscription.plan,
        status: subscription.status,
        endDate: subscription.endDate,
        stripeCustomerId: subscription.stripeCustomerId,
        stripeSubscriptionId: subscription.stripeSubscriptionId,
      }
    });
}

// ============================================
// 通知設定相關
// ============================================
export async function getNotificationSettings(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select()
    .from(notificationSettings)
    .where(eq(notificationSettings.userId, userId))
    .limit(1);
  
  return result[0] || null;
}

export async function updateNotificationSettings(userId: number, settings: Partial<InsertNotificationSetting>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(notificationSettings)
    .values({ userId, ...settings })
    .onDuplicateKeyUpdate({ set: settings });
}

// ============================================
// 統計數據
// ============================================
export async function getSchoolStats() {
  const db = await getDb();
  if (!db) return { kindergarten: 0, primary: 0, secondary: 0, international: 0, total: 0 };

  const result = await db.select({
    type: schools.type,
    count: sql<number>`count(*)`
  })
    .from(schools)
    .groupBy(schools.type);

  const stats = { kindergarten: 0, primary: 0, secondary: 0, international: 0, total: 0 };
  result.forEach(r => {
    if (r.type) stats[r.type] = r.count;
    stats.total += r.count;
  });

  return stats;
}

export async function getDistrictList() {
  const db = await getDb();
  if (!db) return [];

  const result = await db.selectDistinct({ district: schools.district })
    .from(schools)
    .orderBy(schools.district);
  
  return result.map(r => r.district).filter(Boolean);
}
