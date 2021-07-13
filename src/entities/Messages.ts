/* eslint-disable max-len */
export interface IMessage {
    userName: string;
    messageId: string;
    parentMessageId: string;
    messageDateTime: string;
    recipientUserName: string;
    messageText: string;
    senderPublicName: string;
    recipientPublicName: string;
}

class Message implements IMessage {
    public userName: string;
    public messageId: string;
    public parentMessageId: string;
    public messageDateTime: string;
    public recipientUserName: string;
    public messageText: string;
    public senderPublicName: string;
    public recipientPublicName: string;

    constructor(
        userName: string,
        recipientUserName?: string,
        parentMessageId?: string,
        messageDateTime?: string,
        messageText?: string,
        senderPublicName?: string,
        recipientPublicName?: string
    ) {
        this.userName = userName;
        this.recipientUserName = recipientUserName || this.userName;
        this.messageId = `${userName}*${messageDateTime}`;
        this.parentMessageId =
            parentMessageId || `${userName}*${messageDateTime}`;
        this.messageDateTime = messageDateTime || String(Date.now());
        this.messageText = messageText || "";
        this.senderPublicName = senderPublicName || "";
        this.recipientPublicName = recipientPublicName || "";
    }
}

export default Message;
