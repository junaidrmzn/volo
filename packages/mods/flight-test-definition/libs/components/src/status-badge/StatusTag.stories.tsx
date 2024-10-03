import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import type { StatusTagProps } from "./StatusTag";
import { StatusTag } from "./StatusTag";

const meta: Meta = {
    title: "Flight Test Definition/Components/Status Badge",
    args: {
        status: "DRAFT",
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

export const Basic: StoryFn<StatusTagProps> = (props) => <StatusTag {...props} />;
