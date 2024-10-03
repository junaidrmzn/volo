import type { Meta, StoryFn } from "@storybook/react";
import { AlertSnackBarProps } from "@voloiq/commercial-scheduling-utils";
import { I18nProvider } from "@voloiq/i18n";
import { AlertSnackBar } from "./AlertSnackBar";

const meta: Meta = {
    title: "Commercial Schedule/Components/Alert SnackBar",
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

export const Basic: StoryFn<AlertSnackBarProps> = (props) => <AlertSnackBar {...props} />;
