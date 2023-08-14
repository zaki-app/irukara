import { getCookie } from '@/common/utils/authLINE/manageCookies';
import { NextRequest, NextResponse } from 'next/server';

export interface UpdateMessageData {
  memberStatus: number;
  mode: number;
  referenceType: number;
  shareStatus: number;
}

export default async function POST(req: NextRequest, res: NextResponse) {
  console.log('apiにリクエスト', req);
}

// export const updateMessage = async (props: UpdateMessageData) => {
//   console.log('api props', props);

//   const userId = await getCookie('irukaraId');
//   const token = await getCookie('irukaraAT');

//   const endpoint = `${process.env.IRUKARA_API_ENDPOINT}save-message-update/${userId}`;

//   console.log('endpoint', endpoint);

//   let response;
//   if (userId && token) {
//     const res = await fetch(endpoint, {
//       // method: 'PUT',
//       headers: {
//         Authorization: token ?? '',
//       },
//     });

//     if (res.ok) {
//       response = await res.json();
//     }
//   }

//   console.log('レスポンス', response);
//   return response;
// };
