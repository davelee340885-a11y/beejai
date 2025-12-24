import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import type { TrpcContext } from "./_core/context";
import {
  getUserByOpenId,
  upsertUser,
  getSchools,
  getSchoolById,
  getPopularSchools,
  getSchoolsByDistrict,
  incrementSchoolViewCount,
  getAdmissionInfo,
  getUpcomingDeadlines,
  getLatestAdmissionNews,
  getChildrenByUserId,
  createChild,
  updateChild,
  deleteChild,
  getFavoritesByUserId,
  addFavorite,
  removeFavorite,
  isFavorite,
  getApplicationsByUserId,
  createApplication,
  updateApplication,
  getSubscriptionByUserId,
  getNotificationSettings,
  updateNotificationSettings,
  getSchoolStats,
  getDistrictList,
  SchoolFilters
} from "./db";

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "請先登入",
    });
  }
  return next({ ctx: { ...ctx, user: ctx.user } });
});

// ============================================
// 認證路由
// ============================================
const authRouter = t.router({
  me: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.user) return null;
    const user = await getUserByOpenId(ctx.user.openId);
    return user || null;
  }),
  logout: protectedProcedure.mutation(async ({ ctx }) => {
    ctx.res.clearCookie(COOKIE_NAME, {
      maxAge: -1,
      secure: true,
      sameSite: "none",
      httpOnly: true,
      path: "/",
    });
    return { success: true };
  }),
});

// ============================================
// 學校路由
// ============================================
const schoolRouter = t.router({
  // 獲取學校列表（支援篩選）
  list: publicProcedure
    .input(z.object({
      type: z.enum(["kindergarten", "primary", "secondary", "international"]).optional(),
      district: z.string().optional(),
      category: z.enum(["government", "aided", "dss", "private", "international"]).optional(),
      gender: z.enum(["coed", "boys", "girls"]).optional(),
      language: z.enum(["chinese", "english", "bilingual"]).optional(),
      band: z.enum(["1", "2", "3"]).optional(),
      tuitionMin: z.number().optional(),
      tuitionMax: z.number().optional(),
      search: z.string().optional(),
      isPopular: z.boolean().optional(),
      page: z.number().default(1),
      limit: z.number().default(20),
    }).optional())
    .query(async ({ input }) => {
      const filters: SchoolFilters = input || {};
      const page = input?.page || 1;
      const limit = input?.limit || 20;
      return getSchools(filters, page, limit);
    }),

  // 獲取單個學校詳情
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const school = await getSchoolById(input.id);
      if (school) {
        await incrementSchoolViewCount(input.id);
      }
      return school;
    }),

  // 獲取熱門學校
  popular: publicProcedure
    .input(z.object({
      type: z.string().optional(),
      limit: z.number().default(10),
    }).optional())
    .query(async ({ input }) => {
      return getPopularSchools(input?.type, input?.limit);
    }),

  // 按地區獲取學校
  byDistrict: publicProcedure
    .input(z.object({
      district: z.string(),
      limit: z.number().default(20),
    }))
    .query(async ({ input }) => {
      return getSchoolsByDistrict(input.district, input.limit);
    }),

  // 獲取學校入學資訊
  admissionInfo: publicProcedure
    .input(z.object({ schoolId: z.number() }))
    .query(async ({ input }) => {
      return getAdmissionInfo(input.schoolId);
    }),

  // 獲取學校統計
  stats: publicProcedure.query(async () => {
    return getSchoolStats();
  }),

  // 獲取地區列表
  districts: publicProcedure.query(async () => {
    return getDistrictList();
  }),
});

// ============================================
// 入學資訊路由
// ============================================
const admissionRouter = t.router({
  // 獲取即將截止的申請
  upcomingDeadlines: publicProcedure
    .input(z.object({ limit: z.number().default(10) }).optional())
    .query(async ({ input }) => {
      return getUpcomingDeadlines(input?.limit);
    }),

  // 獲取最新入學消息
  latestNews: publicProcedure
    .input(z.object({ limit: z.number().default(10) }).optional())
    .query(async ({ input }) => {
      return getLatestAdmissionNews(input?.limit);
    }),
});

