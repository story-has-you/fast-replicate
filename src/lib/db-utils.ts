import { db } from '@/db';
import { users, subscriptions, type NewUser, type NewSubscription } from '@/db/schema';
import { eq } from 'drizzle-orm';

// 用户相关工具函数
export const userUtils = {
  // 根据邮箱查找用户
  async findByEmail(email: string) {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    return result[0] || null;
  },

  // 根据 ID 查找用户
  async findById(id: string) {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    return result[0] || null;
  },

  // 创建新用户
  async create(userData: NewUser) {
    const result = await db
      .insert(users)
      .values(userData)
      .returning();
    return result[0];
  },

  // 更新用户信息
  async updateById(id: string, updates: Partial<NewUser>) {
    const result = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return result[0] || null;
  },
};

// 订阅相关工具函数
export const subscriptionUtils = {
  // 根据用户 ID 查找活跃订阅
  async findActiveByUserId(userId: string) {
    const result = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .limit(1);
    return result[0] || null;
  },

  // 创建新订阅
  async create(subscriptionData: NewSubscription) {
    const result = await db
      .insert(subscriptions)
      .values(subscriptionData)
      .returning();
    return result[0];
  },

  // 更新订阅信息
  async updateById(id: string, updates: Partial<NewSubscription>) {
    const result = await db
      .update(subscriptions)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(subscriptions.id, id))
      .returning();
    return result[0] || null;
  },

  // 重置月度积分
  async resetMonthlyCredits(userId: string) {
    const result = await db
      .update(subscriptions)
      .set({ 
        usedCredits: 0, 
        lastResetDate: new Date(),
        updatedAt: new Date()
      })
      .where(eq(subscriptions.userId, userId))
      .returning();
    return result[0] || null;
  },
};