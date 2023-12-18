/* MessageTableに関しての型定義 */

export interface MessageType {
  answer: string;
  createdAt: number;
  memberStatus: string;
  messageId: string;
  mode: number;
  question: string;
  referenceType: string;
  requestType: string;
  shareStatus: string;
  userId: string;
}

export interface GetMessagesType {
  count: number;
  data: MessageType[];
}
