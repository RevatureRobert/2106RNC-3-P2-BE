/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

// jest.config.js

const {
    defaults
} = require('jest-config');

module.exports = {
    collectCoverageFrom: [
        "./src/**/*.{ts, tsx}",
    ],
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    preset: "jest-dynalite",
    roots: ["<rootDir>"],
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
}