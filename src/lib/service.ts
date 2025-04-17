/*
 * @Author: kasuie
 * @Date: 2025-04-17 10:34:15
 * @LastEditors: kasuie
 * @LastEditTime: 2025-04-17 18:19:12
 * @Description:
 */
import { pg } from "./db";
import { AppConfig } from "@/config/config";
import { defaultAppConfig } from "./rules";

const TableName = "app_config";

export class AppConfigService {
  private isSyncTable: boolean = false;

  async initTableIfNotExists() {
    await this.syncTable(true);
  }

  /**
   * 根据版本获取配置
   * @param parse 是否parse
   * @param ver 指定版本
   * @returns
   */
  async getConfigByVer(
    parse: boolean = false,
    ver: string = "latest"
  ): Promise<AppConfig | null> {
    const result = await pg.query(
      `SELECT * FROM ${TableName} WHERE version = '${ver}' LIMIT 1`
    );
    if (!result?.rowCount) return null;
    return parse ? result.rows[0] : result.rows[0];
  }

  /**
   * 更新或新增数据
   * @param config 数据
   */
  async upsertConfig(config: Record<string, any>) {
    const converted = onConvert(config, "stringify");
    const keys = Object.keys(converted);
    const columns = keys.map((col) => `"${col}"`).join(", ");
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
    const updateFields = keys
      .filter((key) => key !== "updated_at")
      .map((col) => `"${col}" = EXCLUDED."${col}"`)
      .join(", ");

    const values = keys.map((col) => converted[col]);

    const sql = `
      INSERT INTO ${TableName} (${columns})
      VALUES (${placeholders})
      ON CONFLICT (version)
      DO UPDATE SET ${updateFields}, updated_at = now();
    `;

    return (await pg.query(sql, values))?.rowCount;
  }

  async syncTable(create: boolean = false) {
    if (this.isSyncTable) return;
    this.isSyncTable = true;
    try {
      const columns = {
        id: "SERIAL PRIMARY KEY",
        ...onConvert(defaultAppConfig),
        version: "TEXT",
        remark: "TEXT",
        created_at: "TIMESTAMP DEFAULT now()",
        updated_at: "TIMESTAMP DEFAULT now()",
      };
      if (create) {
        // 检查表是否存在
        const tableExists = await pg.query(
          `SELECT to_regclass($1) IS NOT NULL AS exists`,
          [TableName]
        );
        if (!tableExists.rows[0].exists) {
          // 如果表不存在就直接创建
          const createSQL = `CREATE TABLE ${TableName} (${Object.entries(
            columns
          )
            .map(([key, type]) => `"${key}" ${type}`)
            .join(", ")})`;
          await pg.query(createSQL);
          await pg.query(
            `CREATE UNIQUE INDEX IF NOT EXISTS unique_version ON ${TableName}(version);`
          );
          console.log(`[✓] Created table '${TableName}'`);
          return;
        }
      }

      // 获取当前表字段
      const result = await pg.query(
        `SELECT column_name FROM information_schema.columns WHERE table_name = $1`,
        [TableName]
      );
      const existingColumns = result.rows.map((row) => row.column_name);

      // 找出缺少的字段，进行同步
      const alterStatements = Object.entries(columns)
        .filter(([column]) => !existingColumns.includes(column))
        .map(
          ([column, type]) =>
            `ALTER TABLE ${TableName} ADD COLUMN "${column}" ${type};`
        );

      for (const stmt of alterStatements) {
        await pg.query(stmt);
        console.log(`[+] Added column: ${stmt}`);
      }
      console.log(`[✓] Synced '${TableName}' structure`);
    } finally {
      this.isSyncTable = false;
    }
  }
}

export const onConvert = (
  appConfig: Record<string, any>,
  key: string = "sql"
) => {
  const tempConfig: Record<string, any> = defaultAppConfig;
  const keys = Object.keys(tempConfig);
  return Object.keys(appConfig || {})?.reduce(
    (prev: Record<string, any>, curr: string) => {
      const type = mapTypeScriptTypeToSQL(
        key != "parse" ? typeof appConfig[curr] : typeof tempConfig[curr]
      );
      if (key === "sql") {
        prev[curr] = type;
      } else if (
        (key === "stringify" || key === "parse") &&
        [...keys, "id", "version", "remark", "created_at"].includes(curr)
      ) {
        if (type === "JSONB") {
          prev[curr] = JSON[key]?.(appConfig[curr]) || null;
        } else {
          prev[curr] = appConfig[curr];
        }
      }
      return prev;
    },
    {}
  );
};

const mapTypeScriptTypeToSQL = (type: string): string => {
  switch (type) {
    case "string":
      return "TEXT";
    case "number":
      return "INTEGER";
    case "boolean":
      return "BOOLEAN";
    case "object":
      return "JSONB";
    default:
      return "JSONB";
  }
};
