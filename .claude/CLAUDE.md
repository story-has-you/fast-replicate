# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

Fast-Replicate 是一个 Next.js AI SaaS 模板项目，用于快速搭建调用 Replicate.com AI 模型的订阅制应用。用户通过购买会员获得 AI 模型使用权限，无需提供自己的 API 密钥。

## 核心技术栈

- **前端**: Next.js 15 + React 19 + TypeScript
- **样式**: Tailwind CSS v4 + shadcn/ui (New York style)
- **包管理**: pnpm (必须使用，不使用 npm/yarn)
- **数据库**: 计划使用 Drizzle ORM + PostgreSQL
- **认证**: 计划使用 Next-Auth
- **AI 集成**: 计划使用 Replicate SDK
- **支付**: 计划使用 PayPal + Creem

## 开发命令

```bash
# 开发环境 (使用 Turbopack)
pnpm dev

# 构建生产版本 (使用 Turbopack)
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint

# 修复 lint 问题
pnpm lint:fix

# 格式化代码
pnpm format

# 检查代码格式
pnpm format:check

# TypeScript 类型检查
pnpm type-check
```

## 项目架构

### 目录结构（规划中）

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API 路由
│   ├── (auth)/         # 认证相关页面
│   ├── models/         # 模型展示页面
│   ├── dashboard/      # 用户仪表板
│   └── pricing/        # 价格页面
├── components/         # React 组件
│   ├── ui/            # shadcn/ui 基础组件
│   ├── models/        # 模型相关组件
│   └── layout/        # 布局组件
├── lib/               # 工具函数
│   ├── auth/          # 认证工具
│   ├── replicate/     # Replicate 封装
│   └── payment/       # 支付工具
├── db/                # 数据库
│   ├── schema.ts      # Drizzle Schema
│   ├── index.ts       # 数据库连接
│   └── migrations/    # 数据库迁移
├── services/          # 业务逻辑
├── config/            # 配置文件
│   ├── models.ts      # 模型配置
│   └── subscription.ts # 订阅配置
└── types/             # TypeScript 类型
```

### 核心设计原则

1. **精品工具页面**: 每个 AI 模型都有独立的单页面，集成工具输入 + SEO 内容 + 结果展示
2. **零跳转体验**: 从输入到结果展示全程在同一页面完成
3. **订阅制模式**: 用户通过积分系统使用 AI 模型，无需提供 API 密钥
4. **黑白极简主题**: 使用 shadcn/ui 组件 + 黑白配色方案

### shadcn/ui 配置

- 样式: New York
- 基础颜色: neutral
- 图标库: lucide-react
- 路径别名已配置: `@/components`, `@/lib`, `@/hooks` 等

## 重要约定

1. **包管理**: 必须使用 pnpm，项目配置了 Turbopack 加速构建
2. **代码质量**: 配置了 ESLint + Prettier，代码提交前需要通过检查
3. **文件大小**: 遵循每个代码文件不超过 300 行的原则
4. **类型安全**: 所有数据结构定义为强类型，避免使用 any
5. **脚本系统**: 计划在 scripts/ 目录维护所有运行脚本（目前尚未创建）

## 关键业务逻辑

1. **模型配置系统**: 通过配置文件管理 AI 模型的参数、定价、权限等
2. **积分系统**: 不同订阅层级对应不同的月度积分额度
3. **结果展示**: 支持公开/私有结果，默认公开，精选策略展示优质内容
4. **SEO 优化**: 每个模型页面独立优化，包含详细的使用说明和示例

## 当前状态

这是一个新建的项目模板，仅有基础的 Next.js 结构。大部分功能（数据库、认证、AI 集成、支付系统）还需要根据设计文档实现。

参考文档:

- `/docs/implementation-plan.md` - 详细实施计划
- `/docs/requirements-list.md` - 任务清单
- `/docs/ui-ux-design.md` - UI/UX 设计文档
