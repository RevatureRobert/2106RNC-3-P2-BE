import supertest from "supertest";
import {app} from "./index";

import { postBody1, msgBody1, usersBody1 } from "./pre-start/testObjects";

//configure basic jest settings
const DEFAULT_JEST_TIMEOUT = 1000; //milliseconds
jest.setTimeout(1 * DEFAULT_JEST_TIMEOUT);

//************************************************************************************************
//* Get Operators
//************************************************************************************************
describe("[ROUTES TEST]- GET OPERATORS", () => {
  it("[Test 1.0] - get all posts", async () => {
    const res = await supertest(app).get("/api/home/post/getall").send();
    expect(res.statusCode).toEqual(200);
  });

  it("[Test 2.0] - Get all main posts", async () => {
    const res = await supertest(app)
      .get("/api/home/post/getmainPost")
      .send(postBody1);
    expect(res.statusCode).toEqual(200);
  });

  it("[Test 2.1] - Get all main posts failure", async () => {
    const res = await supertest(app).get("/api/home/post/getmainPost").send();
    expect(res.statusCode).toEqual(400);
  });

  it("[Test 3.0] - Get all comments", async () => {
    const res = await supertest(app)
      .get("/api/home/post/getComments")
      .send(postBody1);
    expect(res.statusCode).toEqual(200);
  });

  it("[Test 3.1] - Get all comments failure", async () => {
    const res = await supertest(app).get("/api/home/post/getComments").send();
    expect(res.statusCode).toEqual(400);
  });

  it("[Test 4.0] - Get all messages", async () => {
    const res = await supertest(app)
      .get("/api/home/messages/all")
      .send(msgBody1);
    expect(res.statusCode).toEqual(200);
  });

  it("[Test 4.1] - Get all messages failure", async () => {
    const res = await supertest(app).get("/api/home/messages/all").send();
    expect(res.statusCode).toEqual(400);
  });

  it("[Test 5.0] - Get all users", async () => {
    const res = await supertest(app).get("/api/home/all").send(usersBody1);
    expect(res.statusCode).toEqual(200);
  });

  it("[Test 6.0] - Get one user", async () => {
    const res = await supertest(app).get("/api/home/getuser").send(usersBody1);
    expect(res.statusCode).toEqual(200);
  });

  it("[Test 6.1] - Get one user failure", async () => {
    const res = await supertest(app).get("/api/home/getuser").send();
    expect(res.statusCode).toEqual(400);
  });

  it("[Test 7.0] - Get message groups", async () => {
    const res = await supertest(app)
      .get("/api/home/messages/getgroups")
      .send(msgBody1);
    expect(res.statusCode).toEqual(200);
  });

  it("[Test 7.1] - Get message groups failure", async () => {
    const res = await supertest(app).get("/api/home/messages/getgroups").send();
    expect(res.statusCode).toEqual(400);
  });
});

//************************************************************************************************
//* Post Operators
//************************************************************************************************

