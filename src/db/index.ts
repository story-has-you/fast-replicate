import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// 检查必要的环境变量
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// 创建 PostgreSQL 连接
const client = postgres(process.env.DATABASE_URL, {
  // 连接池配置
  max: 20,
  idle_timeout: 20,
  connect_timeout: 10,
  
  // SSL 配置（生产环境建议启用）
  ssl: process.env.NODE_ENV === 'production' ? 'require' : false,
  
  // 连接选项
  prepare: false, // 禁用预处理语句缓存，适用于 serverless 环境
});

// 创建 Drizzle 实例
export const db = drizzle(client, { 
  schema,
  logger: process.env.NODE_ENV === 'development',
});

// 导出类型
export type Database = typeof db;

// 导出 schema 以便在其他文件中使用
export { schema };

// 数据库连接健康检查
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await client`SELECT 1`;
    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Database connection failed:', error);
    return false;
  }
}

// 优雅关闭数据库连接
export async function closeDatabaseConnection(): Promise<void> {
  try {
    await client.end();
    // eslint-disable-next-line no-console
    console.log('Database connection closed successfully');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error closing database connection:', error);
  }
}