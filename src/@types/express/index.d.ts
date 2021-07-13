import {IUser} from "@entities/User";
import {IPost} from "@entities/SocialPosts";
import {IMessage} from "@entities/Messages";
import {IFab} from "@entities/FaB";

declare module "express" {
    export interface Request {
        body: {
            user: IUser;
            socialPosts: IPost;
            messages: IMessage;
            fab: IFab;
        };
    }
}
