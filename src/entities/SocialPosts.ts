import bcrypt from "bcrypt";

/**
 ** table: post_and_comments
 *  this will be used for both post and comments on the main objective
 */

export interface IPost {
    userName: string;
    postId: string; // unique id tied to each post/comment/like/dislike
    postText: string;
    parentPostId: string; // this is used to identify parent post for comments
    like: boolean;
    dislikes: boolean;
    mainPost: number;
}

/**
 *
 */
class Post implements IPost {
    public userName: string;
    public postId: string;
    public postText: string;
    public parentPostId: string;
    public like: boolean;
    public dislikes: boolean;
    public mainPost: number;

    /**
     * Everything except the userName is optional
     * this will allow us to both add post as well as pull specific post/comments in reporters
     *
     * @param userName
     * @param postDateTime
     * @param parentPostId
     * @param postText
     * @param like
     * @param dislikes
     */
    // eslint-disable-next-line max-len
    constructor(
        userName: string,
        postId?: string,
        like?: boolean,
        parentPostId?: string,
        postText?: string,
        dislikes?: boolean,
        mainPost?: number
    ) {
        this.userName = userName;
        this.postId = postId || `${userName}*` + String(Date.now());
        this.parentPostId = parentPostId || `${userName}*` + String(Date.now());
        this.postText = postText || "";
        this.like = like || false;
        this.dislikes = dislikes || false;
        this.mainPost = mainPost || Number(this.mainPostFunc());
    }

    async updatePassTest(x: string) {
        const saltRounds = 10;
        const password = x;

        const hash = await bcrypt.hash(password, saltRounds);
        return String(hash);
    }

    mainPostFunc() {
        if (this.postId === this.parentPostId) {
            this.mainPost = 1;
        } else {
            this.mainPost = 0;
        }
    }
}

export default Post;
