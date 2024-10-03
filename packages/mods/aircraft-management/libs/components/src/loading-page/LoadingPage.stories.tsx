import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import { LoadingPage } from "./LoadingPage";

const meta: Meta = {
    title: "Aircraft Management/Components/Loading Page",
    decorators: [
        (Story) => (
            <I18nProvider>
                <Story />
            </I18nProvider>
        ),
    ],
};
export default meta;

export const Basic: StoryFn = () => <LoadingPage />;
