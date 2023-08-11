import { fetchMessage } from '@/common/libs/fetchMessage';
import { StatePlan } from '@/components/client/organisms';
import SaveMessageCard from '@/components/client/molecules/SaveMessageCard';
import type { SaveImageData, SaveMessageData } from '@/common/types/LineTypes';
import { Suspense } from 'react';
import ContentsWrapper from '@/components/client/template/ContentsWrapper';
import Link from 'next/link';
import { dateFormat } from '@/common/libs/dateFromat';
import textTruncate from '@/common/libs/textTruncate';
import TabMenuContents from '@/components/client/template/TabMenuContents';
import { fetchImages } from '@/common/libs/fetchImage';

interface SaveMessageDataType {
  data: SaveMessageData[] | boolean;
}

interface SaveImageDataType {
  imageData: SaveImageData[] | boolean;
}

export default async function MyPage() {
  // ログインしているユーザーの保存メッセージを取得
  const textChat: SaveMessageDataType = await fetchMessage();
  console.log('レスポンス', textChat);
  // イラスト画像データを取得
  const illust: SaveImageDataType = await fetchImages(1);
  console.log('イラスト画像', illust);
  // リアル画像データを取得
  const real: SaveImageDataType = await fetchImages(2);
  console.log('リアル画像', real);

  const thName = ['質問', '回答', '作成日'];

  return (
    <Suspense fallback={<div>MyPageのローディング中です</div>}>
      <ContentsWrapper>
        <div>
          <StatePlan text='マイページ' />
        </div>
        {/* tab */}
        <TabMenuContents data={textChat.data} />
        <div className='w-full relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='text-sm text-left w-full'>
            <thead className='text-xs text-gray-700 bg-gray-100'>
              <tr>
                <th scope='col' className='p-4'>
                  <div className='flex items-center'>
                    <input
                      id='checkbox-all-search'
                      type='checkbox'
                      className='
                        w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded 
                        focus:ring-blue-500 dark:focus:ring-blue-600 
                        dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 
                        focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                  </div>
                </th>
                {thName.map((list) => (
                  <th scope='col' className='px-6 py-3' key={list}>
                    {list}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {textChat.data && Array.isArray(textChat.data)
                ? textChat.data.map((item) => (
                    <tr
                      key={item.messageId}
                      className='bg-white border-b hover:bg-gray-50'
                    >
                      <td className='w-4 p-6'>
                        <div className='flex items-center'>
                          <input
                            id='checkbox-table-search-1'
                            type='checkbox'
                            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 '
                          />
                        </div>
                      </td>
                      <td>{textTruncate(item.question, 20)}</td>
                      <td>{textTruncate(item.answer, 20)}</td>
                      <td>{dateFormat(item.createdAt ?? 0)}</td>
                    </tr>
                  ))
                : ''}
            </tbody>
          </table>
        </div>
      </ContentsWrapper>
    </Suspense>
  );
}
