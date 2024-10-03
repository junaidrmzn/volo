import { baseJSDOMConfiguration } from "../../../../config/jest-jsdom.config.base";
import { name } from "../package.json";

const config = baseJSDOMConfiguration({ name });
export default {
    ...config,
    moduleNameMapper: {
        ...config.moduleNameMapper,
        "^@voloiq/flight-test-definition-api/(.*)$": "@voloiq/flight-test-definition-api/src/$1",
    },
};
