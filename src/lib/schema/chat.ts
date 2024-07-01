import { pgEnum, text, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from ".";
import { userTable } from "./auth";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export const chatTable = pgTable("chat", {
  id: text("id").$defaultFn(createId).primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  chatname: text("chatname"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});

const messageTypeEnum = pgEnum("message_type", ["text", "image"]);

export const messageTable = pgTable("message", {
  id: text("id").$defaultFn(createId).primaryKey(),
  chatId: text("chat_id")
    .notNull()
    .references(() => chatTable.id),
  type: messageTypeEnum("type").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});

export const invitionTable = pgTable("invition", {
  id: text("id").$defaultFn(createId).primaryKey(),
  chatId: text("chat_id")
    .notNull()
    .references(() => chatTable.id),
  invitedUserId: text("invited_user_id")
    .notNull()
    .references(() => userTable.id),
});

export const collaboratorTable = pgTable("collaborator", {
  id: text("id").$defaultFn(createId).primaryKey(),
  chatId: text("chat_id")
    .notNull()
    .references(() => chatTable.id),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  joinedAt: timestamp("joined_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const chatRelations = relations(chatTable, ({ one, many }) => ({
  messages: many(messageTable),
  invitions: many(invitionTable),
  collaborators: many(collaboratorTable),
}));

export const messageRelations = relations(messageTable, ({ one }) => ({
  chat: one(chatTable, {
    fields: [messageTable.chatId],
    references: [chatTable.id],
  }),
}));

export const userRelations = relations(userTable, ({ one, many }) => ({
  chats: many(chatTable),
  invitions: many(invitionTable),
  collaborators: many(collaboratorTable),
}));
