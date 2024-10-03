import type { Config } from "@jest/types";
import type { JestBaseConfigurationProps } from "./jest.config.base";
import { baseConfiguration } from "./jest.config.base";

export const baseNodeConfiguration = (props: JestBaseConfigurationProps): Config.InitialOptions => ({
    ...baseConfiguration(props),
    testEnvironment: "node",
});
