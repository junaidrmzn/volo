import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import { PromotionStatusTag, PromotionStatusTagProps } from "./PromotionStatusTag";

const meta: Meta = {
    title: "Commercial Schedule/Components/Promotion Status Tag",
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

export const Basic: StoryFn<PromotionStatusTagProps> = (props) => <PromotionStatusTag {...props} />;
