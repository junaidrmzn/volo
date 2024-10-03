import type { Config } from "@jest/types";
import { baseJSDOMConfiguration } from "../../../../config/jest-jsdom.config.base";
import { name } from "../package.json";

const config: Config.InitialOptions = {
    ...baseJSDOMConfiguration({ name }),
    testPathIgnorePatterns: ["/generator/"],
};
export default config;
