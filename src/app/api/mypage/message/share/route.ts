import { NextRequest, NextResponse } from 'next/server';
import { UpdateMessageData } from '@/types/fetchData';
import logColor from '@/common/config/logColor';

interface UpdateMessageResponse {
  status: number;
  result: boolean;
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const body: UpdateMessageData = await req.json();
  let response: UpdateMessageResponse;
  const errorResponse = {
    status: 500,
    result: false,
  };

  try {
    const { messageId, ...updateVal } = body;
    const irukaraAt = req.cookies.get('irukaraAT')?.value;
    const endpoint = `${process.env.IRUKARA_API_ENDPOINT}save-message-update/${messageId}`;

    const res = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        Authorization: irukaraAt as string,
      },
      body: JSON.stringify(updateVal),
    });

    const resData = await res.json();
    console.log(`${logColor.green}Success Updata...${logColor.reset}`, resData);

    response = {
      status: 200,
      result: true,
    };
  } catch (err) {
    console.error(`${logColor.red}update error...${logColor.reset}`, body);
    response = errorResponse;
  }

  console.log('最終的なレスポンス', response);
  return NextResponse.json(response);
}
