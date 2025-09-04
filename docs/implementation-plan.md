# Fast-Replicate 模板项目实施计划

## 项目概述

创建一个高度可复用的 Next.js 模板，用于快速搭建调用 Replicate.com AI 模型的 SaaS 应用。采用订阅付费模式，用户通过购买会员获得 AI 模型使用权限，无需提供自己的 API 密钥，降低使用门槛。

## 核心技术栈

- **框架**: Next.js 15.5.2 + React 19
- **样式**: Tailwind CSS v4
- **数据库**: Drizzle ORM + PostgreSQL（支持 Supabase/Neon/Vercel Postgres）
- **认证**: Next-Auth + Drizzle Adapter
- **AI 模型**: Replicate SDK (`pnpm add replicate`)
- **支付**: PayPal + Creem
- **包管理**: pnpm

## 📁 项目结构

```
fast-replicate/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/             # API 路由
│   │   ├── (auth)/          # 认证相关页面
│   │   ├── models/          # 模型展示页面
│   │   ├── dashboard/       # 用户仪表板
│   │   └── pricing/         # 价格页面
│   ├── components/          # React 组件
│   │   ├── ui/             # 基础 UI 组件
│   │   ├── models/         # 模型相关组件
│   │   └── layout/         # 布局组件
│   ├── lib/                # 工具函数
│   │   ├── auth/           # 认证工具
│   │   ├── replicate/      # Replicate 封装
│   │   └── payment/        # 支付工具
│   ├── db/                 # 数据库
│   │   ├── schema.ts       # Drizzle Schema
│   │   ├── index.ts        # 数据库连接
│   │   └── migrations/     # 数据库迁移
│   ├── services/           # 业务逻辑
│   ├── config/             # 配置文件
│   │   ├── models.ts       # 模型配置
│   │   └── subscription.ts # 订阅配置
│   └── types/              # TypeScript 类型
├── scripts/                # 运行脚本
│   ├── dev.sh
│   ├── build.sh
│   └── migrate.sh
├── logs/                   # 日志目录
└── docs/                   # 项目文档
```

## 🔧 实施步骤

### 第一阶段：基础架构（Day 1）

1. **项目初始化**
   - 配置 pnpm 包管理器
   - 创建标准化目录结构
   - 设置 TypeScript 严格模式
   - 配置 ESLint 和 Prettier

2. **脚本系统**

   ```bash
   # scripts/dev.sh
   #!/bin/bash
   pnpm dev

   # scripts/build.sh
   #!/bin/bash
   pnpm build

   # scripts/migrate.sh
   #!/bin/bash
   pnpm drizzle-kit push:pg
   ```

3. **日志系统**
   - 集成 winston 日志库
   - 配置文件输出到 logs/ 目录
   - 实现请求追踪

### 第二阶段：数据库集成（Day 2-3）

1. **Drizzle ORM 配置**

   ```bash
   pnpm add drizzle-orm postgres
   pnpm add -D drizzle-kit @types/pg
   ```

