/** テキストを切り詰める */
// TODO ...から「詳細を見る」や「もっと見る」とかにしたい

export default function textTruncate(text: string, maxLength: number): string {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
}
