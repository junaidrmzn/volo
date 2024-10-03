import type { Config } from "@jest/types";
import { baseNodeConfiguration } from "../../../../config/jest-node.config.base";
import { name } from "../package.json";

const config: Config.InitialOptions = {
    ...baseNodeConfiguration({ name }),
    testRegex: ["/generator/.*test.ts"],
};
export default config;
