export default function ChatSaveList({ textChatCount, textData }: any) {
  console.log('プロップス', textChatCount, textData);

  return (
    <div>
      {textChatCount > 0 && Array.isArray(textData) ? (
        textData.map((item) => (
          <div key={item.messageId}>
            <div>{item.question}</div>
            <div>{item.answer}</div>
            <div>{item.createdAt}</div>
          </div>
        ))
      ) : (
        <div>データが見つかりません</div>
      )}
    </div>
  );
}
