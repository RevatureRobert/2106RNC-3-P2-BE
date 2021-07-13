module.exports = {
    tables: [
        {
            TableName: "test-posts",
            KeySchema: [
                {
                    AttributeName: "username",
                    KeyType: "HASH"
                },
                {
                    AttributeName: "post_id",
                    KeyType: "RANGE"
                }
            ],
            AttributeDefinitions: [
                {
                    AttributeName: "username",
                    AttributeType: "S"
                },
                {
                    AttributeName: "post_id",
                    AttributeType: "S"
                }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            },
            data: [
                {
                    main_post: 1,
                    parent_post_id:
                        "$2b$10$0gSNQsKoyfkzMS83jGcOHOAyIb/JGUZy635QCYxndL.oKI9jdMgVG",
                    post_date_time: "1625090060153",
                    post_id:
                        "$2b$10$0gSNQsKoyfkzMS83jGcOHOAyIb/JGUZy635QCYxndL.oKI9jdMgVG",
                    post_text: "this is a comment my dudes",
                    username: "matthewterry68.mt@gmail.com"
                },
                {
                    parent_post_id:
                        "$2b$10$.R7ut6BXqR5m5Yi7dvyYUOZDI2pEdKWn.Zr4KNku80mFlPEPjium6*1625089054902",
                    username: "testNumberOne@gmail.com",
                    main_post: 1,
                    post_date_time: "1625089054903",
                    post_id:
                        "$2b$10$.R7ut6BXqR5m5Yi7dvyYUOZDI2pEdKWn.Zr4KNku80mFlPEPjium6*1625089054902"
                },
                {
                    parent_post_id:
                        "$2b$10$/Y74Twt.GPYADDRRHOvIXOITEDXTYGCo94H5gHcyecXxZyC.ez9Ra",
                    username: "testNumberOne@gmail.com",
                    main_post: 1,
                    post_date_time: "1625089161930",
                    post_id:
                        "$2b$10$/Y74Twt.GPYADDRRHOvIXOITEDXTYGCo94H5gHcyecXxZyC.ez9Ra"
                },
                {
                    parent_post_id:
                        "$2b$10$7sQJnHPQwbEUKJWUE35c3eKMelUnex.iza0gHEGgsb3lRbwO/.US6*1625089054161",
                    username: "testNumberOne@gmail.com",
                    main_post: 1,
                    post_date_time: "1625089054161",
                    post_id:
                        "$2b$10$7sQJnHPQwbEUKJWUE35c3eKMelUnex.iza0gHEGgsb3lRbwO/.US6*1625089054161"
                },
                {
                    parent_post_id:
                        "$2b$10$BonwUeEDo02j7mmm9VfALuXs4LMSy8aKMFYRuvbNjvlyst1RUQjsC*1625089035231",
                    username: "testNumberOne@gmail.com",
                    main_post: 1,
                    post_date_time: "1625089035231",
                    post_id:
                        "$2b$10$BonwUeEDo02j7mmm9VfALuXs4LMSy8aKMFYRuvbNjvlyst1RUQjsC*1625089035231"
                },
                {
                    parent_post_id:
                        "$2b$10$Ewt.O9lq3TAIBY8MvzXxMOP.yM57LuBBTw2bUPK19LHz7LMNgFsiC*1625089052455",
                    username: "testNumberOne@gmail.com",
                    main_post: 1,
                    post_date_time: "1625089052455",
                    post_id:
                        "$2b$10$Ewt.O9lq3TAIBY8MvzXxMOP.yM57LuBBTw2bUPK19LHz7LMNgFsiC*1625089052455"
                },
                {
                    parent_post_id:
                        "$2b$10$HtBWJAWUTW5qPCwGKy8IE.6RcmijjiypNywvu.7leg7zHLrJ5Hgv6*1625089053348",
                    username: "testNumberOne@gmail.com",
                    main_post: 1,
                    post_date_time: "1625089053348",
                    post_id:
                        "$2b$10$HtBWJAWUTW5qPCwGKy8IE.6RcmijjiypNywvu.7leg7zHLrJ5Hgv6*1625089053348"
                },
                {
                    parent_post_id:
                        "$2b$10$I0K/LT/ghG/rS2c3Maub8uJ2FLCKn3SYh4iEEWF8jWkI60doLr3Qa",
                    username: "testNumberOne@gmail.com",
                    main_post: 1,
                    post_date_time: "1625089160130",
                    post_id:
                        "$2b$10$I0K/LT/ghG/rS2c3Maub8uJ2FLCKn3SYh4iEEWF8jWkI60doLr3Qa"
                },
                {
                    parent_post_id:
                        "$2b$10$Tf9PZ/409iC8a4kcUqsP7uT4RUbmx4aXOQnzeFV6lIUqk9mBEWRxu",
                    username: "testNumberOne@gmail.com",
                    main_post: 1,
                    post_date_time: "1625089164076",
                    post_id:
                        "$2b$10$Tf9PZ/409iC8a4kcUqsP7uT4RUbmx4aXOQnzeFV6lIUqk9mBEWRxu"
                },
                {
                    parent_post_id: "[object Promise]*1625088946410",
                    username: "testNumberOne@gmail.com",
                    main_post: 1,
                    post_date_time: "1625088946410",
                    post_id: "[object Promise]*1625088946410"
                },
                {
                    parent_post_id: "testNumberOne@gmail.com*1625075325229",
                    username: "testNumberOne@gmail.com",
                    main_post: 1,
                    post_date_time: "1625075325229",
                    post_id: "testNumberOne@gmail.com*1625075325229"
                },
                {
                    dislike: false,
                    main_post: 1,
                    post_id: "testNumberOne@gmail.com*6/27/2021_2:41:30pm",
                    post_text: "hello im new here but like, a total karen LOL",
                    parent_post_id:
                        "testNumberOne@gmail.com*6/27/2021_2:41:30pm",
                    like: true,
                    username: "testNumberOne@gmail.com",
                    post_date_time: "6/27/2021 2:41:30pm"
                },
                {
                    dislike: false,
                    main_post: 0,
                    post_id: "testNumberOne@gmail.com*6/27/2021_2:56:30pm",
                    post_text: "hello im new here but like, a total karen LOL",
                    parent_post_id:
                        "testNumberOne@gmail.com*6/27/2021_2:41:30pm",
                    username: "testNumberOne@gmail.com",
                    post_date_time: "6/27/2021 2:41:30pm"
                },
                {
                    parent_post_id:
                        "testNumberOne@gmail.com*6/27/2021_2:41:30pm",
                    username: "testNumberOne@gmail.com123",
                    main_post: 1,
                    post_date_time: "6/27/2021 2:41:30pm",
                    post_id: "testNumberOne123@gmail.com*6/27/2021_2:41:30pm",
                    post_text: "hello im new here but like, a total karen LOL"
                },
                {
                    parent_post_id:
                        "$2b$10$Tf9PZ/409iC8a4kcUqsP7uT4RUbmx4aXOQnzeFV6lIUqk9mBEWRxu",
                    username: "matthewterry68.mt@gmail.com",
                    main_post: 0,
                    ost_date_time: "1625090232662",
                    post_id:
                        "$2b$10$.ILyLXgUiP.YqHuG9AgOZO7L3EzV5AUoVp8KOXGG2pmFqxb..HWEi",
                    post_text: "this is a comment my dudes"
                },
                {
                    parent_post_id:
                        "$2b$10$0gSNQsKoyfkzMS83jGcOHOAyIb/JGUZy635QCYxndL.oKI9jdMgVG",
                    username: "matthewterry68.mt@gmail.com",
                    main_post: 1,
                    post_date_time: "1625090060153",
                    post_id:
                        "$2b$10$0gSNQsKoyfkzMS83jGcOHOAyIb/JGUZy635QCYxndL.oKI9jdMgVG",
                    post_text: "this is a comment my dudes"
                },
                {
                    parent_post_id:
                        "$2b$10$Tf9PZ/409iC8a4kcUqsP7uT4RUbmx4aXOQnzeFV6lIUqk9mBEWRxu",
                    username: "matthewterry68.mt@gmail.com",
                    main_post: 0,
                    post_date_time: "1625090235598",
                    post_id:
                        "$2b$10$5cWF3SAD/QW6KuD5nOaE4.MtkTzOLLO6sjwFFv5fhdE3Ba6rIfyim",
                    post_text: "this is a comment my dudes"
                },
                {
                    parent_post_id:
                        "$2b$10$E/ILldWtBobplBAWvqmN2O7J7lTfx6c78roNA0DkB2BkjY7geatqq",
                    username: "matthewterry68.mt@gmail.com",
                    main_post: 1,
                    post_date_time: "1625090058947",
                    post_id:
                        "$2b$10$E/ILldWtBobplBAWvqmN2O7J7lTfx6c78roNA0DkB2BkjY7geatqq",
                    post_text: "this is a comment my dudes"
                },
                {
                    parent_post_id:
                        "$2b$10$Tf9PZ/409iC8a4kcUqsP7uT4RUbmx4aXOQnzeFV6lIUqk9mBEWRxu",
                    username: "matthewterry68.mt@gmail.com",
                    main_post: 0,
                    post_date_time: "1625090236247",
                    post_id:
                        "$2b$10$JSk96p7I8FWqBSdQMfOX3.1Ob9kBoKln1XA7avDLTlAGqiOT/2n5y",
                    post_text: "this is a comment my dudes"
                },
                {
                    parent_post_id:
                        "$2b$10$Tf9PZ/409iC8a4kcUqsP7uT4RUbmx4aXOQnzeFV6lIUqk9mBEWRxu",
                    username: "matthewterry68.mt@gmail.com",
                    main_post: 1,
                    post_date_time: "1625090898253",
                    post_id:
                        "$2b$10$Tf9PZ/409iC8a4kcUqsP7uT4RUbmx4aXOQnzeFV6lIUqk9mBEWRxu",
                    post_text: "this is a SUPER NEW comment my dudes"
                }
            ]
        }
    ],
    basePort: 8000
};
