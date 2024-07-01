"use server";

import { getAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { authActionClient } from "@/lib/safe-action";
import { userTable } from "@/lib/schema/auth";
import { chatTable, collaboratorTable, invitionTable } from "@/lib/schema/chat";
import { and, eq, ilike, ne } from "drizzle-orm";
import { z } from "zod";

export const getUserEmailAndIds = authActionClient
  .schema(
    z.object({
      email: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    const { email } = parsedInput;
    const users = await db.query.userTable.findMany({
      where: and(
        ilike(userTable.email, `%${email}%`),
        ne(userTable.id, ctx.user.id)
      ),
      columns: {
        id: true,
        email: true,
      },
    });

    return users;
  });

export const sendInvitation = authActionClient
  .schema(
    z.object({
      chatId: z.string(),
      invitedUserId: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    const { chatId, invitedUserId } = parsedInput;
    const chat = await db.query.chatTable.findFirst({
      where: eq(chatTable.id, chatId),
    });

    if (!chat) {
      return {
        error: "Chat not found",
        data: null,
      };
    }

    if (chat.userId !== ctx.user.id) {
      return {
        error: "Not authorized",
        data: null,
      };
    }

    if (chat.userId === invitedUserId || ctx.user.id === invitedUserId) {
      return {
        error: "Cannot invite yourself",
        data: null,
      };
    }

    const user = await db.query.userTable.findFirst({
      where: eq(userTable.id, invitedUserId),
    });

    if (!user) {
      return {
        error: "User not found",
        data: null,
      };
    }

    const data = await db
      .insert(invitionTable)
      .values({
        chatId,
        invitedUserId,
      })
      .returning();

    return {
      error: null,
      data: data[0].id,
    };
  });

export const acceptInvitation = authActionClient
  .schema(
    z.object({
      invitationId: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    const { invitationId } = parsedInput;
    const { user } = ctx;

    const invitation = await db.query.invitionTable.findFirst({
      where: and(
        eq(invitionTable.id, invitationId),
        eq(invitionTable.invitedUserId, user.id)
      ),
    });

    if (!invitation) {
      return {
        error: "Invitation not found",
        data: null,
      };
    }

    const chat = await db.query.chatTable.findFirst({
      where: eq(chatTable.id, invitation.chatId),
    });

    if (!chat) {
      return {
        error: "Chat not found",
        data: null,
      };
    }

    const data = await db
      .insert(collaboratorTable)
      .values({
        chatId: chat.id,
        userId: user.id,
        joinedAt: new Date(),
      })
      .returning();

    await db.delete(invitionTable).where(eq(invitionTable.id, invitationId));

    return data[0].id;
  });


  export const getInvitations = async () => {
    const auth = await getAuth();

    if (!auth.user) {
      return {
        error: "Not authenticated",
        data: null,
      };
    }

    const invitations = await db.query.invitionTable.findMany({
      where: eq(invitionTable.invitedUserId, auth.user.id),
      with: {
        chat: {
          with: {
            user: {
              columns: {
                email: true,
              },
            },
          },
        },
      },
    });

    return {
      error: null,
      data: invitations,
    };
  };
