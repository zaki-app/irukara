'use client';

export default function TopServiceDescription() {
  console.log('環境変数', process.env);
  return (
    <div className='font-semibold text-2xl bg-gray-300 py-12 px-4'>
      <div className='mb-10'>
        <h2>
          Irukaraは
          <br />
          LINEでの
          <br />
          やりとりを保存して、
          <br />
          時間がある時に
          <br />
          見返せる優れものです
        </h2>
        <p>{process.env.CURRENT_STAGE}に現在います。他の環境変数は？</p>
        <p>{process.env.NEXT_PUBLIC_STAGE}は見れるか？</p>
        <p>vercelの自動デプロイは停止しました</p>
      </div>
      <div>
        <h2>
          Irukaraの回答は、
          <br />
          話題になっている
          <br />
          AIアシスタントのChatGPTがおこないます
        </h2>
      </div>
    </div>
  );
}
