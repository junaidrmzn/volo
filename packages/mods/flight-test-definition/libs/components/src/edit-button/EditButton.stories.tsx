import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import type { EditButtonProps } from "./EditButton";
import { EditButton } from "./EditButton";

const meta: Meta = {
    title: "Flight Test Definition/Components/Edit Button",
    component: EditButton,
    args: {
        resourceName: "Resource",
    },
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

export const Basic: StoryFn<EditButtonProps> = (props) => <EditButton {...props} />;
