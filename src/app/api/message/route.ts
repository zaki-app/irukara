import { NextRequest, NextResponse } from 'next/server';

export interface UpdateMessageData {
  memberStatus: number;
  mode: number;
  referenceType: number;
  shareStatus: number;
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  // const irukaraId = req.cookies.get('irukaraId')?.value;
  const messageId = '';
  const irukaraAt = req.cookies.get('irukaraAT')?.value;

  const endpoint = `${process.env.IRUKARA_API_ENDPOINT}save-message-update/${messageId}`;

  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      Authorization: irukaraAt ?? '',
    },
    body,
  });

  console.log('backend res', response);

  let updateResponse;
  if (response.ok) {
    updateResponse = await response.json();
  } else {
    updateResponse = JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
    });
  }

  return NextResponse.json({ updateResponse });
}
