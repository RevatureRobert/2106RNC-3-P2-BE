/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

// jest.config.js

const {defaults} = require("jest-config");

module.exports = {
    // ...
    moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
    // ...
    preset:
        // "jest-dynalite",
        // "@shelf/jest-dynamodb",
        "ts-jest",

    testEnvironment: "jest-dynalite/environment",
    transform: {
        "^.+\\.tsx?$": "babel-jest"
    },
    setupFilesAfterEnv: [
        "jest-dynalite/setupTables",
        // Optional (but recommended)
        "jest-dynalite/clearAfterEach"
    ]
};
