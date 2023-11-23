import { marked } from 'marked';
import path from 'path';
import fs from 'fs';
import sanitizeHtml from 'sanitize-html';
import matter, { GrayMatterFile } from 'gray-matter';

interface SanitizeHtmlType {
  metaData: {
    title: string;
    date: string;
  };
  htmlContent: string;
}

// マークダウンをサニタイズして、htmlで返す関数
export default function sanitizeToHtml(fileName: string): SanitizeHtmlType {
  // markedの設定
  marked.use({
    // langPrefix: '',
    mangle: false,
    headerIds: false,
  });

  // マークダウンファイル読み込み
  const markdown = fs.readFileSync(
    path.join(process.cwd(), 'src/resources', fileName),
    'utf-8',
  );

  // サニタイズ
  const sanitized = sanitizeHtml(markdown);

  // メタ情報とコンテンツを取得
  const { data: frontMatter, content }: GrayMatterFile<string> = matter(
    sanitized,
    { excerpt: true },
  );
  // 型を変更
  const metaData = {
    title: frontMatter.title as string,
    date: frontMatter.date as string,
  };
  const htmlContent = marked(content);

  return {
    metaData,
    htmlContent,
  };
}
