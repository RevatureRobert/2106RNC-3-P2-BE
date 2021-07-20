/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable max-len */
import "../../pre-start/testEnviroment";
import { msgObj1 } from "../../pre-start/testObjects";
import MessagesDao from "./MessagesDao";

//configure basic jest settings
const DEFAULT_JEST_TIMEOUT = 1000; //milliseconds
jest.setTimeout(1 * DEFAULT_JEST_TIMEOUT);

// create instance of social post dao
const dao = new MessagesDao();

//************************************************************************************************
//* tests start here
//************************************************************************************************

/**
 * resource used:
 * https://jestjs.io/docs/dynamodb
 */

describe("[MESSAGES_DAO]", () => {
  it("[Test 1.0] - addMainMessage and getGroups", async () => {
    await dao.addMainMessage(msgObj1);
    expect(await dao.getGroups(msgObj1)).toBeDefined();
  });

  it("[Test 2.0] - addSubMessage and getMessage", async () => {
    await dao.addSubMessage(msgObj1);
    expect(await dao.getMessages(msgObj1)).toBeDefined();
  });

  it("[Test 3.0] - getAll messages", async () => {
    expect(await dao.getAll()).toBeDefined();
  });

  it("[Test 4.0] - updateMessage and getMessages", async () => {
    await dao.updateMessage(msgObj1);
    expect(await dao.getMessages(msgObj1)).toBeDefined();
  });

  it("[Test 5.0] - deleteMessage and getMessages", async () => {
    await dao.deleteMessage(msgObj1);
    expect(await dao.getMessages(msgObj1)).toBeDefined();
  });

  it("[Test 6.0] - deleteMessageGroup and getMessages", async () => {
    await dao.deleteMessageGroup(msgObj1);
    expect(await dao.getMessages(msgObj1)).toBeDefined();
  });
});
