import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import type { AddButtonProps } from "./AddButton";
import { AddButton } from "./AddButton";

const meta: Meta = {
    title: "Flight Test Definition/Components/Add Button",
    component: AddButton,
    parameters: { actions: { argTypesRegex: "^on.*" } },
    args: {
        resourceName: "Resource",
    },
    decorators: [
        (Story) => (
            <I18nProvider>
                <Story />
            </I18nProvider>
        ),
    ],
};
export default meta;

export const Basic: StoryFn<AddButtonProps> = (props) => <AddButton {...props} />;
