import { COOKIE_NAME } from '@/common/constants';
import { getCookie } from '@/common/utils/cookie/manageCookies';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { SIZE, VALIDATE } from '@/common/constants/validate';
import { generateFileName } from '@/common/utils/common/useCrypto';
import { s3Client } from '../client';

/**
 * 著名付きURLを発行しアップロードする
 * @param req
 * @returns
 */
export async function GET(req: NextRequest) {
  console.log('get args...', req);
  const userId = await getCookie(COOKIE_NAME.IRUKARA_ID);

  const { searchParams } = req.nextUrl;
  const type = searchParams.get('type');
  const size = Number(searchParams.get('size'));
  const checksum = searchParams.get('checksum');

  const response = {
    success: true,
    url: '',
    message: '', // エラー判断のメッセージ
  };
  let status = 200;

  // validation
  const acceptedType = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (!acceptedType.includes(type as string)) {
    response.success = false;
    response.message = VALIDATE.ACCEPT;
  } else if (size > SIZE.FIVE_MB) {
    response.success = false;
    response.message = VALIDATE.IMAGE_SIZE;
  } else {
    try {
      const client = s3Client();
      const Key = generateFileName();

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `profile/${Key}`,
        ContentType: type as string,
        ContentLength: size,
        ChecksumSHA256: checksum as string,
        Metadata: {
          userId,
        },
      });

      const signedUrl = await getSignedUrl(client, command, {
        expiresIn: 240,
      });

      response.url = signedUrl;
    } catch (err) {
      console.error('getSignedUrl error...', err);
      response.success = false;
      status = 500;
    }
  }

  return NextResponse.json(response, { status });
}
