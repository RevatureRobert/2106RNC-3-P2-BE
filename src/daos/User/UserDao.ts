import {IUser} from "@entities/User";
import logger from "@shared/Logger";
import AWS from "aws-sdk";

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "profile";
export interface IUserDao {
    getOne: (username: string) => Promise<IUser | null>;
    getAll: () => Promise<IUser[]>;
    add: (user: IUser) => Promise<void>;
    update: (user: IUser) => Promise<void>;
    delete: (username: string) => Promise<void>;
}

class UserDao implements IUserDao {
    /**
     * @param username
     */
    public getOne(username: string): Promise<IUser | null> {
        logger.info("Using getOne route in DAO");
        const params = {
            TableName: TABLE_NAME,
            Key: {
                username: username
            }
        };
        const db = dynamoClient.query(params).promise();
        return db.then();
    }

    /**
     *
     */
    public getAll(): Promise<IUser[]> {
        logger.info("Using getAll route in DAO");
        const params = {
            TableName: TABLE_NAME
        };
        const db = dynamoClient.scan(params).promise();
        return db.then();
    }

    /**
     *
     * @param user
     */
    public async add(user: IUser): Promise<void> {
        logger.info("Using add route in DAO");
        const {username, first_name, last_name, phone_number, publicName} =
            user;
        const params = {
            TableName: TABLE_NAME,
            Item: {
                username: {S: username},
                first_name: {S: first_name},
                last_name: {S: last_name},
                phone_number: {S: phone_number},
                public_name: {S: publicName}
            }
        };
        await dynamoClient.put(params).promise();
        return Promise.resolve(undefined);
    }

    /**
     *
     * @param user
     */
    public async update(user: IUser): Promise<void> {
        logger.info("Using update route in DAO");
        const params = {
            TableName: TABLE_NAME,
            Item: {
                username: {S: user.username},
                first_name: {S: user.first_name},
                last_name: {S: user.last_name},
                phone_number: {S: user.phone_number},
                public_name: {S: user.publicName}
            }
        };
        await dynamoClient.put(params).promise();
        return Promise.resolve(undefined);
    }

    /**
     *
     * @param userName
     */
    public async delete(username: string): Promise<void> {
        logger.info("Using delete route in DAO");
        const params = {
            TableName: TABLE_NAME,
            Key: {
                username: username
            }
        };
        await dynamoClient.delete(params).promise();
        return Promise.resolve(undefined);
    }
}

export default UserDao;
