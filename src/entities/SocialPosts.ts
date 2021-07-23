
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