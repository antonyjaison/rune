import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  console.log(messages);

  const result = await streamText({
    model: google('models/gemini-1.5-flash-latest'),
    messages
  });

  return result.toAIStreamResponse();
}