import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema", // Adjust the path as per your project structure
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    url: "mysql://root:ShSql@17617@localhost:3306/edugate_db",
  },
  tablesFilter: ["*"], // Include all tables
  schemaFilter: ["public"], // Specify schema
});
