import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import type { EmptyListMessageProps } from "./EmptyListMessage";
import { EmptyListMessage } from "./EmptyListMessage";

const meta: Meta = {
    title: "Flight Test Definition/Components/Empty List Message",
    component: EmptyListMessage,
    args: {
        message: "No items found",
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

export const Basic: StoryFn<EmptyListMessageProps> = (props) => <EmptyListMessage {...props} />;
