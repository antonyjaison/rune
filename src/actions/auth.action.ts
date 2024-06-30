"use server";

import { db } from "@/lib/db";
import { hash, verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { getAuth, lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { userTable } from "@/lib/schema/auth";
import { actionClient } from "@/lib/safe-action";
import { signinSchema, signupSchema } from "@/lib/validation";
import { eq } from "drizzle-orm";

export const signup = actionClient
  .schema(signupSchema)
  .action(async ({ parsedInput }) => {
    {
      const { email, password } = parsedInput;

      const hashedPassword = await hash(password, {
        // recommended minimum parameters
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      });
      const userId = generateIdFromEntropySize(10); // 16 characters long

      const user = await db.query.userTable.findFirst({
        where: eq(userTable.email, email),
      });

      if (user) {
        return {
          failure: "Email already exists",
        };
      }

      await db.insert(userTable).values({
        id: userId,
        email,
        hashedPassword,
      });

      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      return redirect("/");
    }
  });

export const login = actionClient
  .schema(signinSchema)
  .action(async ({ parsedInput }) => {
    const { email, password } = parsedInput;
    const existingUser = await db.query.userTable.findFirst({
      where: eq(userTable.email, email),
    });
    if (!existingUser) {
      return {
        error: "Incorrect username or password",
      };
    }

    if (!existingUser.hashedPassword) {
      return {
        error: "Cannot login with credentials use Oauth",
      };
    }

    const validPassword = await verify(existingUser.hashedPassword, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    if (!validPassword) {
      return {
        error: "Incorrect username or password",
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return redirect("/");
  });

export const logout = actionClient.action(async () => {
  const { session } = await getAuth();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/signin");
});
