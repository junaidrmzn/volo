import type { Config } from "@jest/types";
import type { JestBaseConfigurationProps } from "./jest.config.base";
import { baseConfiguration } from "./jest.config.base";

export const baseJSDOMConfiguration = (props: JestBaseConfigurationProps): Config.InitialOptions => ({
    ...baseConfiguration(props),
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(css|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "identity-obj-proxy",
        "\\.svg$": "<rootDir>/../../../config/jest-mocks/svg.ts",
    },
    setupFilesAfterEnv: ["<rootDir>/config/jest.setup.ts"],
    coveragePathIgnorePatterns: [".guard.ts"],
});
