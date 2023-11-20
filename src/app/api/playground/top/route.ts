import { setTopChatGpt } from '@/common/utils/openai/config';
import { NextRequest, NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { API } from '@/common/constants/path';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(config);

    console.log('messages...', messages);

    const completions = setTopChatGpt(messages);

    const response = await openai.createChatCompletion(completions);

    // streamで返却
    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (err) {
    console.error('chat stream error...', err);
    return NextResponse.json(
      {
        message: err,
      },
      {
        status: 500,
      },
    );
  }
}
