/* eslint-disable max-len */

export interface IMessage {
  userName: string;
  messageId: string;
  parentMessageId: string;
  messageTimestamp: string;
  messageText: string;
  senderPublicName: string;
  recipientPublicName: string;
}