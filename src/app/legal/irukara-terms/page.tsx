import sanitizeToHtml from '@/common/utils/markdown/sanitized';
import { Metadata } from 'next';
import ContentsWrapper from '@/components/client/template/ContentsWrapper';

// 利用規約
export const metadata: Metadata = {
  title: 'Irukara 利用規約',
};

export default function Terms() {
  const { metaData, htmlContent } = sanitizeToHtml('irukara-terms.md');

  return (
    <ContentsWrapper>
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: htmlContent,
        }}
        className='contents-md'
      />
      <div>
        <p>{metaData.date}</p>
      </div>
    </ContentsWrapper>
  );
}
