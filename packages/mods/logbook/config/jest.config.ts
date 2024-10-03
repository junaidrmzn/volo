import type { Config } from "@jest/types";
import { baseJSDOMConfiguration } from "../../../../config/jest-jsdom.config.base";
import { name } from "../package.json";

const baseConfiguration = baseJSDOMConfiguration({ name });

const jestConfig: Config.InitialOptions = {
    ...baseConfiguration,

    moduleNameMapper: {
        // Jest doesn't support the "exports" field which is why this mapping is required: https://github.com/jestjs/jest/issues/10422

        "^@voloiq/logbook-api/(.*)$": "@voloiq/logbook-api/src/$1",

        ...baseConfiguration.moduleNameMapper,
    },
};

export default jestConfig;
