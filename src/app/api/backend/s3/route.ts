import { IRUKARA_API } from '@/common/constants/path';
import { postApi } from '@/common/libs/api/lambda/requestClient';
import { NextRequest, NextResponse } from 'next/server';
import AWS from 'aws-sdk';

/**
 * 著名付きURLを使用して画像をS3へアップロード後、リンクを返却、プロフィールのpictureUrlを更新する
 * @param userId
 * @param fileName
 * @param fileType
 */
export async function POST(req: NextRequest) {
  let response;
  let status;
  try {
    AWS.config.update({
      region: process.env.AWS_REGION,
      // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const { userId, fileName, fileType } = await req.json();

    // client
    const s3 = new AWS.S3();
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${userId}_${fileName}`,
      ContentType: fileType,
      ACL: 'public-read',
    };

    // 著名付きURL取得
    s3.getSignedUrl('putObject', params, async (err, data) => {
      if (err) {
        console.log('アップロードエラーです', err);
        response = {
          success: false,
          error: err,
        };
      } else {
        console.log('データには何が入ってる？', data);
        response = {
          success: true,
          signedRequest: data,
          url: `https://${process.env.AWS_S3_BUCKET_URL}/${fileName}`,
        };
      }
    });
  } catch (err) {
    console.error('s3 upload error...', err);
    response = false;
    status = 500;
  }

  return NextResponse.json(response, { status });
}
