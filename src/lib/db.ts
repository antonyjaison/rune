import { pgTableCreator } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as authSchema from "./schema/auth";
import * as chatSchema from "./schema/chat";

function singleton<Value>(name: string, value: () => Value): Value {
  const globalAny: any = global;
  globalAny.__singletons = globalAny.__singletons || {};

  if (!globalAny.__singletons[name]) {
    globalAny.__singletons[name] = value();
  }

  return globalAny.__singletons[name];
}

// Function to create the database connection and apply migrations if needed
function createDatabaseConnection() {
  const poolConnection = postgres(process.env.DB_URI!, {
    max: 1,
  });
  return drizzle(poolConnection, {
    schema: {
      ...authSchema,
      ...chatSchema,
    },
  });
}

export const db = singleton("db", createDatabaseConnection);
