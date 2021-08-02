import { IUser } from "../../entities/User";
import { IPost } from "../../entities/SocialPosts";
import { IMessage } from "../../entities/Messages";

declare module 'express' {
    export interface Request  {
        data: {
            user: IUser,
            socialPosts: IPost,
            messages: IMessage,
        };
    }
}
