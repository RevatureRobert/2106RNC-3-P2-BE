/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable max-len */
import "../../pre-start/testenviroment";
import {postObj1, postObj2, postObj3} from "../../pre-start/testObjects"
import SocialPostDao from "./SocialPostDao";

//configure basic jest settings
const DEFAULT_JEST_TIMEOUT = 1000; //milliseconds
jest.setTimeout(1 * DEFAULT_JEST_TIMEOUT);

// create instance of social post dao
const dao = new SocialPostDao();

//************************************************************************************************
//* tests start here
//************************************************************************************************

/**
 * resource used:
 * https://jestjs.io/docs/dynamodb
 */
describe("[SOCIAL_POST_DAO]", () => {
  it("[Test 1.0] - addComment and getComments", async () => {
    await dao.addComment(postObj1);
    expect(await dao.getComments(postObj1)).toBeDefined();
  });

  it("[Test 2.0] - addMainPost and getPost", async () => {
    await dao.addMainPost(postObj1);
    expect(await dao.getPost(postObj1)).toBeDefined();
  });

  it("[Test 3.0] - getAll", async () => {
    expect(await dao.getAll()).toBeDefined();
  });

  it("[Test 4.0] - updateComment", async () => {
    await dao.updateComment(postObj1);
    expect(await dao.getPost(postObj1)).toBeDefined();
  });

  it("[Test 4.1] - updateComment", async () => {
    await dao.updateComment(postObj2);
    expect(await dao.getPost(postObj2)).toBeDefined();
  });

  it("[Test 5.0] - addLikeDislike", async () => {
    await dao.addLikeDislike(postObj1);
    expect(await dao.getPost(postObj1)).toBeDefined();
  });

  it("[Test 5.1] - addLikeDislike", async () => {
    await dao.addLikeDislike(postObj2);
    expect(await dao.getPost(postObj2)).toBeDefined();
  });

  it("[Test 5.2] - addLikeDislike", async () => {
    await dao.addLikeDislike(postObj3);
    expect(await dao.getPost(postObj3)).toBeDefined();
  });

  it("[Test 6.0] - deletePost", async () => {
    await dao.deletePost(postObj1);
    expect(await dao.getPost(postObj1)).toBeDefined();
  });
});
