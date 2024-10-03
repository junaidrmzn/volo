import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import { PriceStatusTag, PriceStatusTagProps } from "./PriceStatusTag";

const meta: Meta = {
    title: "Commercial Schedule/Components/Price Status Tag",
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

export const Basic: StoryFn<PriceStatusTagProps> = (props) => <PriceStatusTag {...props} />;
