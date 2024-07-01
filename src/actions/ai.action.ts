"use server";

import { db } from "@/lib/db";
import { authActionClient } from "@/lib/safe-action";
import { chatTable, messageTable } from "@/lib/schema/chat";
import { messageSendSchema } from "@/lib/validation";
import axios from "axios";
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

    const res = await axios.post(process.env.BACKEND_API!, {
      uid: chat.id,
      message: type === "file" ? "" : message,
      pdf_url: message,
    });

    const newMessage = {
      chatId,
      messageType: "text" as const,
      userId: user.id,
      content: res.data.response,
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
