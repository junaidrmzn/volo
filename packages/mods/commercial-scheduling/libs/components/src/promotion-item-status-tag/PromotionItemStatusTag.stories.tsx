import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import { PromotionItemStatusTag, PromotionItemStatusTagProps } from "./PromotionItemStatusTag";

const meta: Meta = {
    title: "Commercial Schedule/Components/Promotion Item Status Tag",
    args: {
        status: "CREATED",
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

export const Basic: StoryFn<PromotionItemStatusTagProps> = (props) => <PromotionItemStatusTag {...props} />;
