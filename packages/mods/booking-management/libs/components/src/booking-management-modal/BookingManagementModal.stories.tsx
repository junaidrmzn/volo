import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import { BookingManagementModal, BookingManagementModalProps } from "./BookingManagementModal";

const meta: Meta = {
    title: "Booking Management/Components/Booking Management Modal",
    args: {
        heading: "booking Management",
        subHeading: "Modal",
        isOpen: true,
        onClose: () => {},
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

export const Basic: StoryFn<BookingManagementModalProps> = (props) => <BookingManagementModal {...props} />;
