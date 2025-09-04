import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

// 枚举定义
export const subscriptionPlanEnum = pgEnum('subscription_plan', [
  'free',
  'basic',
  'pro',
  'enterprise',
]);

export const subscriptionStatusEnum = pgEnum('subscription_status', [
  'active',
  'inactive',
  'canceled',
  'expired',
  'trial',
]);

export const predictionStatusEnum = pgEnum('prediction_status', [
  'pending',
  'processing',
  'completed',
  'failed',
  'canceled',
]);

export const usageTypeEnum = pgEnum('usage_type', [
  'prediction',
  'api_call',
  'model_usage',
]);

// 用户表
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').unique().notNull(),
  name: text('name'),
  avatar: text('avatar'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  
  // OAuth 相关字段
  provider: text('provider'), // 'github', 'google', etc.
  providerId: text('provider_id'),
  
  // 用户状态
  isActive: boolean('is_active').default(true).notNull(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  
  // 用户首选项
  preferences: jsonb('preferences').$type<{
    language?: string;
    theme?: string;
    notifications?: boolean;
  }>().default({}),
});

// 订阅表
export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  
  // 订阅信息
  plan: subscriptionPlanEnum('plan').notNull(),
  status: subscriptionStatusEnum('status').notNull(),
  
  // 积分配额
  monthlyCredits: integer('monthly_credits').default(0).notNull(),
  usedCredits: integer('used_credits').default(0).notNull(),
  
  // 时间信息
  startDate: timestamp('start_date').defaultNow().notNull(),
  endDate: timestamp('end_date'),
  lastResetDate: timestamp('last_reset_date').defaultNow().notNull(),
  
  // 支付相关
  paypalSubscriptionId: text('paypal_subscription_id'),
  paypalPlanId: text('paypal_plan_id'),
  
  // 系统时间
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  
  // 额外配置
  metadata: jsonb('metadata').$type<{
    features?: string[];
    limits?: Record<string, number>;
    customConfig?: Record<string, unknown>;
  }>().default({}),
});

// 使用记录表
export const usageRecords = pgTable('usage_records', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  subscriptionId: uuid('subscription_id').references(() => subscriptions.id),
  
  // 使用类型和成本
  type: usageTypeEnum('type').notNull(),
  creditsUsed: integer('credits_used').default(1).notNull(),
  
  // 使用详情
  modelName: text('model_name'),
  endpoint: text('endpoint'),
  
  // 时间信息
  usageDate: timestamp('usage_date').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  
  // 额外数据
  metadata: jsonb('metadata').$type<{
    inputTokens?: number;
    outputTokens?: number;
    processingTime?: number;
    additionalInfo?: Record<string, unknown>;
  }>().default({}),
});

// 预测记录表
export const predictions = pgTable('predictions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  usageRecordId: uuid('usage_record_id').references(() => usageRecords.id),
  
  // Replicate 相关信息
  replicateId: text('replicate_id').unique(),
  modelName: text('model_name').notNull(),
  version: text('version'),
  
  // 预测状态和时间
  status: predictionStatusEnum('status').default('pending').notNull(),
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
  
  // 输入输出数据
  input: jsonb('input').notNull(),
  output: jsonb('output'),
  error: text('error'),
  
  // 成本和性能
  creditsUsed: integer('credits_used').default(1).notNull(),
  processingTimeMs: integer('processing_time_ms'),
  
  // 可见性设置
  isPublic: boolean('is_public').default(true).notNull(),
  isFeatured: boolean('is_featured').default(false).notNull(),
  
  // 系统时间
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  
  // 额外元数据
  metadata: jsonb('metadata').$type<{
    tags?: string[];
    quality?: number;
    userAgent?: string;
    ipAddress?: string;
    additionalInfo?: Record<string, unknown>;
  }>().default({}),
});

// 导出类型定义
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;

export type UsageRecord = typeof usageRecords.$inferSelect;
export type NewUsageRecord = typeof usageRecords.$inferInsert;

export type Prediction = typeof predictions.$inferSelect;
export type NewPrediction = typeof predictions.$inferInsert;