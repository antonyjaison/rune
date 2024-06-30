import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  schema: "./src/lib/schema/*",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URI!,
  },
  tablesFilter: ["rune_*"],
});
