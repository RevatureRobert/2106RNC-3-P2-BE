/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable max-len */
import { IPost } from "../../entities/SocialPosts";
import AWS from "aws-sdk";
import logger from "../../shared/Logger";
import { createHash } from "../../shared/functions";

const dynamoClient = new AWS.DynamoDB.DocumentClient();

// create const for table name
const TABLE_NAME = "post_and_comments";

/** COMPLETED!
 * kept the interface to keep me honest and organized :)
 */
export interface IPostDao {
  getPost: (postInfo: IPost) => Promise<IPost | null>;
  getComments: (postInfo: IPost) => Promise<IPost | null>;
  getAll: () => Promise<IPost[]>;
  addMainPost: (postInfo: IPost) => Promise<void>;
  addComment: (postInfo: IPost) => Promise<void>;
  updateComment: (postInfo: IPost) => Promise<void>;
  addLikeDislike: (postInfo: IPost) => Promise<void>;
  deletePost: (postInfo: IPost) => Promise<void>;
}

class SocialPostDao implements IPostDao {
  //************************************************************************************************
  //* Get Operators
  //************************************************************************************************

  /** COMPLETED!
     * 
     * 
     *  resource used: 
     // eslint-disable-next-line max-len
     * https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.04.html
     * https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html
     * 
     * @param postInfo
     * @returns 
     */
  public getPost(postInfo: IPost): Promise<IPost | null> {
    logger.info("Using route getPost in DAO");
    const params = {
      TableName: TABLE_NAME,
      FilterExpression: "#username = :username AND #group = #post",
      ExpressionAttributeNames: {
        "#username": "username",
        "#group": "parent_post_id",
        "#post": "post_id",
      },
      ExpressionAttributeValues: {
        ":username": postInfo.userName,
      },
    };
    const db = dynamoClient.scan(params).promise();
    return db.then();
  }

  /** COMPLETED!
   *
   *
   * !note: if i need to create an index rather
   * !      than use scan  the resource below will assist
   * resource used:
   * https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.04.html
   *
   * @param
   * @returns
   */
  public getComments(postInfo: IPost): Promise<IPost | null> {
    logger.info("Using route getComments in DAO");
    const params = {
      TableName: TABLE_NAME,
      FilterExpression: "#group = :group",
      ExpressionAttributeNames: {
        "#group": "parent_post_id",
      },
      ExpressionAttributeValues: {
        ":group": postInfo.parentPostId,
      },
    };
    const db = dynamoClient.scan(params).promise();
    return db.then();
  }

  /**  COMPLETED!
   *
   * this just return everything in the table
   * @returns
   */
  public getAll(): Promise<IPost[]> {
    logger.info("Using route getAll in DAO");
    const stamp = Number(Date.now());
    const params = {
      TableName: TABLE_NAME,
      IndexName: "main_post-post_date_time-index",
      KeyConditionExpression: "main_post = :mainpost AND sort_date_time < :date",
      ExpressionAttributeValues: {
        ":mainpost": 1,
        ":date": stamp
      },
      ScanIndexForward: false
    };
    const db = dynamoClient.scan(params).promise();
    return db.then();
  }

  //************************************************************************************************
  //* Post Operators
  //************************************************************************************************

  /** COMPLETED!
   *
   * * this uses the put function to either create a new item or replace an old item
   * @param
   * @returns
   */
  public async addMainPost(postInfo: IPost): Promise<void> {
    logger.info("Using route addMainPost in DAO");
    const id = await createHash(postInfo.userName + String(Date.now()));
    const stamp = Number(Date.now());
    const params = {
      TableName: TABLE_NAME,
      Item: {
        username: postInfo.userName,
        post_id: id,
        parent_post_id: id,
        post_date_time: Date().toString(),
        sort_date_time: stamp,
        post_text: postInfo.postText,
        main_post: 1,
      },
    };
    await dynamoClient.put(params).promise();
    return Promise.resolve(undefined);
  }

  /** COMPLETED!
   *
   * @param postInfo
   * @returns
   */
  public async addComment(postInfo: IPost): Promise<void> {
    logger.info("Using route addComment in DAO");
    const id = await createHash(postInfo.userName + String(Date.now()));
    const stamp = Number(Date.now());
    const params = {
      TableName: TABLE_NAME,
      Item: {
        username: postInfo.userName,
        post_id: id,
        parent_post_id: postInfo.parentPostId,
        post_date_time: Date().toString(),
        sort_date_time: stamp,
        post_text: postInfo.postText,
        main_post: 0,
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
   * @param postInfo
   * @returns
   */
  public async updateComment(postInfo: IPost): Promise<void> {
    logger.info("Using route updateComment in DAO");
    let mp;
    if (postInfo.postId === postInfo.parentPostId) {
      mp = 1;
    } else {
      mp = 0;
    }
    const stamp = Number(Date.now());
    const params = {
      TableName: TABLE_NAME,
      Item: {
        username: postInfo.userName,
        post_id: postInfo.postId,
        parent_post_id: postInfo.parentPostId,
        post_date_time: Date().toString(),
        sort_date_time: stamp,
        post_text: postInfo.postText,
        main_post: mp,
      },
    };
    await dynamoClient.put(params).promise();
    return Promise.resolve(undefined);
  }

  /** COMPLETED!
   *
   * @param postInfo
   * @returns
   */
  public async addLikeDislike(postInfo: IPost): Promise<void> {
    logger.info("Using route addLikeDislike in DAO");
    let likeVibe;
    let dislikeVibe;
    if (postInfo.like === true) {
      likeVibe = true;
      dislikeVibe = false;
    } else if (postInfo.dislikes === true) {
      likeVibe = false;
      dislikeVibe = true;
    } else {
      likeVibe = false;
      dislikeVibe = false;
    }
    const stamp = Number(Date.now());
    const id = await createHash(postInfo.userName + String(Date.now()));
    const params = {
      TableName: TABLE_NAME,
      Item: {
        username: postInfo.userName,
        post_id: id,
        parent_post_id: postInfo.parentPostId,
        post_date_time: Date().toString(),
        sort_date_time: stamp,
        main_post: 0,
        like: likeVibe,
        dislikes: dislikeVibe,
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
   * deletes individual post_id/comment
   *
   * @param fips
   * @returns
   */
  public async deletePost(postInfo: IPost): Promise<void> {
    logger.info("Using route ```delete``` in DAO");
    const params = {
      TableName: TABLE_NAME,
      Key: {
        "username": postInfo.userName,
        "post_id": postInfo.postId,
      },
    };
    await dynamoClient.delete(params).promise();
    return Promise.resolve(undefined);
  }
}

export default SocialPostDao;
