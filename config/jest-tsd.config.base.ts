import type { Config } from "@jest/types";
import type { JestBaseConfigurationProps } from "./jest.config.base";
import { baseConfiguration } from "./jest.config.base";

/**
 * For this config to work, you need to install the following packages:
 *
 * `yarn add --dev jest-runner-tsd @tsd/typescript tsd-lite`
 */
export const baseTSDConfiguration = (props: JestBaseConfigurationProps): Config.InitialOptions => {
    const { name } = props;
    return {
        ...baseConfiguration(props),
        runner: "jest-runner-tsd",
        collectCoverageFrom: ["**/src/**/*.ts", "**/src/**/*.tsx"],
        testRegex: "(.*\\.test-d\\.[t]sx?)$",
        name: `${name}-types`,
        displayName: `${name}-types`,
    };
};
