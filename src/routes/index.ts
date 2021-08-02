/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable max-len */
import { Router } from "express";
import fs from 'fs';
import {
  getAllUsers,
  addOneUser,
  updateOneUser,
  deleteOneUser,
  getOneUser,
} from "./Users";
import {
  getAllPosts,
  deleteOnePost,
  getMainPosts,
  getComments,
  addComment,
  addMainPost,
  updateOnePost,
  addLikeDislike,
} from "./SocialPosts";
import {
  getMessages,
  getMessageGroups,
  deleteMessage,
  updateMessage,
  deleteMessageGroup,
  addSubMessage,
  addMainMessage,
} from "./Messages";

//************************************************************************************************
//* User-routes
//************************************************************************************************
const userRouter = Router();
userRouter.get("/all", getAllUsers);
userRouter.get("/getuser/:username", getOneUser);
userRouter.post("/add", addOneUser);
userRouter.put("/update", updateOneUser);
userRouter.delete("/delete", deleteOneUser);

//************************************************************************************************
//* Post-routes
//************************************************************************************************
const postRouter = Router();
postRouter.get("/post/getall", getAllPosts); // this is intended to get all main posts
postRouter.get("/post/getmainpost", getMainPosts);
postRouter.get("/post/getcomments", getComments);
postRouter.post("/post/addpost", addMainPost);
postRouter.post("/post/addcomment", addComment);
postRouter.post("/post/addvibe", addLikeDislike);
postRouter.put("/post/update", updateOnePost);
postRouter.delete("/post/delete", deleteOnePost);

//************************************************************************************************
//* Messages-routes
//************************************************************************************************
const messagesRouter = Router();
messagesRouter.get("/messages/all", getMessages); // shows all your message groups
messagesRouter.get("/messages/getgroups", getMessageGroups);
messagesRouter.post("/messages/reply", addSubMessage);
messagesRouter.post("/messages/new", addMainMessage);
messagesRouter.put("/messages/update", updateMessage); // update message from within existing direct message
messagesRouter.delete("/messages/delete", deleteMessage); // deletes direct message group
messagesRouter.delete("/messages/delete/group", deleteMessageGroup); // deletes direct message group

// Export the base-router
// localhost:3001/api/home
const baseRouter = Router();
baseRouter.use("/home", postRouter);
baseRouter.use("/home", messagesRouter);
baseRouter.use("/home", userRouter);

export const viewRouter = Router();
viewRouter.get('/', (req, res) => fs.readFileSync('public/index.html'))


export default baseRouter;
