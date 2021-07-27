/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable max-len */
// import "../../pre-start/testEnviroment";
import { userObj1 } from "../../pre-start/testObjects";
import UserDao from "./UserDao";

import path from "path";
import dotenv from "dotenv";

(() => {
  // Set the env file
  const result2 = dotenv.config({
    path: "../../pre-start/env/test.env"  //path.join(__dirname, `env/test.env`),
  });
  if (result2.error) {
    throw result2.error;
  }
})();

//configure jest settings
const DEFAULT_JEST_TIMEOUT = 1000;
jest.setTimeout(5 * DEFAULT_JEST_TIMEOUT);

const userDao = new UserDao();

//************************************************************************************************
//* Tests Start Here
//************************************************************************************************

/**
 * Resource used:
 * https://jestjs.io/docs/dynamodb
 */
describe("[USER_DAO]", () => {
  it("[Test 1.0] - addUser and getGetUser", async () => {
    await userDao.addUser(userObj1);
    expect(await userDao.getOne(userObj1)).toBeDefined();
  });

  it("[Test 2.0] - getAll", async () => {
    expect(await userDao.getAll()).toBeDefined();
  });

  it("[Test 3.0] - updateUser", async () => {
    await userDao.updateUser(userObj1);
    expect(await userDao.getOne(userObj1)).toBeDefined();
  });

  it("[Test 4.0] - deleteUser", async () => {
    await userDao.deleteUser(userObj1);
    expect(await userDao.getOne(userObj1)).toBeDefined();
  });
});
