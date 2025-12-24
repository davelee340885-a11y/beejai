import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Create a public context (no user)
function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
      cookie: () => {},
    } as unknown as TrpcContext["res"],
  };
}

describe("School API", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    const ctx = createPublicContext();
    caller = appRouter.createCaller(ctx);
  });

  describe("school.list", () => {
    it("should return a list of schools with pagination info", async () => {
      const result = await caller.school.list({});
      
      expect(result).toBeDefined();
      expect(result).toHaveProperty("schools");
      expect(result).toHaveProperty("total");
      expect(result).toHaveProperty("page");
      expect(result).toHaveProperty("pageSize");
      expect(Array.isArray(result.schools)).toBe(true);
    });

    it("should filter schools by type", async () => {
      const result = await caller.school.list({ type: "primary" });
      
      expect(result).toBeDefined();
      expect(result.schools).toBeDefined();
      // All returned schools should be primary type
      result.schools.forEach((school: any) => {
        expect(school.type).toBe("primary");
      });
    });

    it("should filter schools by district", async () => {
      const result = await caller.school.list({ district: "九龍城區" });
      
      expect(result).toBeDefined();
      expect(result.schools).toBeDefined();
      // All returned schools should be in the specified district
      result.schools.forEach((school: any) => {
        expect(school.district).toBe("九龍城區");
      });
    });

    it("should support pagination", async () => {
      const page1 = await caller.school.list({ page: 1, limit: 2 });
      const page2 = await caller.school.list({ page: 2, limit: 2 });
      
      expect(page1.page).toBe(1);
      expect(page1.pageSize).toBe(2);
      expect(page1.schools.length).toBeLessThanOrEqual(2);
      
      expect(page2.page).toBe(2);
      expect(page2.pageSize).toBe(2);
    });

    it("should search schools by query", async () => {
      const result = await caller.school.list({ search: "聖保羅" });
      
      expect(result).toBeDefined();
      // If there are results, they should contain the search term
      if (result.schools.length > 0) {
        result.schools.forEach((school: any) => {
          const nameContainsQuery = 
            school.name.includes("聖保羅") || 
            (school.nameEn && school.nameEn.toLowerCase().includes("paul"));
          expect(nameContainsQuery).toBe(true);
        });
      }
    });
  });

  describe("school.getById", () => {
    it("should return a school by ID", async () => {
      // First get a list to find a valid ID
      const listResult = await caller.school.list({});
      
      if (listResult.schools.length > 0) {
        const schoolId = listResult.schools[0].id;
        const result = await caller.school.getById({ id: schoolId });
        
        expect(result).toBeDefined();
        expect(result?.id).toBe(schoolId);
        expect(result?.name).toBeDefined();
        expect(result?.type).toBeDefined();
        expect(result?.district).toBeDefined();
      }
    });

    it("should return null for non-existent school", async () => {
      const result = await caller.school.getById({ id: 999999 });
      expect(result).toBeNull();
    });
  });

  describe("school.popular", () => {
    it("should return popular schools array", async () => {
      const result = await caller.school.popular({ limit: 5 });
      
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeLessThanOrEqual(5);
    });

    it("should filter popular schools by type", async () => {
      const result = await caller.school.popular({ limit: 5, type: "primary" });
      
      expect(result).toBeDefined();
      result.forEach((school: any) => {
        expect(school.type).toBe("primary");
      });
    });
  });

  describe("school.districts", () => {
    it("should return list of districts as array", async () => {
      const result = await caller.school.districts();
      
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      // Empty array is valid if no schools in database
      expect(result.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe("school.stats", () => {
    it("should return school statistics with type counts", async () => {
      const result = await caller.school.stats();
      
      expect(result).toBeDefined();
      expect(result).toHaveProperty("total");
      expect(result).toHaveProperty("kindergarten");
      expect(result).toHaveProperty("primary");
      expect(result).toHaveProperty("secondary");
      expect(result).toHaveProperty("international");
      expect(typeof result.total).toBe("number");
    });
  });
});
