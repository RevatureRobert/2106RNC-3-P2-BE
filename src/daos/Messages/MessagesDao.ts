/* eslint-disable max-len */
import {IMessage} from "@entities/Messages";
import AWS from "aws-sdk";
import logger from "@shared/Logger";
import deleteInBatch from "../Shared/dynamodb_batch_delete";

//TODO Update Loggers

// Access details stored in env folder under prestart
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// create an instance of AWS
const dynamoClient = new AWS.DynamoDB.DocumentClient();

/**
 * identify the name of the table we are using
 */
const TABLE_NAME = "messages";

export interface IMessageDao {
    // retrieves message history with a given user
    getMessages: (messageInfo: IMessage) => Promise<IMessage | null>;
    // Retrieves only top-level messages (letting a user view all their DM groups/chains)
    getGroups: (messageInfo: IMessage) => Promise<IMessage | null>;
    getAll: () => Promise<IMessage[]>;
    // Potential future implementation; returns a specific message if linked to
    // getLinked: (messageInfo: IMessage) => Promise<iMessage | null>;
    // add or update message based on message_id and current username
    addorUpdateMessage: (messageInfo: IMessage) => Promise<void>;
    //delete a message based on message_id and current username
    deleteMessage: (
        messageInfo: IMessage,
        parentMessageId: string,
        messageId?: string
    ) => Promise<void>;
}

class MessagesDao implements IMessageDao {
    public getAll(): Promise<IMessage[]> {
        logger.info("Using route getAll in DAO");
        const params = {
            TableName: TABLE_NAME
        };
        const db = dynamoClient.scan(params).promise();
        return db.then();
    }

    public getMessages(messageInfo: IMessage): Promise<IMessage | null> {
        logger.info("Using route ```getMessages``` in messages DAO");
        const params = {
            TableName: TABLE_NAME,
            FilterExpression: "#username = :username AND #group = :group",
            ExpressionAttributeNames: {
                "#username": "username",
                "#group": "parent_message_id"
            },
            ExpressionAttributeValues: {
                ":username": messageInfo.userName,
                ":group": messageInfo.parentMessageId
            }
        };
        const db = dynamoClient.scan(params).promise();
        return db.then();
    }

    public getGroups(messageInfo: IMessage): Promise<IMessage | null> {
        logger.info("Using route ```getMessages``` in messages DAO");
        const params = {
            TableName: TABLE_NAME,
            FilterExpression: "#username = :username AND #group = #message",
            ExpressionAttributeNames: {
                "#username": "username",
                "#group": "parent_message_id",
                "#message": "message_id"
            },
            ExpressionAttributeValues: {
                ":username": messageInfo.userName
            }
        };
        const db = dynamoClient.scan(params).promise();
        return db.then();
    }

    public async addorUpdateMessage(messageInfo: IMessage): Promise<void> {
        logger.info("Using route ```addorUpdate``` in messages DAO");
        const params = {
            TableName: TABLE_NAME,
            Item: messageInfo,
            Key: {
                username: messageInfo.userName,
                message_id: messageInfo.messageId
            }
        };
        await dynamoClient.put(params).promise();
        return Promise.resolve(undefined);
    }

    // Delete will accomplish nothing if neither parentMessageId nor messageId are given
    public async deleteMessage(
        messageInfo: IMessage,
        parentMessageId?: string,
        messageId?: string
    ): Promise<void> {
        logger.info("Using route ```delete``` in messages DAO");
        if (!messageId && parentMessageId) {
            this.deleteGroup(messageInfo, parentMessageId);
        } else if (messageId) {
            const params = {
                TableName: TABLE_NAME,
                Key: {
                    username: messageInfo.userName,
                    message_id: messageId
                }
            };
            await dynamoClient.delete(params).promise();
            return Promise.resolve(undefined);
        }
    }

    public async deleteGroup(messageInfo: IMessage, parentMessageID: string) {
        logger.info("Using route ```deleteGroup``` in messages DAO");

        await deleteInBatch("messages", ["parent_message_id", parentMessageID]);
    }
}

export default MessagesDao;
