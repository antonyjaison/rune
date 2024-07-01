"use server";

import { db } from "@/lib/db";
import { authActionClient } from "@/lib/safe-action";
import { chatTable, messageTable } from "@/lib/schema/chat";
import { messageSendSchema } from "@/lib/validation";
import { eq } from "drizzle-orm";

export const sendMessage = authActionClient
  .schema(messageSendSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { user } = ctx;
    const { message, type, chatId } = parsedInput;

    // Do something with the message
    const chat = await db.query.chatTable.findFirst({
      where: eq(chatTable.id, chatId),
      columns: {
        id: true,
      },
    });

    if (!chat) {
      return {
        error: "Chat not found",
        data: null,
      };
    }

    const newMessage = {
      chatId,
      messageType: "text" as const,
      userId: user.id,
      content: "Hello",
      role: "bot" as const,
    };

    await db.insert(messageTable).values([
      {
        content: message,
        chatId,
        messageType: type,
        userId: user.id,
        role: "user" as const,
      },
      newMessage,
    ]);

    return {
      data: newMessage,
      error: null,
    };
  });
