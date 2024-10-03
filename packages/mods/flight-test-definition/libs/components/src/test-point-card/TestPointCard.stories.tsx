import type { Meta, StoryFn } from "@storybook/react";
import { LocalFeatureFlagsProvider } from "@voloiq/feature-flags";
import { I18nProvider } from "@voloiq/i18n";
import type { TestPointCardProps } from "./TestPointCard";
import { TestPointCard } from "./TestPointCard";

const defaultArgs: TestPointCardProps = {
    applicabilities: ["AGENCY"],
    status: "IN WORK",
    testPointId: "FTD-V21-01-001-A00-01 Foo",
    testPointParameters: [
        {
            name: "Height",
            unit: "m",
            value: "10",
        },
    ],
};

const meta: Meta = {
    title: "Flight Test Definition/Components/Test Point Card",
    component: TestPointCard,
    args: defaultArgs,
    decorators: [
        (Story) => (
            <LocalFeatureFlagsProvider>
                <I18nProvider>
                    <Story />
                </I18nProvider>
            </LocalFeatureFlagsProvider>
        ),
    ],
};
export default meta;

export const Basic: StoryFn<TestPointCardProps> = (props) => <TestPointCard {...props} />;
export const WithManyTestPointParameters: StoryFn<TestPointCardProps> = (props) => <TestPointCard {...props} />;
WithManyTestPointParameters.args = {
    testPointParameters: Array.from({ length: 25 })
        .fill(undefined)
        .map(() => ({
            name: "Height",
            unit: "m",
            value: "10",
        })),
};
