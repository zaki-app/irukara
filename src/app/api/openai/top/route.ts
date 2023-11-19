import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { setTopChatGpt } from '@/common/utils/openai/config';

export const runtime = 'edge';

/**
 * TOPページのチャット
 * @param req
 * @returns {false | StreamingTextResponse}
 */
export async function POST(req: Request) {
  try {
    const config = new Configuration({
      apiKey: process.env.OPEN_AI_API_KEY,
    });
    const openai = new OpenAIApi(config);

    const { messages } = await req.json();

    const topConfig = setTopChatGpt(messages);
    const response = await openai.createChatCompletion(topConfig);

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (err) {
    console.error('chatgpt response error...', err);
    return false;
  }
}
