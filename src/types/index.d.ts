// 設定関係で使用する型定義をまとめる
declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}
