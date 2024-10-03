import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import { OfferStatusTag, OfferStatusTagProps } from "./OfferStatusTag";

const meta: Meta = {
    title: "Commercial Schedule/Components/Offer Status Tag",
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

export const Basic: StoryFn<OfferStatusTagProps> = (props) => <OfferStatusTag {...props} />;
