import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import type { DetailsButtonProps } from "./DetailsButton";
import { DetailsButton } from "./DetailsButton";

const meta: Meta = {
    title: "Flight Test Definition/Components/Details Button",
    component: DetailsButton,
    parameters: { actions: { argTypesRegex: "^on.*" } },
    decorators: [
        (Story) => (
            <I18nProvider>
                <Story />
            </I18nProvider>
        ),
    ],
};
export default meta;

export const Basic: StoryFn<DetailsButtonProps> = (props) => <DetailsButton {...props} />;