2. **数据库 Schema 定义**

   ```typescript
   // src/db/schema.ts
   import type { AdapterAccountType } from '@auth/core/adapters';
   import {
     boolean,
     integer,
     json,
     pgTable,
     primaryKey,
     text,
     timestamp,
   } from 'drizzle-orm/pg-core';

   // Next-Auth 核心表
   export const users = pgTable('user', {
     id: text('id')
       .primaryKey()
       .$defaultFn(() => crypto.randomUUID()),
     name: text('name'),
     email: text('email').unique(),
     emailVerified: timestamp('emailVerified', { mode: 'date' }),
     image: text('image'),
   });

   export const accounts = pgTable(
     'account',
     {
       userId: text('userId').notNull(),
       type: text('type').$type<AdapterAccountType>().notNull(),
       provider: text('provider').notNull(),
       providerAccountId: text('providerAccountId').notNull(),
       refresh_token: text('refresh_token'),
       access_token: text('access_token'),
       expires_at: integer('expires_at'),
       token_type: text('token_type'),
       scope: text('scope'),
       id_token: text('id_token'),
       session_state: text('session_state'),
     },
     account => [
       {
         compoundKey: primaryKey({
           columns: [account.provider, account.providerAccountId],
         }),
       },
     ]
   );

   export const sessions = pgTable('session', {
     sessionToken: text('sessionToken').primaryKey(),
     userId: text('userId').notNull(),
     expires: timestamp('expires', { mode: 'date' }).notNull(),
   });

   export const verificationTokens = pgTable(
     'verificationToken',
     {
       identifier: text('identifier').notNull(),
       token: text('token').notNull(),
       expires: timestamp('expires', { mode: 'date' }).notNull(),
     },
     verificationToken => [
       {
         compositePk: primaryKey({
           columns: [verificationToken.identifier, verificationToken.token],
         }),
       },
     ]
   );

   export const authenticators = pgTable(
     'authenticator',
     {
       credentialID: text('credentialID').notNull().unique(),
       userId: text('userId').notNull(),
       providerAccountId: text('providerAccountId').notNull(),
       credentialPublicKey: text('credentialPublicKey').notNull(),
       counter: integer('counter').notNull(),
       credentialDeviceType: text('credentialDeviceType').notNull(),
       credentialBackedUp: boolean('credentialBackedUp').notNull(),
       transports: text('transports'),
     },
     authenticator => [
       {
         compositePK: primaryKey({
           columns: [authenticator.userId, authenticator.credentialID],
         }),
       },
     ]
   );

   // 项目扩展表（无外键约束，应用层维护数据一致性）
   export const subscriptions = pgTable('subscription', {
     id: text('id')
       .primaryKey()
       .$defaultFn(() => crypto.randomUUID()),
     userId: text('userId').notNull(), // 关联 users.id
     tier: text('tier').notNull(), // 'free' | 'basic' | 'pro' | 'enterprise'
     status: text('status').notNull(), // 'active' | 'canceled' | 'expired'
     currentPeriodEnd: timestamp('currentPeriodEnd'),
     monthlyCredits: integer('monthlyCredits').notNull(),
     usedCredits: integer('usedCredits').notNull().default(0),
     createdAt: timestamp('createdAt').defaultNow(),
     updatedAt: timestamp('updatedAt').defaultNow(),
   });

   export const usageRecords = pgTable('usageRecord', {
     id: text('id')
       .primaryKey()
       .$defaultFn(() => crypto.randomUUID()),
     userId: text('userId').notNull(), // 关联 users.id
     modelId: text('modelId').notNull(),
     modelName: text('modelName').notNull(),
     input: json('input'),
     output: json('output'),
     cost: integer('cost').notNull(), // in credits
     duration: integer('duration'), // in ms
     status: text('status').notNull(), // 'pending' | 'completed' | 'failed'
     createdAt: timestamp('createdAt').defaultNow(),
   });

   export const payments = pgTable('payment', {
     id: text('id')
       .primaryKey()
       .$defaultFn(() => crypto.randomUUID()),
     userId: text('userId').notNull(), // 关联 users.id
     amount: integer('amount').notNull(), // in cents
     currency: text('currency').notNull().default('usd'),
     provider: text('provider').notNull(), // 'paypal' | 'creem'
     providerPaymentId: text('providerPaymentId'),
     subscriptionTier: text('subscriptionTier').notNull(),
     status: text('status').notNull(), // 'pending' | 'completed' | 'failed' | 'refunded'
     createdAt: timestamp('createdAt').defaultNow(),
   });
   ```

3. **Next-Auth 集成**
   ```bash
   pnpm add next-auth @auth/drizzle-adapter
   ```

   - 配置 Drizzle Adapter
   - 设置 OAuth 提供商（GitHub、Google）
   - 实现 session 管理

### 第三阶段：Replicate 集成（Day 4-5）

1. **Replicate SDK 配置**

   ```bash
   pnpm add replicate
   ```

2. **模型配置系统**

   ```typescript
   // src/config/models.ts
   export interface ModelConfig {
     id: string;
     name: string;
     description: string;
     category: 'text' | 'image' | 'audio' | 'video';
     version: string;
     inputSchema: Record<string, any>;
     outputType: string;
     estimatedTime: number; // seconds
     creditCost: number;
     requiredTier: 'free' | 'basic' | 'pro';
     featured: boolean;
   }

   export const models: ModelConfig[] = [
     {
       id: 'stability-ai/sdxl',
       name: 'Stable Diffusion XL',
       category: 'image',
       // ...
     },
     // 更多模型配置
   ];
   ```

