import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const chatSchema = z.object({
  message: z.string().trim().min(1, {
    message: "Message must be at least 1 character long",
  }),
});


export const messageSendSchema = z.object({
  message: z.string().trim().min(1, {
    message: "Message must be at least 1 character long",
  }),
  type: z.enum(["text", "image"], {
    message: "Message type must be either text or image",
  }),
  chatId: z.string().trim(),
});