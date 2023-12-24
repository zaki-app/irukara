/* MessageTableに関しての型定義 */

export interface MessageType {
  answer: string;
  createdAt: number;
  memberStatus: string;
  messageId: string;
  question: string;
}

export interface GetMessagesType {
  count: number;
  data: MessageType[];
}
