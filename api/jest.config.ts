import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  //verbose: true,
  //setupFilesAfterEnv: ["<rootDir>/__tests__/_config/setupTests.ts"],
  preset: "ts-jest",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
  // Transform TS files with ts-jest
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

export default config;
