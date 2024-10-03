import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import { BookingCard, BookingCardProps } from "./BookingCard";

const meta: Meta = {
    title: "Booking Management/Components/Booking Card",
    args: {
        title: "Booking Card",
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

export const Basic: StoryFn<BookingCardProps> = (props) => <BookingCard {...props} />;