// ============================================
// 小朋友資料路由
// ============================================
const childRouter = t.router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return getChildrenByUserId(ctx.user.id);
  }),

  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1, "請輸入小朋友名稱"),
      birthDate: z.date().optional(),
      gender: z.enum(["male", "female"]).optional(),
      currentSchool: z.string().optional(),
      currentGrade: z.string().optional(),
      targetLevel: z.enum(["kindergarten", "primary", "secondary"]).optional(),
      interests: z.string().optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const id = await createChild({
        userId: ctx.user.id,
        ...input,
      });
      return { id };
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      birthDate: z.date().optional(),
      gender: z.enum(["male", "female"]).optional(),
      currentSchool: z.string().optional(),
      currentGrade: z.string().optional(),
      targetLevel: z.enum(["kindergarten", "primary", "secondary"]).optional(),
      interests: z.string().optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      await updateChild(id, ctx.user.id, data);
      return { success: true };
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await deleteChild(input.id, ctx.user.id);
      return { success: true };
    }),
});

// ============================================
// 收藏路由
// ============================================
const favoriteRouter = t.router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return getFavoritesByUserId(ctx.user.id);
  }),

  add: protectedProcedure
    .input(z.object({
      schoolId: z.number(),
      childId: z.number().optional(),
      priority: z.number().optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const id = await addFavorite({
        userId: ctx.user.id,
        ...input,
      });
      return { id };
    }),

  remove: protectedProcedure
    .input(z.object({ schoolId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await removeFavorite(ctx.user.id, input.schoolId);
      return { success: true };
    }),

  check: protectedProcedure
    .input(z.object({ schoolId: z.number() }))
    .query(async ({ ctx, input }) => {
      return isFavorite(ctx.user.id, input.schoolId);
    }),
});

// ============================================
// 申請追蹤路由
// ============================================
const applicationRouter = t.router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return getApplicationsByUserId(ctx.user.id);
  }),

  create: protectedProcedure
    .input(z.object({
      schoolId: z.number(),
      childId: z.number().optional(),
      status: z.enum(["planning", "applied", "interview", "waitlist", "accepted", "rejected", "enrolled"]).default("planning"),
      applicationDate: z.date().optional(),
      interviewDate: z.date().optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const id = await createApplication({
        userId: ctx.user.id,
        ...input,
      });
      return { id };
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["planning", "applied", "interview", "waitlist", "accepted", "rejected", "enrolled"]).optional(),
      applicationDate: z.date().optional(),
      interviewDate: z.date().optional(),
      resultDate: z.date().optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      await updateApplication(id, ctx.user.id, data);
      return { success: true };
    }),
});

// ============================================
// 訂閱路由
// ============================================
const subscriptionRouter = t.router({
  current: protectedProcedure.query(async ({ ctx }) => {
    return getSubscriptionByUserId(ctx.user.id);
  }),

  // Stripe 整合將在後續添加
});

// ============================================
// 用戶設定路由
// ============================================
const settingsRouter = t.router({
  notifications: protectedProcedure.query(async ({ ctx }) => {
    return getNotificationSettings(ctx.user.id);
  }),

  updateNotifications: protectedProcedure
    .input(z.object({
      emailNotifications: z.boolean().optional(),
      deadlineReminders: z.boolean().optional(),
      reminderDaysBefore: z.number().optional(),
      newInfoAlerts: z.boolean().optional(),
      weeklyDigest: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      await updateNotificationSettings(ctx.user.id, input);
      return { success: true };
    }),
});

// ============================================
// 主路由
// ============================================
export const appRouter = t.router({
  auth: authRouter,
  school: schoolRouter,
  admission: admissionRouter,
  child: childRouter,
  favorite: favoriteRouter,
  application: applicationRouter,
  subscription: subscriptionRouter,
  settings: settingsRouter,
});

export type AppRouter = typeof appRouter;