describe("[ROUTES TEST]- POST OPERATORS", () => {
  it("[Test 1.0] - Add posts", async () => {
    const res = await supertest(app)
      .post("/api/home/post/addpost")
      .send(postBody1);
    expect(res.statusCode).toEqual(201);
  });

  it("[Test 1.1] - Add posts failure", async () => {
    const res = await supertest(app).post("/api/home/post/addpost").send();
    expect(res.statusCode).toEqual(400);
  });

  it("[Test 2.0] - Add comment", async () => {
    const res = await supertest(app)
      .post("/api/home/post/addcomment")
      .send(postBody1);
    expect(res.statusCode).toEqual(201);
  });

  it("[Test 2.1] - Add comment failure", async () => {
    const res = await supertest(app).post("/api/home/post/addcomment").send();
    expect(res.statusCode).toEqual(400);
  });

  it("[Test 3.0] - Add vibe", async () => {
    const res = await supertest(app)
      .post("/api/home/post/addvibe")
      .send(postBody1);
    expect(res.statusCode).toEqual(201);
  });

  it("[Test 3.1] - Add vibe failure", async () => {
    const res = await supertest(app).post("/api/home/post/addvibe").send();
    expect(res.statusCode).toEqual(400);
  });

  it("[Test 4.0] - Add User", async () => {
    const res = await supertest(app).post("/api/home/add").send(usersBody1);
    expect(res.statusCode).toEqual(201);
  });

  it("[Test 4.1] - Add User failure", async () => {
    const res = await supertest(app).post("/api/home/add").send();
    expect(res.statusCode).toEqual(400);
  });

  it("[Test 5.0] - Add mainMessage", async () => {
    const res = await supertest(app)
      .post("/api/home/messages/new")
      .send(msgBody1);
    expect(res.statusCode).toEqual(201);
  });

  it("[Test 5.1] - Add mainMessage failure", async () => {
    const res = await supertest(app).post("/api/home/messages/new").send();
    expect(res.statusCode).toEqual(400);
  });

  it("[Test 6.0] - Add subMessage", async () => {
    const res = await supertest(app)
      .post("/api/home/messages/reply")
      .send(msgBody1);
    expect(res.statusCode).toEqual(201);
  });

  it("[Test 6.1] - Add subMessage failure", async () => {
    const res = await supertest(app).post("/api/home/messages/reply").send();
    expect(res.statusCode).toEqual(400);
  });
});
//************************************************************************************************
//* Put Operators
//************************************************************************************************

describe("[ROUTES TEST]- PUT OPERATORS", () => {
  it("[Test 1.0] - Update post", async () => {
    const res = await supertest(app)
      .put("/api/home/post/update")
      .send(postBody1);
    expect(res.statusCode).toEqual(200);
  });

  it("[Test 1.1] - Update post failure", async () => {
    const res = await supertest(app).put("/api/home/post/update").send();
    expect(res.statusCode).toEqual(400);
  });

  it("[Test 2.0] - Update message", async () => {
    const res = await supertest(app)
      .put("/api/home/messages/update")
      .send(msgBody1);
    expect(res.statusCode).toEqual(200);
  });

  it("[Test 2.1] - Update message failure", async () => {
    const res = await supertest(app).put("/api/home/messages/update").send();
    expect(res.statusCode).toEqual(400);
  });

  it("[Test 3.0] - Update user", async () => {
    const res = await supertest(app).put("/api/home/update").send(usersBody1);
    expect(res.statusCode).toEqual(200);
  });

  it("[Test 3.1] - update user failure", async () => {
    const res = await supertest(app).put("/api/home/update").send();
    expect(res.statusCode).toEqual(400);
  });
});

//************************************************************************************************
//* Delete Operators
//************************************************************************************************

describe("[ROUTES TEST]- DELETE OPERATORS", () => {
  it("[Test 1.0] - Delete a post", async () => {
    const res = await supertest(app)
      .delete("/api/home/post/delete")
      .send(postBody1);
    expect(res.statusCode).toEqual(200);
  });

  it("[Test 1.1] - Delete a post failure", async () => {
    const res = await supertest(app).delete("/api/home/post/delete").send();
    expect(res.statusCode).toEqual(400);
  });

  it("[Test 2.1] - Delete a message group failure", async () => {
    const res = await supertest(app)
      .delete("/api/home/messages/delete/group")
      .send();
    expect(res.statusCode).toEqual(400);
  });

  it("[Test 3.0] - Delete a message", async () => {
    const res = await supertest(app)
      .delete("/api/home/messages/delete")
      .send(msgBody1);
    expect(res.statusCode).toEqual(200);
  });

  it("[Test 3.1] - Delete a message failure", async () => {
    const res = await supertest(app).delete("/api/home/messages/delete").send();
    expect(res.statusCode).toEqual(400);
  });

  it("[Test 4.0] - Delete a user", async () => {
    const res = await supertest(app)
      .delete("/api/home/delete")
      .send(usersBody1);
    expect(res.statusCode).toEqual(200);
  });

  it("[Test 4.1] - Delete a user failure", async () => {
    const res = await supertest(app).delete("/api/home/delete").send();
    expect(res.statusCode).toEqual(400);
  });
});
