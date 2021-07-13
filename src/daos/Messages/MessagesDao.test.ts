let tableName = "Test-Messages";
/**
 * resource used:
 * https://jestjs.io/docs/dynamodb
 */
it("Should insert one item into table", async () => {
    await ddb
        .put({
            TableName: tableName,
            Item: {
                username: "Testy",
                message_id: "1",
                parent_id: "0"
            }
        })
        .promise();

    const {Item} = await ddb
        .get({TableName: tableName, Key: {username: "Testy"}})
        .promise();

    return expect(Item).toEqual({
        username: "Testy",
        message_id: "1",
        parent_id: "0"
    });
});

it("Should delete one item from table", async () => {
    await ddb
        .delete({TableName: tableName, Key: {username: "Testy"}})
        .promise();

    const {Item} = await ddb
        .get({TableName: tableName, Key: {username: "Testy"}})
        .promise();

    return expect(Item).withContext;
});
