import type { Config } from "@jest/types";
import { baseJSDOMConfiguration } from "../../../../config/jest-jsdom.config.base";
import { name } from "../package.json";

const configuration: Config.InitialOptions = {
    ...baseJSDOMConfiguration({ name }),
    setupFilesAfterEnv: ["<rootDir>/config/jest.setup.ts", "jest-extended/all"],
};
export default configuration;
