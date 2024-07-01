"use server";

import { getAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { authActionClient } from "@/lib/safe-action";
import { chatTable, collaboratorTable, messageTable } from "@/lib/schema/chat";
import { chatSchema } from "@/lib/validation";
import axios from "axios";
import { eq, inArray, or } from "drizzle-orm";
import { redirect } from "next/navigation";

export const createChat = authActionClient
  .schema(chatSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { user } = ctx;
    const { message } = parsedInput;

    // Do something with the message
    const chat = await db
      .insert(chatTable)
      .values({
        userId: user.id,
        chatname: "New Chat",
      })
      .returning();

    const chatId = chat[0].id;

    const res = await axios.post(process.env.BACKENDAPI_URL! + "/chat", {
      uid: chatId,
      message: message,
    });

    await db
      .insert(messageTable)
      .values([
        {
          chatId,
          messageType: "text",
          userId: user.id,
          content: message,
          role: "user",
        },
        {
          chatId,
          messageType: "text",
          userId: user.id,
          content: res.data.response,
          role: "bot",
        },
      ])
      .returning();

    return redirect(`/chat/${chat[0].id}`);
  });

export const getChats = async () => {
  const auth = await getAuth();
  if (!auth.user) {
    return {
      error: "Unauthorized",
      data:null
    };
  }
  const collaboratedChatIds = await db.query.collaboratorTable.findMany({
    where: eq(collaboratorTable.userId, auth.user.id),
    columns: {
      chatId: true,
    },
  });

  const chats = await db.query.chatTable.findMany({
    where: or(
      eq(chatTable.userId, auth.user.id),
      inArray(
        chatTable.id,
        collaboratedChatIds.map((c) => c.chatId)
      )
    ),
  });

  return {
    data: chats,
    error: null,
  };
};

export const getChatDetail = async (chatId: string) => {
  const auth = await getAuth();
  if (!auth.user) {
    return {
      error: "Unauthorized",
    };
  }

  const chatDetails = await db.query.chatTable.findFirst({
    where: eq(chatTable.id, chatId),
    with: {
      messages: true,
    },
  });

  if (!chatDetails) {
    return {
      error: "Chat not found",
    };
  }

  return chatDetails;
};
