/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IUser } from "../../entities/User";
import logger from "../../shared/Logger";
import AWS from "aws-sdk";

let config;
let dynamoClient: any;
if (process.env.NODE_ENV === "test") {
  config = {
    convertEmptyValues: true,
    ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
      endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
      sslEnabled: false,
      region: "local",
    }),
  };
  // create an instance of AWS
  dynamoClient = new AWS.DynamoDB.DocumentClient(config);
} else {
  // Access details stored in env foler under prestart
  AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  // create an instance of AWS
  dynamoClient = new AWS.DynamoDB.DocumentClient();
}

//table being accessed in database
const TABLE_NAME = "profile";

// interface used for items below
export interface IUserDao {
  getOne: (user: IUser) => Promise<IUser | null>;
  getAll: (user: IUser) => Promise<IUser[]>;
  addUser: (user: IUser) => Promise<void>;
  updateUser: (user: IUser) => Promise<void>;
  deleteUser: (user: IUser) => Promise<void>;
}

class UserDao implements IUserDao {
  //************************************************************************************************
  //* Get Operators
  //************************************************************************************************

  /** COMPLETED!
   *
   * References:
   *  https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.04.html
   *  https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html
   *
   * Returns a user by the username
   * @param username
   */
  public getOne(user: IUser): Promise<IUser | null> {
    logger.info("Using getOne route in users DAO");
    const params = {
      TableName: TABLE_NAME,
      FilterExpression: "#username = :username",
      ExpressionAttributeNames: {
        "#username": "username",
      },
      ExpressionAttributeValues: {
        ":username": user.userName,
      },
    };
    const db = dynamoClient.scan(params).promise();
    return db.then();
  }

  /** COMPLETED!
   *
   * Returns all users in the table
   * @returns
   */
  public getAll(): Promise<IUser[]> {
    logger.info("Using getAll route in users DAO");
    const params = {
      TableName: TABLE_NAME,
    };
    const db = dynamoClient.scan(params).promise();
    return db.then();
  }

  //************************************************************************************************
  //* Post Operators
  //************************************************************************************************

  /**
   * Adds a user's information
   * @param user
   */
  public async addUser(user: IUser): Promise<void> {
    logger.info("Using add route in DAO");
    const params = {
      TableName: TABLE_NAME,
      Item: {
        username: user.userName,
        first_name: user.firstName,
        last_name: user.lastName,
        phone_number: user.phoneNumber,
        public_name: user.publicName
      },
    };
    await dynamoClient.put(params).promise();
    return Promise.resolve(undefined);
  }

  //************************************************************************************************
  //* Put Operators
  //************************************************************************************************

  /**
   * Adds/Updates a user's information
   * @param user
   */
  public async updateUser(user: IUser): Promise<void> {
    logger.info("Using add/update route in DAO");
    const params = {
      TableName: TABLE_NAME,
      Item: {
        username: user.userName,
        first_name: user.firstName,
        last_name: user.lastName,
        phone_number: user.phoneNumber,
        public_name: user.publicName
      },
    };
    await dynamoClient.put(params).promise();
    return Promise.resolve(undefined);
  }

  //************************************************************************************************
  //*  Delete Operators
  //************************************************************************************************

  /**
   * Deletes a user by the username
   * @param userName
   */
  public async deleteUser(user: IUser): Promise<void> {
    logger.info("Using delete route in users DAO");
    const params = {
      TableName: TABLE_NAME,
      Key: {
        "username": user.userName,
      },
    };
    await dynamoClient.delete(params).promise();
    return Promise.resolve(undefined);
  }
}

export default UserDao;