3. **API 端点开发**
   - `/api/models` - 获取可用模型列表
   - `/api/predict` - 执行模型预测
   - `/api/usage` - 获取使用统计
   - `/api/webhook/replicate` - 处理异步结果

### 第四阶段：会员系统（Day 6）

1. **订阅配置**

   ```typescript
   // src/config/subscription.ts
   export const TIERS = {
     free: {
       name: '免费版',
       credits: 10,
       price: 0,
       features: ['基础模型', '10次/月'],
     },
     basic: {
       name: '基础版',
       credits: 100,
       price: 999, // $9.99
       features: ['所有模型', '100次/月', '优先队列'],
     },
     pro: {
       name: '专业版',
       credits: -1, // unlimited
       price: 2999, // $29.99
       features: ['所有模型', '无限使用', '最高优先级'],
     },
   };
   ```

2. **配额管理中间件**
   - 检查用户配额
   - 更新使用记录
   - 月度重置任务

### 第五阶段：支付集成（Day 7-8）

1. **PayPal 集成**

   ```bash
   pnpm add @paypal/checkout-server-sdk
   ```

   - 订阅支付流程
   - Webhook 处理

2. **Creem 集成**
   - API 集成
   - 支付流程实现

3. **统一支付接口**
   ```typescript
   // src/lib/payment/index.ts
   interface PaymentProvider {
     createSubscription(tier: string, userId: string): Promise<any>;
     cancelSubscription(subscriptionId: string): Promise<void>;
     handleWebhook(payload: any): Promise<void>;
   }
   ```

### 第六阶段：前端开发（Day 9-10）

1. **核心页面**
   - 首页：模型展示网格
   - 模型详情：参数表单 + 实时预览
   - 仪表板：使用统计 + 历史记录
   - 价格页面：会员对比表

2. **UI 组件库**
   ```bash
   pnpm add @radix-ui/react-* lucide-react
   ```

   - 集成 shadcn/ui 组件
   - 创建加载、错误、成功状态组件
   - 响应式设计

### 第七阶段：测试与优化（Day 11）

1. **测试配置**
   - Jest 单元测试
   - Playwright E2E 测试

2. **性能优化**
   - 图片 CDN 配置
   - API 响应缓存
   - 数据库查询优化

## 📝 环境变量配置

```env
# 数据库
DATABASE_URL="postgresql://user:pass@host/db"

# Next-Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Replicate（统一平台 API 密钥，非用户提供）
REPLICATE_API_TOKEN=""
REPLICATE_WEBHOOK_SECRET=""

# 支付
PAYPAL_CLIENT_ID=""
PAYPAL_CLIENT_SECRET=""
PAYPAL_WEBHOOK_SECRET=""
CREEM_API_KEY=""
CREEM_WEBHOOK_SECRET=""

# 应用配置
APP_URL="http://localhost:3000"
SUBSCRIPTION_WEBHOOK_SECRET=""
```

## 🚀 使用方式

```bash
# 1. 克隆模板
git clone fast-replicate my-ai-app

# 2. 安装依赖
cd my-ai-app && pnpm install

# 3. 配置环境变量
cp .env.example .env.local

# 4. 运行数据库迁移
./scripts/migrate.sh

# 5. 启动开发服务器
./scripts/dev.sh
```

## 📦 交付成果

- ✅ 完整的项目模板代码
- ✅ 模型配置示例（5-10个热门模型）
- ✅ 详细的使用文档
- ✅ 部署指南（Vercel + Supabase）
- ✅ API 文档（使用 OpenAPI）

## 🎯 核心特性

1. **订阅付费模式** - 用户无需提供 API 密钥，通过订阅获得使用权限
2. **高度模板化** - 修改配置即可添加新模型
3. **类型安全** - 全程 TypeScript + Drizzle 类型推导
4. **可扩展性** - 支持切换数据库/支付提供商
5. **生产就绪** - 包含日志、监控、错误处理
6. **优雅架构** - 每个文件 <300 行，清晰分层
7. **无外键约束** - 应用层维护数据一致性，提高灵活性
