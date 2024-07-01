"use server";

import { db } from "@/lib/db";
import { authActionClient } from "@/lib/safe-action";
import { chatTable, messageTable } from "@/lib/schema/chat";
import { messageSendSchema } from "@/lib/validation";
import axios from "axios";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const sendMessage = authActionClient
  .schema(messageSendSchema)
  .action(async ({ parsedInput, ctx }) => {
    try {
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

      const res = await axios.post(process.env.BACKENDAPI_URL! + "/chat", {
        uid: chat.id,
        message: type === "file" ? "file uploaded" : message,
        pdf_url: type === "file" ? message : undefined,
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

      revalidatePath(`/chat/${chatId}`, "page");

      return {
        data: newMessage,
        error: null,
      };
    } catch (e) {
      console.error(e);
    }
  });
