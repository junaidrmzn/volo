import { DecoratorFn } from "@storybook/react";
import React from "react";
import { LocalFeatureFlagsProvider } from "@voloiq/feature-flags";

export const withLocalFeatureFlagsProvider: DecoratorFn = (Story, context) => (
    <LocalFeatureFlagsProvider configurationOverride={context.parameters.featureFlags}>
        <Story />
    </LocalFeatureFlagsProvider>
);
