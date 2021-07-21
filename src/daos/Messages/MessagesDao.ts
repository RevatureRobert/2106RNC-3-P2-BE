/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable max-len */
import { IMessage } from "../../entities/Messages";
import AWS from "aws-sdk";
import logger from "../../shared/Logger";
import deleteInBatch from "../Shared/dynamodb_batch_delete";
import { createHash } from "../../shared/functions";

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
  // add or update message based on message_id and current username
  addSubMessage: (messageInfo: IMessage) => Promise<void>;
  addMainMessage: (messageInfo: IMessage) => Promise<void>;
  updateMessage: (messageInfo: IMessage) => Promise<void>;
  //delete a message based on message_id and current username
  deleteMessage: (messageInfo: IMessage) => Promise<void>;
  deleteMessageGroup: (messageInfo: IMessage) => Promise<void>;
}

class MessagesDao implements IMessageDao {
  //************************************************************************************************
  //* Get Operators
  //************************************************************************************************

  /** COMPLETED!
   *
   * * pull everything from the table
   * ! this is only to be used for testing purposes
   * @returns
   */
  public getAll(): Promise<IMessage[]> {
    logger.info("Using route getAll in DAO");
    const params = {
      TableName: TABLE_NAME,
    };
    const db = dynamoClient.scan(params).promise();
    return db.then();
  }

  /** COMPLETED!
   *
   * * uses parent message ID to grab all sub messages
   * @param messageInfo
   * @returns
   */
  public getMessages(messageInfo: IMessage): Promise<IMessage | null> {
    logger.info("Using route getMessages in messages DAO");
    const params = {
      TableName: TABLE_NAME,
      FilterExpression: "#group = :group",
      ExpressionAttributeNames: {
        "#group": "parent_message_id",
      },
      ExpressionAttributeValues: {
        ":group": messageInfo.parentMessageId,
      },
    };
    const db = dynamoClient.scan(params).promise();
    return db.then();
  }

  /** COMPLETED!
   *
   * * takes in username and pulls any message in
   * *      which parent message and message ID match
   * @param messageInfo
   * @returns
   */
  public getGroups(messageInfo: IMessage): Promise<IMessage | null> {
    logger.info("Using route getMessages in messages DAO");
    const params = {
      TableName: TABLE_NAME,
      FilterExpression: "#username = :username AND #group = #message",
      ExpressionAttributeNames: {
        "#username": "username",
        "#group": "parent_message_id",
        "#message": "message_id",
      },
      ExpressionAttributeValues: {
        ":username": messageInfo.userName,
      },
    };
    const db = dynamoClient.scan(params).promise();
    return db.then();
  }

  //************************************************************************************************
  //* Post Operators
  //************************************************************************************************

  /** COMPLETED!
   *
   * * attempts to add a sub message under a parent message
   * @param messageInfo
   * @returns
   */
  public async addSubMessage(messageInfo: IMessage): Promise<void> {
    logger.info("Using route addComment in DAO");
    const id = await createHash(messageInfo.userName + String(Date.now()));
    const params = {
      TableName: TABLE_NAME,
      Item: {
        username: messageInfo.userName,
        message_id: id,
        parent_message_id: messageInfo.parentMessageId,
        message_date_time: String(Date.now()),
        message_text: messageInfo.messageText,
        main_message: 0,
      },
    };
    await dynamoClient.put(params).promise();
    return Promise.resolve(undefined);
  }

  /** COMPLETED!
   *
   * * add a single "main message" with matching message IDs
   * @param messageInfo
   * @returns
   */
  public async addMainMessage(messageInfo: IMessage): Promise<void> {
    logger.info("Using route addComment in DAO");
    const id = await createHash(messageInfo.userName + String(Date.now()));
    const params = {
      TableName: TABLE_NAME,
      Item: {
        username: messageInfo.userName,
        message_id: id,
        parent_message_id: id,
        message_date_time: String(Date.now()),
        message_text: messageInfo.messageText,
        main_message: 1,
      },
    };
    await dynamoClient.put(params).promise();
    return Promise.resolve(undefined);
  }

  //************************************************************************************************
  //* Put Operators
  //************************************************************************************************

  /** COMPLETED!
   *
   * * this function will attempt to update a message while maintaining data integrity
   * @param messageInfo
   * @returns
   */
  public async updateMessage(messageInfo: IMessage): Promise<void> {
    logger.info("Using route addorUpdate in messages DAO");
    let mp;
    if (messageInfo.messageId === messageInfo.parentMessageId) {
      mp = 1;
    } else {
      mp = 0;
    }
    const params = {
      TableName: TABLE_NAME,
      Item: {
        username: messageInfo.userName,
        message_id: messageInfo.messageId,
        parent_message_id: messageInfo.parentMessageId,
        message_date_time: String(Date.now()),
        message_text: messageInfo.messageText,
        main_message: mp,
      },
    };
    await dynamoClient.put(params).promise();
    return Promise.resolve(undefined);
  }

  //************************************************************************************************
  //* Delete Operators
  //************************************************************************************************

  /** COMPLETED!
   *
   * * this will only delete a single message based on messageId
   * @param messageInfo
   * @returns
   */
  public async deleteMessage(messageInfo: IMessage): Promise<void> {
    logger.info("Using route delete in messages DAO");
    const params = {
      TableName: TABLE_NAME,
      Key: {
        "username": messageInfo.userName,
        "message_id": messageInfo.messageId,
      },
    };
    await dynamoClient.delete(params).promise();
    return Promise.resolve(undefined);
  }

  /** COMPLETED!
   * *calls function in daos/shared/dynamodb_batch_delete
   * *  This will attempt to delete all messages with the parent message id
   * @param messageInfo
   */
  public async deleteMessageGroup(messageInfo: IMessage) {
    logger.info("Using route deleteGroup in messages DAO");
    await deleteInBatch(TABLE_NAME, [
      "parent_message_id",
      messageInfo.parentMessageId,
    ]);
  }
}

export default MessagesDao;
