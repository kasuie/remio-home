/*
 * @Author: kasuie
 * @Date: 2025-04-17 09:35:08
 * @LastEditors: kasuie
 * @LastEditTime: 2025-04-17 17:09:39
 * @Description:
 */
import { Pool } from "pg";

const globalForPg = globalThis as unknown as {
  pgPool: Pool | undefined;
};

export const pg =
  globalForPg.pgPool ||
  new Pool({
    connectionString: process.env.PG_DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
pg.on("connect", (client) => {
  client.query("SET TIME ZONE 'Asia/Shanghai';");
});

if (process.env.NODE_ENV !== "production") globalForPg.pgPool = pg;
