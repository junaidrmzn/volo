import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import { BookingManagementList, BookingManagementListProps } from "./BookingManagementList";

const meta: Meta = {
    title: "Booking Management/Components/Booking Management List",
    args: {
        list: ["list item 1"],
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

export const Basic: StoryFn<BookingManagementListProps> = (props) => <BookingManagementList {...props} />;
