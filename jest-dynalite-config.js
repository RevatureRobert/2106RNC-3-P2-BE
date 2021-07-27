module.exports = {
        tables: [{
                TableName: "post_and_comments",
                KeySchema: [{
                        AttributeName: "username",
                        KeyType: "HASH"
                    },
                    {
                        AttributeName: "post_id",
                        KeyType: "RANGE"
                    }
                ],
                AttributeDefinitions: [{
                        AttributeName: "username",
                        AttributeType: "S"
                    },
                    {
                        AttributeName: "post_id",
                        AttributeType: "S"
                    },
                    {
                        AttributeName: "main_post",
                        AttributeType: "N"
                    },
                    {
                        AttributeName: "sort_date_time",
                        AttributeType: "N"
                    }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            },
            GlobalSecondaryIndexes: [{
                IndexName: "main_post-sort_date_time-index",
                KeySchema: [{
                        AttributeName: "main_post",
                        KeyType: "HASH"
                    }, //Partition key
                    {
                        AttributeName: "sort_date_time",
                        KeyType: "RANGE"
                    }, //Sort key
                ],
                Projection: {
                    "ProjectionType": "ALL"
                },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5,
                },
            }]
        },
        {
            TableName: "messages",
            KeySchema: [{
                    AttributeName: "username",
                    KeyType: "HASH"
                },
                {
                    AttributeName: "message_id",
                    KeyType: "RANGE"
                }
            ],
            AttributeDefinitions: [{
                    AttributeName: "username",
                    AttributeType: "S"
                },
                {
                    AttributeName: "message_id",
                    AttributeType: "S"
                }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            },
        },
        {
            TableName: "profile",
            KeySchema: [{
                AttributeName: "username",
                KeyType: "HASH"
            }],
            AttributeDefinitions: [{
                AttributeName: "username",
                AttributeType: "S"
            }],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            },
        }
    ],
    basePort: 8000,
};