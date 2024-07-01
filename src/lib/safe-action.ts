import { createSafeActionClient } from "next-safe-action";
import { getAuth } from "./auth";

export const actionClient = createSafeActionClient();

export const authActionClient = actionClient.use(async ({ next }) => {
  const auth = await getAuth();
  if (!auth.user) {
    throw new Error("Unauthorized");
  }

  return next({ ctx: { user: auth.user } });
});

