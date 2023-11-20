import { EXTERNAL_API } from '@/common/constants/path';
import { setTopChatGpt } from '@/common/utils/openai/config';
import { NextRequest, NextResponse } from 'next/server';
import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from 'eventsource-parser';

/**
 * TOPページのチャット
 * @param req
 * @returns {false | StreamingTextResponse}
 */

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { message, type } = await req.json();
    const config = setTopChatGpt(message);

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const res = await fetch(EXTERNAL_API.GPT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(config),
    });

    let counter = 0;

    // stream
    const stream = new ReadableStream({
      async start(controller) {
        function push(event: ParsedEvent | ReconnectInterval) {
          // console.log('ストリームイベント', event);
          if (event.type === 'event') {
            const { data } = event;

            // 終了したらstreamを閉じる
            if (data === '[DONE]') {
              console.log('終了', data);
              controller.close();
              return;
            }

            // 終了していない場合は取り出す
            try {
              const json = JSON.parse(data);
              const answer = json.choices[0].delta?.content ?? '';

              if (counter < 2 && (answer.match(/\n/) || []).length) {
                return;
              }

              const queue = encoder.encode(answer);
              controller.enqueue(queue);
              counter += 1;
            } catch (err) {
              controller.error(err);
            }
          }
        }

        const parser = createParser(push);

        for await (const chunk of res.body as any) {
          console.log('res body', res.body);
          parser.feed(decoder.decode(chunk));
        }
      },
    });

    console.log('ストリーム', stream);

    return new NextResponse(stream);
  } catch (err) {
    console.error('openai error...', err);
  }
}
