import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import { BookingStatusTag, BookingStatusTagProps } from "./BookingStatusTag";

const meta: Meta = {
    title: "Booking Management/Components/Booking Status Tag",
    args: {
        status: "VALID",
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

export const Basic: StoryFn<BookingStatusTagProps> = (props) => <BookingStatusTag {...props} />;
