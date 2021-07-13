/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable max-len */
import {Router} from "express";
import {getAllUsers, addOneUser, updateOneUser, deleteOneUser} from "./Users";
import {
    getAllPosts,
    deleteOnePost,
    getMainPosts,
    getComments,
    addComment,
    addMainPost,
    updateOnePost,
    addLikeDislike
} from "./SocialPosts";
// import { getMessages, newMessageGroup, newMessage, updateMessage, deleteMessageGroup, deleteMessageGroup } from './Messages';

// // Login-route
// //TODO invistigate necessity of this route
// const loginRouter = Router();
// loginRouter.get('/all', getAllUsers);
// loginRouter.post('/add', addOneUser);
// loginRouter.put('/update', updateOneUser);
// loginRouter.delete('/delete/:id', deleteOneUser);

//************************************************************************************************
//* User-routes
//************************************************************************************************
const userRouter = Router();
userRouter.get("/all", getAllUsers);
userRouter.post("/add", addOneUser);
userRouter.put("/update", updateOneUser);
userRouter.delete("/delete/:id", deleteOneUser);

//************************************************************************************************
//* Post-routes
//************************************************************************************************
const postRouter = Router();
postRouter.get("/post", getAllPosts); // this is intended to get all main posts
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
// messagesRouter.get('/messages/all', getMessages); // shows all your message groups
// messagesRouter.post('/messages/new/groupmessage', newMessageGroup); // creates a new direct message
// messagesRouter.post('/messages/new/:parentMessageId/', newMessage) // direct message from within existing direct message
// messagesRouter.put('/messages/update', updateMessage); // update message from within existing direct message
// messagesRouter.delete('/messages/delete/:parentMessageId', deleteMessageGroup); // deletes direct message group
// messagesRouter.delete('/messages/delete/:parentMessageId/:messageId', deleteMessageGroup); // deletes direct message group

// Export the base-router
// localhost:3001/api/home
const baseRouter = Router();
baseRouter.use("/home", postRouter);
baseRouter.use("/home", messagesRouter);
baseRouter.use("/home", userRouter);
export default baseRouter;
